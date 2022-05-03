import React from 'react';
import 'antd/dist/antd.css';
import logo from '../logoGray.png';
import { Typography } from 'antd';
const { Title } = Typography;


const Home = () => {
    const polls = [
        {
            id: 0,
            deadline: '03.05.2022', 
            quantity: 8,
            title: 'Poll0', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
        },
        {
            id: 1,
            deadline: '03.05.2022', 
            quantity: 7,
            title: 'Poll1', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
        },
        {
            id: 2,
            deadline: '03.05.2022', 
            quantity: 6,
            title: 'Poll2', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
        },
        {
            id: 3,
            deadline: '03.05.2022', 
            quantity: 5,
            title: 'Poll3', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
        }
    ]
    return(
        <div className="App">
            <header className="App-header">
                <Title>Performance review</Title>
                <img src={logo} className="App-logo" alt="logo" style={{width: '30%', marginBottom: '10px'}} />
            </header>
        </div>
    )
}

export {Home}