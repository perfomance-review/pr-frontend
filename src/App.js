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

  const deleteCookie = (values) => {
    document.cookie = 'user-id=' + user.userId + ';max-age=-1';
    setIsLogin(Cookies.getCookie('user-id'));
  };

  return (
    <div className="h100 login-page">
      {isLogin ? <StartPage deleteCookie={deleteCookie} /> : <LoginPage setIsLogin={setIsLogin} />}
    </div>
  );
}

export default App;
