import React, { Component } from 'react';
import ReadySection from 'components/sections/ReadySection';
import RollingSection from 'components/sections/RollingSection';
import TutorialSection from 'components/sections/TutorialSection';
import MainHeader from 'components/header/MainHeader';
import classnames from 'classnames/bind';
import style from './MainPage.module.scss';

const cx = classnames.bind(style);

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'ready',
    }
  }
  changeStatus = (status) => {
    this.setState({status: status});
  }
  render() {
    const status = () => {
      switch(this.state.status) {
        case 'ready':
          return (
            <ReadySection changeStatus={this.changeStatus}/>
          )
        case 'rolling':
          return (
            <RollingSection changeStatus={this.changeStatus}/>
          )
        case 'tutorial':
          return (
            <TutorialSection/>
          )
        default:
          return (
            <div>
              404
            </div>
          )
      }
    }
    return (
      <div className={cx('home-container')}>
        <MainHeader/>
        {status()}
        <div className={cx('bottom-background')}>
          <div className={cx('circle')}></div>
        </div>
      </div>
    )
  }
}