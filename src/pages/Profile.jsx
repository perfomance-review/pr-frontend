import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';
import { Diagram } from './Diagram';

const { Title } = Typography;
const { Option } = Select;

const Profile = () => {
  return (
    <div>
      <Title level={2} className="page-header">
        Профиль сотрудника
      </Title>

      <div className="profile-wrapper">
        <div className="profile-block">
          <p className="info-wrapper">
            <img src={process.env.PUBLIC_URL + '/users/5f6b794a-bf0f-4a81-b28b-7e1faad011ec.svg'} alt="user" className="info-img" />
            <Title level={4} className="page-header">
              Ксения Кушнаренко
            </Title>
          </p>

          <div className="info-wrapper">
            Кто, на твой взляд, лучше справляется со своими задачами?
            <br/>(профессионализм)
          </div>
          <input type="range" min="0" max="10" value="8" step="1" className="range purple" />

          <div className="info-wrapper">
            Кто чаще других вовлекается в рабочие задачи и готов помогать другим?
            <br/>(вовлеченность)
          </div>
          <input type="range" min="0" max="10" value="4" step="1" className="range purple" />

          <div className="info-wrapper">
            Кто более ответственно подходит к выполнению задач?
            <br/>(ответственность)
          </div>
          <input type="range" min="0" max="10" value="6" step="1" className="range purple" />
        
          <div className="info-wrapper">
            Кто скорее отзовется на помощь коллегам?
            <br/>(отзывчивость)
          </div>
          <input type="range" min="0" max="10" value="8" step="1" className="range purple" />

          <div className="info-wrapper">
            К чьему мнению чаще прислушиваются?
            <br/>(лидерство)
          </div>
          <input type="range" min="0" max="10" value="2" step="1" className="range purple" />

        </div>

        <div className="profile-block">
          <Diagram />
        </div>
      </div>
    </div>
  );
};

export { Profile };
