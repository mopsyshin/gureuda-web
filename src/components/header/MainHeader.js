import React, { Component } from 'react';
import logo from 'assets/logo.svg';
import icRank from 'assets/ic_rank.png';
import classnames from 'classnames/bind';
import style from './MainHeader.module.scss';

const cx = classnames.bind(style);

export default class MainHeader extends Component {
  render() {
    return (
      <div className={cx('main-header')}>
        <div className={cx('item', 'left')}>
          <img src={icRank} alt="rank"/>
        </div>
        <div className={cx('item', 'center')}>
          <img src={logo} alt="logo"/>
        </div>
        <div className={cx('item', 'right')}>

        </div>
      </div>
    )
  }
}
