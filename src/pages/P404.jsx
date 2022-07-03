import React from 'react';
import 'antd/dist/antd.css';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const P404 = () => {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <Result
          status="404"
          title="404"
          subTitle="Извините, данной страницы не существует"
          extra={
            <Button 
              type="primary"
              onClick={(event) => {
                goHome();
              }}>
              Перейти на главную
            </Button>
          }
        />
  );
};

export { P404 };
