import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Profile } from './pages/Profile';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import Cookies from './API/Cookies';

function App() {
  const [isLogin, setIsLogin] = useState(!!Cookies.getCookie('access-token'));
  const user = useSelector((state) => state.user);

  const onLogout = () => {
    Cookies.deleteCookie("access-token")
    setIsLogin(false);
  };

  return (
    <div className="h100 login-page">
      {isLogin ? <StartPage onLogout={onLogout} /> : <LoginPage setIsLogin={setIsLogin} />}
    </div>
  );
}

export default App;
