import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { Profile } from './pages/Profile';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import Cookies from './API/Cookies';
import { changeUserAction } from './reducers/user';

function App() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(!!Cookies.getCookie('access-token'));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.deleteCookie("access-token")
    setIsLogin(false);
    navigate('/');
    dispatch(changeUserAction({userId:"",firstName:"",secondName:"",role:""}));
  };

  return (
    <div className="h100 login-page">
      {isLogin ? <StartPage onLogout={onLogout} /> : <LoginPage setIsLogin={setIsLogin} />}
    </div>
  );
}

export default App;
