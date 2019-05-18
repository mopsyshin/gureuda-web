import React, { Component } from 'react';
import BaseButton from 'components/buttons/BaseButton';
import imgTissue from 'assets/img_tissue.png';
import style from './Sections.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default class ReadySection extends Component {
  startRolling = () => {
    this.props.changeStatus('rolling');
  }
  toTutorial = () => {
    this.props.changeStatus('tutorial');
  }
  render() {
    return (
      <div className={cx('main-body')}>
          <div className={cx('message')}>
            지금 구르시겠어요?
          </div>
          <div className={cx('gif-section')}>
            <img src={imgTissue} alt=""/>
          </div>
          <div className={cx('actions')}>
            <BaseButton message="구른다"
                        backgroundColor="#005eff"
                        color="#ffffff"
                        onClick={this.startRolling}/>
            <BaseButton message="영상보기"
                        backgroundColor="#3b3f45"
                        color="#ffffff"
                        onClick={this.toTutorial}/>
          </div>
        </div>
    )
  }
}
