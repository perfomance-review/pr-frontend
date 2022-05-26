import React, { useEffect, useState } from 'react';
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
            <img src={process.env.PUBLIC_URL + '/users/3.svg'} alt="user" className='answer-user' />
            <Button type="primary" shape="round" size="large" className="start-button">
              Выбрать
            </Button>
          </div>
          <div className='answer'>
            <img src={process.env.PUBLIC_URL + '/users/4.svg'} alt="user" className='answer-user' />
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
