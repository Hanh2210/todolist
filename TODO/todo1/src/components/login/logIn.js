import React, { useState } from 'react';
import './loginForm.css';

const LogIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getSignUpApi = async (data) => {
    const response = await fetch(
      'https://mvn-task-manager.work/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  const signUp = async () => {
    try {
      let data = {};
      data.username = username;
      data.password = password;
      const res = await getSignUpApi(data);
      if (res.id) {
        alert('Đăng ký thành công ! Hãy nhấn đăng nhập');
      } else {
        alert(res.message);
      }
    } catch {
      alert('Đăng ký thất bại');
    }
  };

  const getSignInApi = async (data) => {
    const response = await fetch(
      'https://mvn-task-manager.work/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  const signIn = async () => {
    try {
      let data = {};
      data.username = username;
      data.password = password;
      const res = await getSignInApi(data);
      if (res.id) {
        props.history.push('/');
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        console.log(res.token);
      } else {
        alert(res.message);
      }
    } catch {
      alert('Đăng nhập thất bại !');
    }
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1 style={{ paddingTop: '1em' }}>Todo App</h1>
      <div className='form'>
        <form className='align'>
          <div className='mb-3'>
            <label className='form-label text-start d-block'>Username :</label>
            <input
              name='username'
              type='text'
              className='form-control'
              value={username}
              onChange={usernameChangeHandler}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label  text-start d-block'>Password :</label>
            <input
              name='password'
              type='password'
              className='form-control'
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>
        </form>
        <button
          type='submit'
          className='btn btn-primary align'
          onClick={signUp}
        >
          Sign Up
        </button>
        <button
          type='submit'
          className='btn btn-primary align'
          onClick={signIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LogIn;