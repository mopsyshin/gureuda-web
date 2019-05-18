import React, { Component } from 'react';
import style from './Buttons.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default class BaseButton extends Component {
  render() {
    const btnStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.color,
      width: this.props.width || '100%',
    }
    return (
      <button onClick={this.props.onClick} style={btnStyle} className={cx('base-button')}>
        {this.props.message}
      </button>
    )
  }
}
