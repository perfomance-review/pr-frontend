import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Profile } from './pages/Profile';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import Cookies from './API/Cookies';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setIsLogin(Cookies.getCookie('user-id'));
  }, []);

  const onLogout = (cookieName) => {
    Cookies.deleteCookie(cookieName, user.userId)
    setIsLogin(Cookies.getCookie(cookieName));
  };

  return (
    <div className="h100 login-page">
      {isLogin ? <StartPage onLogout={onLogout} /> : <LoginPage setIsLogin={setIsLogin} />}
    </div>
  );
}

export default App;
