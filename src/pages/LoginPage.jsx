import React from 'react';
import logo from '../logo.png';
import Cookies from '../API/Cookies';
import { Form, Input, Button } from 'antd';
import PollService from '../API/PollService';

function LoginPage({ setIsLogin }) {
  const onFinish = (values) => {
    const loginInfo = {
      "email" : values.email,
      "password": values.password
    }
    login(loginInfo)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  async function login(loginInfo) {
    //setIsPollLoading(true);
    const response = await PollService.login(loginInfo);
    Cookies.setCookie('access-token', response['access-token']);
    setIsLogin(Cookies.getCookie('access-token'));
    console.log(response);
    //setIsPollLoading(false);
  }

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
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Введен неверный e-mail',
            },
            {
              required: true,
              message: 'E-mail обязателен для заполнения',
            },
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пароль обязателен для заполнения',
            },
          ]}
        >
          <Input.Password placeholder="Пароль" />
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
