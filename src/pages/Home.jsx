import React from 'react';
import 'antd/dist/antd.css';
import logo from '../logoGray.png';
import { Typography } from 'antd';
const { Title } = Typography;


const Home = () => {
    return(
        <div className='main-page-wrap'>
            <div className='main-page-left'>
                <Title>Performance review</Title>
                <img src={logo} className="app-logo" alt="logo" />
            </div>
        </div>
    )
}

export {Home}