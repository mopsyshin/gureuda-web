import React, { Component } from 'react'
import BaseButton from 'components/buttons/BaseButton';
import gifTissue from 'assets/tissue.gif';
import imgTail from 'assets/tail.png';
import style from './Sections.module.scss';
import classNames from 'classnames/bind';
import voice from 'assets/voice.mp3';
import _ from 'lodash';

const cx = classNames.bind(style);

export default class RollingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '준비',
      dialog: '',
      currentState: '',
      counter: 3,
      test: '',
      prev: 0,
      accumulate: 0,
      startDeg: 0,
      timer: 0,
      timerUnit: 10, //ms
      timeOut: 8000, //ms
    }
  }
  playVoice = () => {
    const audio = this.refs.player;
    audio.play();
  }
  startRolling = () => {
    this.init();
  }
  toTutorial = () => {
    this.props.changeStatus('tutorial');
  }
  
  measureOrientation = _.throttle(event => {
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
        window.removeEventListener('deviceorientation', this.measureOrientation);
        this.setState({currentState: 'success', message: '성공!', dialog: '정말 안정적인 구르기였어요. 기품이 느껴져요'});
      }
      if (this.state.timer > this.state.timeOut) {
        window.removeEventListener('deviceorientation', this.measureOrientation);
        this.setState({currentState: 'failure', message: '실패', dialog: '함께 해줄게! 한번 더!'});
      }
    } 
  });

  setEventListener = () => {
    window.addEventListener("deviceorientation", this.measureOrientation, true);
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
    this.setState({currentState: 'count', message: '준비', accumulate: 0, timer: 0});
    setTimeout(() => {
      this.playVoice();
    }, 3000);
    await this.startCount();
    
    this.setEventListener();
  }

  componentDidMount() {
    this.init();
  }
  render() {
    const dialog = () => {
      if (this.state.currentState === 'success' || this.state.currentState === 'failure') {
        return (
          <div className={cx('dialog-section')}>
            <DialogBox message={this.state.dialog}/>
          </div>
        )
      }
    }
    const bottomsSection = () => {
      switch (this.state.currentState) {
        case 'count':
          return (
            <div className={cx('counter')}>
              {this.state.counter}
            </div>
          )
        case 'success':
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
        case 'failure':
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
        {dialog()}
        <div className={cx('gif-section')}>
          <img src={gifTissue} alt=""/>
        </div>
        <div className={cx('bottom-section')}>
          {bottomsSection()}
        </div>
        <audio src={voice} type="audio/mp3" ref='player'/>
      </div>
    )
  }
}

class DialogBox extends Component {
  render() {
    return (
      <div className={cx('dialog-wrapper')}>
        <div className={cx('message-background')}>
          <div className={cx('message')}>
            {this.props.message}
          </div>
        </div>
        <div className={cx('tail')}>
          <img src={imgTail} alt="tail"/>
        </div>
      </div>
    )
  }
}