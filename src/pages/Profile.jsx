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
            <img src={process.env.PUBLIC_URL + '/users/3.svg'} alt="user" className="info-img" />
            Ксения Кушнаренко
          </p>

          <div className="info-wrapper">
            Кто, на твой взляд, лучше справляется со своими задачами?
          </div>
          <input type="range" min="0" max="10" value="7" step="1" className="range purple" />

          <div className="info-wrapper">
            Кто, на твой взляд, лучше справляется со своими задачами?
          </div>
          <input type="range" min="0" max="10" value="7" step="1" className="range purple" />

          <div className="info-wrapper">
            Кто, на твой взляд, лучше справляется со своими задачами?
          </div>
          <input type="range" min="0" max="10" value="7" step="1" className="range purple" />
        </div>

        <div className="profile-block">
          <Diagram />
        </div>
      </div>
    </div>
  );
};

export { Profile };
