import React, { Component } from 'react';
import styles from './TodoListItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateState: false,
      updateValue: '',
    };
  }
  componentDidMount() {
    this.setState({updateValue: this.props.value});
  };

  deleteItem = () => {
    this.props.deleteItem(this.props.index);
  };

  submitUpdate = () => {
    this.props.submitUpdate(this.props.index, this.state.updateValue);
    this.toggleUpdate();
  };

  cancelUpdate = () => {
    this.setState({updateValue: this.props.value});
    this.toggleUpdate();
  };

  toggleUpdate = () => {
    const updateState = this.state.updateState;
    this.setState({updateState: !updateState});
  };

  changeValue = (event) => {
    this.setState({updateValue: event.target.value});
  };

  render() {
    const editState = () => {
      return (
        <div className={cx('list-item')}>
          <input className={cx('edit-input')} type="text" value={this.state.updateValue} onChange={this.changeValue}/>
          <div className={cx('actions')}>
            <span onClick={this.submitUpdate}>완료</span>
            <span onClick={this.cancelUpdate}>취소</span>
          </div>
        </div>
      );
    };

    const normalState = () => {
      return (
        <div className={cx('list-item')}>
          <span>{this.props.value}</span>
          <div className={cx('actions')}>
            <span onClick={this.toggleUpdate}>수정</span>
            <span onClick={this.deleteItem}>삭제</span>
          </div>
        </div>
      )
    };

    return (
      <div className={cx('wrapper')}>
        {this.state.updateState ? editState() : normalState()}
      </div>
    );
  }
}

export default TodoListItem;
