import React, { useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Polls } from './Polls';
import { Poll } from './Poll';
import { P404 } from './P404';
import { Profile } from './Profile';
import { OverallRating } from './OverallRating';
import { QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../logo.png';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import PollService from '../API/PollService';
import {useDispatch, useSelector} from 'react-redux';
const { Content, Sider } = Layout;
const menuPoints = [
  {
    title: 'Опросы',
    to: '/polls',
    role: 'RESPONDENT',
  },
  {
    title: 'Профиль',
    to: '/profile/65059ad5-a41d-4970-9d8b-72e507334367',
    role: 'RESPONDENT',
  },
  {
    title: 'Рейтинг',
    to: '/overallRating',
    role: 'MANAGER',
  },
];

function getRoleTitle(role){
  if(role == "ADMINISTRATOR"){
    return "Администратор"
  } 
  if(role == "MANAGER"){
    return "Менеджер"
  } 
  if(role == "RESPONDENT"){
    return "Сотрудник"
  } 
  return ""
}

function StartPage({deleteCookie}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await PollService.getUser();
    dispatch({type: "ChangeUser", payload: response})
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
            {menuPoints.map((point, index) => (
              point.role == user.role && (
                <Menu.Item key={index}>
                  <Link to={point.to}>{point.title}</Link>
                </Menu.Item>
              )
            ))}
            <a className="presentation-icon" href="https://disk.yandex.ru/i/yDvWH9sEr7Lj3Q" target="_blank">
                <QuestionCircleOutlined />
            </a>
            <div className="current-user">
                <img
                    src={process.env.PUBLIC_URL + '/users/' + user.userId + '.svg'}
                    alt="user"
                    className="current-user-img"
                />
                <div>
                    <p className="current-user-name">
                        {user.firstName}
                    </p>
                    <p className="current-user-name">
                        {user.secondName}
                    </p>
                    <p className="current-user-role">
                      {getRoleTitle(user.role)}
                    </p>
                </div>
                <LogoutOutlined 
                    className="logout-icon"
                    onClick={deleteCookie} />
            </div>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content className="site-content">
          <Routes>
            <Route path="/" element={<Navigate to="/polls" replace />}></Route>
            <Route path="/polls" element={<Polls />}></Route>
            <Route path="/polls/:id" element={<Poll />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/overallRating" element={<OverallRating />}></Route>
            <Route path="*" element={<P404 />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default StartPage;