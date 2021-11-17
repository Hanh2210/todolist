import React from 'react';
import Todo from './components/todo';
import './content.css';
import LogIn from './components/login/logIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/services/store/index';

const todoApp = () => {
  return (
    < Provider store={store}>
      <Router>
        <div className='todo-content container'>
          <Route path='/' exact component={Todo} />
          <Route path='/login' exact component={LogIn} />
        </div>
      </Router>
    </Provider>
  );
};

export default todoApp;