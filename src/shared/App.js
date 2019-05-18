import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { TodoList, TodoListCopy } from 'pages';
import styles from './App.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
      <div className={cx('container')}>
        <Route exact path="/" component={TodoList}/>
        <Route path="/copy" component={TodoListCopy}/>
      </div>
    );
  }
}

export default App;
