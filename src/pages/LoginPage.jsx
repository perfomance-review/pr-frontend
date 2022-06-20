import React from 'react';
import logo from '../logo.png';
import Cookies from '../API/Cookies';
import { Form, Input, Button } from 'antd';

function LoginPage({ setIsLogin }) {
  const onFinish = (values) => {
    Cookies.setCookie('user-id', values.userId);
    setIsLogin(Cookies.getCookie('user-id'));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="central-part">
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
        className="login-form-wrap"
      >
        <Form.Item
          name="userId"
          rules={[
            {
              required: true,
              message: 'UserId обязателен для заполнения!',
            },
          ]}
        >
          <Input placeholder="User Id" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round" size="large">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
