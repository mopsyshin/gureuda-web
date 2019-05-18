import React from 'react';
import TodoList from 'pages/TodoList';
import TodoInput from 'components/input/TodoInput';
import TodoListItem from 'components/list-item/TodoListItem';
import styles from './TodoList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoListCopy extends TodoList {
  componentDidMount() {
    this.setState({pageTitle: 'this is clone'});
  }

  render() {
    const listItem = this.state.todoArr.map( (todo, index) => {
      return (
        <TodoListItem key={index} index={index} value={todo.value} deleteItem={this.deleteItem} submitUpdate={this.updateItem}/>
      );
    });
    return (
      <div>
        <h1 className={cx('header')}>{this.state.pageTitle}</h1>
        {listItem}
        <TodoInput value={this.state.value} handleChange={this.handleChange} addItem={this.addItem}/>
      </div>
    )
  }
}

export default TodoListCopy;
