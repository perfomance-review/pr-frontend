import React, { useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Polls } from './Polls';
import { Poll } from './Poll';
import { P404 } from './P404';
import { ClosedPolls } from './ClosedPolls';
import { ManagerPolls } from './ManagerPolls';
import { Profile } from './Profile';
import { OverallRating } from './OverallRating';
import { QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../logo.png';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import PollService from '../API/PollService';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserAction } from '../reducers/user';
const { Content, Sider } = Layout;

const respondentMenuItems = [
    {
        key: 'polls',
        label: (<Link to="/polls">Опросы</Link>)
    },
    {
        key: 'profile',
        label: (<Link to="/profile/">Рейтинг</Link>)
    },
];

const managerMenuItems = [
  {
      key: 'managerPolls',
      label: (<Link to="/managerPolls/">Рейтинг</Link>)
  },
];

function getRoleTitle(role) {
  if (role == 'ADMINISTRATOR') {
    return 'Администратор';
  }
  if (role == 'MANAGER') {
    return 'Менеджер';
  }
  if (role == 'RESPONDENT') {
    return 'Сотрудник';
  }
  return '';
}

function StartPage({ onLogout }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await PollService.getUser();
    dispatch(changeUserAction(response));
  }

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
        <Menu items={user.role == "RESPONDENT" ? respondentMenuItems : managerMenuItems} 
              theme="dark" 
              mode="inline"
              defaultSelectedKeys={['polls']} />
        <a
          className="presentation-icon"
          href="https://disk.yandex.ru/i/yDvWH9sEr7Lj3Q"
          target="_blank"
        >
          <QuestionCircleOutlined />
        </a>
        <div className="current-user">
          <img
            src={process.env.PUBLIC_URL + '/users/' + user.userId + '.svg'}
            alt="user"
            className="current-user-img"
          />
          <div>
            <p className="current-user-name">{user.firstName}</p>
            <p className="current-user-name">{user.secondName}</p>
            <p className="current-user-role">{getRoleTitle(user.role)}</p>
          </div>
          <LogoutOutlined className="logout-icon" onClick={(e) => {onLogout("user-id");}} />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content className="site-content">
          {user.role == "RESPONDENT" &&
            <Routes>
              <Route path="/" element={<Navigate to="/polls" replace />}></Route>
              <Route path="/polls" element={<Polls />}></Route>
              <Route path="/polls/:id" element={<Poll />}></Route>
              <Route path="/profile" element={<ClosedPolls />}></Route>
              <Route path="/profile/:id" element={<Profile />}></Route>
              <Route path="*" element={<P404 />}></Route>
            </Routes>}
          {user.role == "MANAGER" &&
            <Routes>
              <Route path="/" element={<Navigate to="/managerPolls" replace />}></Route>
              <Route path="/managerPolls" element={<ManagerPolls />}></Route>
              <Route path="/overallRating/:id" element={<OverallRating />}></Route>
              <Route path="*" element={<P404 />}></Route>
            </Routes>}
        </Content>
      </Layout>
    </Layout>
  );
}

export default StartPage;
