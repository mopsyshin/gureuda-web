import React, { Component } from 'react';
import TodoInput from 'components/input/TodoInput';
import TodoListItem from 'components/list-item/TodoListItem';
import styles from './TodoList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'React Todo List',
      value: '',
      todoArr: [
        {
          value: 'first todo',
        },
        {
          value: 'second todo',
        }
      ],
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  addItem = (event) => {
    if(event.key === 'Enter' && event.target.value !== ''){
      const array = this.state.todoArr;
      array.push({value: event.target.value});
      this.setState({value: '', todoArr: array});
    }
  };

  deleteItem = (index) => {
    const array = this.state.todoArr;
    array.splice(index, 1);
    this.setState({todoArr: array});
  };

  updateItem = (index, value) => {
    const array = this.state.todoArr;
    array[index].value = value;
    this.setState({todoArr: array});
  };

  render() {
    const listItem = this.state.todoArr.map( (todo, index) => {
      return (
        <TodoListItem key={index} index={index} value={todo.value} deleteItem={this.deleteItem} submitUpdate={this.updateItem}/>
      );
    });
    return (
      <div>
        <div className={cx('header')}>{this.state.pageTitle}</div>
        {listItem}
        <TodoInput value={this.state.value} handleChange={this.handleChange} addItem={this.addItem}/>
      </div>
    )
  }
}

export default TodoList;
