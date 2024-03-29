import React, { useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AvailablePolls } from './AvailablePolls';
import { Poll } from './Poll';
import { PollCreate } from './PollCreate';
import { P404 } from './P404';
import { ClosedPolls } from './ClosedPolls';
import { Profile } from './Profile';
import { ManagerPolls } from './ManagerPolls';
import { OverallRating } from './OverallRating';
import { QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../logo.png';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import UserService from '../API/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserAction } from '../reducers/user';
const { Content, Sider } = Layout;

const defaultSelectedKeys = [document.location.pathname.replace('/', '') != '' ? document.location.pathname.replace('/', '') : ('availablePolls','overallRating')]
const respondentMenuItems = [
  {
      key: 'availablePolls',
      label: (<Link to="/availablePolls">Опросы</Link>)
  },
  {
      key: 'profile',
      label: (<Link to="/profile/">Рейтинг</Link>)
  },
  {
      key: 'FAQ',
      label: (<a href="https://disk.yandex.ru/i/yDvWH9sEr7Lj3Q" target="_blank" rel="noopener noreferrer">
                FAQ
              </a>)
  },
];

const managerMenuItems = [
  {
    key: 'overallRating',
    label: (<Link to="/overallRating">Рейтинг</Link>)
  },
  {
    key: 'pollCreate',
    label: (<Link to="/pollCreate">Создать опрос</Link>)
  },
  {
      key: 'FAQ',
      label: (<a href="https://disk.yandex.ru/i/yDvWH9sEr7Lj3Q" target="_blank" rel="noopener noreferrer">
                FAQ
              </a>)
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
    const response = await UserService.getUser();
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
              defaultSelectedKeys={defaultSelectedKeys} />
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
          <LogoutOutlined className="logout-icon" onClick={(e) => {onLogout();}} />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content className="site-content">
          {user.role == "RESPONDENT" &&
            <Routes>
              <Route path="/" element={<Navigate to="/availablePolls" replace />}></Route>
              <Route path="/availablePolls" element={<AvailablePolls />}></Route>
              <Route path="/availablePolls/:id" element={<Poll />}></Route>
              <Route path="/profile" element={<ClosedPolls />}></Route>
              <Route path="/profile/:pollId" element={<Profile />}></Route>
              <Route path="*" element={<P404 />}></Route>
            </Routes>}
          {user.role == "MANAGER" &&
            <Routes>
              <Route path="/" element={<Navigate to="/overallRating" replace />}></Route>
              <Route path="/overallRating" element={<ManagerPolls />}></Route>
              <Route path="/overallRating/:id" element={<OverallRating />}></Route>
              <Route path="/overallRating/:pollId/:userId" element={<Profile />}></Route>
              <Route path="/pollCreate" element={<PollCreate />}></Route>
              <Route path="*" element={<P404 />}></Route>
            </Routes>}
        </Content>
      </Layout>
    </Layout>
  );
}

export default StartPage;
