import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Profile } from './pages/Profile';
import './App.css';
import logo from './logo.png';
import 'antd/dist/antd.css';
import './index.css';
import StartPage from './pages/StartPage';
import { Form, Input, Checkbox, Button } from 'antd';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector(state => state.user);
  useEffect(() => {
    setIsLogin(getCookie('user-id'))
  }, []);

  function getCookie(cookieName) {
    var results = document.cookie.match ( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );
    if ( results )
      return ( unescape ( results[2] ) );
    else
      return null;
  }

  const onFinish = (values) => {
    document.cookie = "user-id=" + values.userId;
    setIsLogin(getCookie('user-id'))
  };

  const deleteCookie = (values) => {
    document.cookie = "user-id=" + user.userId + ";max-age=-1";
    setIsLogin(getCookie('user-id'))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='h100 login-page'>
      {isLogin ? (
        <StartPage deleteCookie={deleteCookie}/>
      ) : (
        <div className='central-part'>
          <div className="login-logo">
            <img src={logo} className="logo-img" alt="logo" />
            <p className="login-logo-text">
              Performance
              <br />
              review
            </p>
          </div>
          <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className='login-form-wrap'
            >
            <Form.Item
              name="userId"
              rules={[
                {
                  required: true,
                  message: 'Please input your userId!',
                },
              ]}
            >
              <Input placeholder="User Id" />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                shape="round"
                size="large">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default App;