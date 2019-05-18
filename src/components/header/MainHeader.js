import React, { Component } from 'react';
import logo from 'assets/logo.svg';
import icRank from 'assets/ic_rank.png';
import icBack from 'assets/ic_back.png';
import classnames from 'classnames/bind';
import style from './MainHeader.module.scss';

const cx = classnames.bind(style);

export default class MainHeader extends Component {
  toRanking = () => {
    this.props.changeStatus('ranking');
  }
  toMain = () => {
    this.props.changeStatus('ready');
  }
  render() {
    const leftItem = () => {
      switch (this.props.status) {
        default: 
          return (
            <div className={cx('item', 'left')} onClick={this.toRanking}>
              <img src={icRank} alt="rank"/>
            </div>
          )
        case 'tutorial' || 'ranking':
          return (
            <div className={cx('item', 'left')} onClick={this.toMain}>
              <img src={icBack} alt="back"/>
            </div>
          )
      }
    }
    return (
      <div className={cx('main-header')}>
        {leftItem()}
        <div className={cx('item', 'center')} onClick={this.toMain}>
          <img src={logo} alt="logo"/>
        </div>
        <div className={cx('item', 'right')}>

        </div>
      </div>
    )
  }
}
