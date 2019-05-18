import React, { Component } from 'react'
import BaseButton from 'components/buttons/BaseButton';
import gifTissue from 'assets/tissue.gif';
import style from './Sections.module.scss';
import classNames from 'classnames/bind';
import _ from 'lodash';

const cx = classNames.bind(style);

export default class RollingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '준비',
      currentState: '',
      counter: 3,
      test: '',
      prev: 0,
      accumulate: 0,
      startDeg: 0,
      timer: 0,
      timerUnit: 10, //ms
      timeOut: 10000, //ms
    }
  }

  startRolling = () => {
    this.init();
  }
  toTutorial = () => {
    this.props.changeStatus('tutorial');
  }

  handleOrientation = (event) => {
    let beta = event.beta;
    if (90 < beta) {
      beta = (-beta) + 450;
    } else {
      beta = (-beta) + 90;
    }
    const successDeg = 340; //deg
    
    if (this.state.currentState === 'measureStart') {
      this.setState({startDeg: beta, prev: beta, currentState: 'measuring'});
    } else if (this.state.currentState === 'measuring') {
      if (beta - this.state.prev > 200) {
        return;
      }
      this.setState({
        prev: beta,
        accumulate: this.state.accumulate + (beta - this.state.prev),
        timer: this.state.timer + this.state.timerUnit,
      });
      if (this.state.accumulate > successDeg - this.state.startDeg) {
        this.setState({currentState: 'success', message: '성공!'});
      }
    } 
  }

  setEventListener = () => {
    window.addEventListener("deviceorientation", _.throttle(this.handleOrientation, this.state.timerUnit), true);
  }
  
  startCount = () => {
    return new Promise(resolve => {
      this.setState({counter: 3});
      let count = 3;
      const timer = setInterval(() => {
        if (count > 0) {
          this.setState({counter: count});
        } else if (count === 0) {
          this.setState({message: '떼꾸르...', currentState: 'measureStart'});
          clearInterval(timer);
          resolve();
        }
        count -= 1;
      }, 1000);  
    })
    
  }

  init = async () => {
    this.setState({currentState: 'count', message: '준비', accumulate: 0});
    await this.startCount();
    this.setEventListener();
  }

  componentDidMount() {
    this.init();
  }
  render() {

    const bottomsSection = () => {
      switch (this.state.currentState) {
        case 'count':
          return (
            <Counter count={this.state.counter}/>
          )
        case 'success' || 'failure':
            return (
              <div className={cx('actions')}>
                <BaseButton message="다시 구르기"
                        backgroundColor="#005eff"
                        color="#ffffff"
                        onClick={this.startRolling}/>
                <BaseButton message="영상보기"
                        backgroundColor="#3b3f45"
                        color="#ffffff"
                        onClick={this.toTutorial}/>
              </div>
            )
        default: 
          return (
            <div></div>
          )
      }
    }
    return (
      <div className={cx('rolling-body')}>
        <div className={cx('top-section')}>
          <div className={cx('message', {large: this.state.currentState === 'success' || this.state.currentState === 'failure'})}>
            {this.state.message}
          </div>
        </div>
        <div className={cx('gif-section')}>
          <img src={gifTissue} alt=""/>
        </div>
        <div className={cx('bottom-section')}>
          {bottomsSection()}
        </div>
      </div>
    )
  }
}

class Counter extends Component {
  render() {
    return (
      <div className={cx('counter')}>
        {this.props.count}
      </div>
    )
  }
}