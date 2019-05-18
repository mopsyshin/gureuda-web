import React, { Component } from 'react';
import styles from './TodoInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoInput extends Component {
  render() {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('divider')}></div>
        <input className={cx('input')} value={this.props.value} onChange={this.props.handleChange} onKeyUp={this.props.addItem}/>
      </div>
    );
  }
}

export default TodoInput;
