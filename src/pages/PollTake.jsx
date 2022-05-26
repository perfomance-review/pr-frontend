import React, { useEffect, useState } from 'react';
import user1 from '../users/1.svg';
import user2 from '../users/2.svg';
import user3 from '../users/3.svg';
import user4 from '../users/4.svg';
import user5 from '../users/5.svg';
import user6 from '../users/6.svg';
import { Typography } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const PollTake = () => {
  return (
    <div>
      <Title level={2} className="page-header">
        На оценку
      </Title>
      
      <div className='question-page-wrapper'>
        <p className='question'>
          1. Кто, на твой взляд, лучше справляется со своими задачами?
        </p>

        <div className='answers-wrapper'>
          <div className='answer'>
            <img src={user2} alt="user" className='answer-user' />
            <Button type="primary" shape="round" size="large" className="start-button">
              Выбрать
            </Button>
          </div>
          <div className='answer'>
            <img src={user1} alt="user" className='answer-user' />
            <Button type="primary" shape="round" size="large" className="start-button">
              Выбрать
            </Button>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export { PollTake };
