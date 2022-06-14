import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Polls } from './pages/Polls';
import { Poll } from './pages/Poll';
import { P404 } from './pages/P404';
import { Profile } from './pages/Profile';
import { OverallRating } from './pages/OverallRating';
import './App.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import logo from './logo.png';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
const menuPoints = [
  {
    title: 'Опросы',
    to: '/polls',
  },
  {
    title: 'Профиль',
    to: '/profile',
  },
  {
    title: 'Рейтинг',
    to: '/overallRating',
  },
];

function App() {
  return (
    <Layout hasSider>
      <Sider className="sider">
        <div className="logo">
          <img src={logo} className="logo-img" alt="logo" />
          <p className="logo-text">
            Performance
            <br />
            review
          </p>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {menuPoints.map((point, index) => (
            <Menu.Item key={index}>
              <Link to={point.to}>{point.title}</Link>
            </Menu.Item>
          ))}
          <a href="https://disk.yandex.ru/i/yDvWH9sEr7Lj3Q" target="_blank">
            <QuestionCircleOutlined className="presentation-icon" />
          </a>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content className="site-content">
          <Routes>
            <Route path="/" element={<Navigate to="/polls" replace />}></Route>
            <Route path="/polls" element={<Polls />}></Route>
            <Route path="/polls/:id" element={<Poll />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/overallRating" element={<OverallRating />}></Route>
            <Route path="*" element={<P404 />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
