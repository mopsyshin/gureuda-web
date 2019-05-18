import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { MainPage } from 'pages';
import styles from './App.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
      <div className={cx('container')}>
        <Route exact path="/" component={MainPage}/>
      </div>
    );
  }
}

export default App;
