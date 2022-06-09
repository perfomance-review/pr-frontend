import React, { useEffect, useState } from 'react';
import result from '../result.png';
import { Typography } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const PollResult = () => {
  return (
    <div>
      <Title level={2} className="page-header">
        Оценка завершена
      </Title>

      <div className="question-page-wrapper">
        <div className="question">
          <Title level={3} className="page-header">
            Оценка завершена
          </Title>
          <p>
            Спасибо, что нашли время и ответили на наши вопросы. Ваше мнение очень важно для нас. Мы
            используем ваши ответы для того, чтобы сделать совместную работу ещё лучше.
          </p>
        </div>
        <img src={result} className="question-result-img" />
      </div>
    </div>
  );
};

export { PollResult };
