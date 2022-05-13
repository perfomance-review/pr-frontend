import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home'
import { Polls } from './pages/Polls'
import { Poll } from './pages/Poll'
import { P404 } from './pages/P404'
import './App.css';
import logo from './logo.png';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
const menuPoints = [
  {
    title: "Главная",
    to: "/"
  },
  {
    title: "Опросы",
    to: "/polls"
  },
]

function App() {
  return (
    <Layout hasSider>
        <Sider className="sider">
            <div className="logo">
                <img src={logo} className="logo-img" alt="logo" />
                <p className='logo-text'>Performance<br/>review</p>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
              {menuPoints.map((point,index) =>
                <Menu.Item key={index}>
                  <Link to={point.to}>{point.title}</Link>
                </Menu.Item>
              )}
            </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content className="site-content">
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/polls' element={<Polls/>}></Route>
              <Route path='/polls/:id' element={<Poll/>}></Route>
              <Route path='*' element={<P404/>}></Route>
            </Routes>
          </Content>
        </Layout>
    </Layout>
  );
}

export default App;
