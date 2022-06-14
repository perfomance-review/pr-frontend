import React, { useEffect, useState } from 'react';
import { Typography, Spin, Space } from 'antd';
import { Select, Button, Table, Tag } from 'antd';

const { Title } = Typography;
const { Option } = Select;
const columns = [
  {
    title: '',
    dataIndex: 'userId',
    key: 'userId',
    render: (text) => 
      <img
        src={
          process.env.PUBLIC_URL +
          '/users/' + text + '.svg'
        }
        alt="user"
        className="rating-img"
      />,
  },
  {
    title: 'Сотрудник',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Баллы',
    dataIndex: 'marks',
    key: 'marks',
  },
  {
    title: 'Профиль',
    key: 'profile',
    render: () => 
      <a href="/profile">
        <Button
          type="primary"
          shape="round"
          size="default"
        >
          Подробнее
        </Button>
      </a>,
  },
];
const data = [
  {
    userId: '00000000-0000-0000-0000-000000000004',
    user: 'John Brown',
    marks: 32,
    profile: '00000000-0000-0000-0000-000000000004',
  },
  {
    userId: '00000000-0000-0000-0000-000000000004',
    user: 'John Brown',
    marks: 32,
    profile: '00000000-0000-0000-0000-000000000004',
  },
  {
    userId: '00000000-0000-0000-0000-000000000004',
    user: 'John Brown',
    marks: 32,
    profile: '00000000-0000-0000-0000-000000000004',
  },
];

const OverallRating = () => {
  const [isPollLoading, setIsPollLoading] = useState(false);

  return (
    <div>
      {!isPollLoading ? (
        <>
          <Title level={2} className="page-header">
            Рейтинг, на основании оценок сотрудников
          </Title>

          <div className="question-page-wrapper">
              <Title level={5} className="question">
                1. Соответствие занимаемой позиции («Кто, на твой взгляд, лучше справляется со своими задачами?»)
              </Title>
          </div>

          <div className="rating-table-wrapper">
            <Table columns={columns} 
              dataSource={data}
              pagination={false} />
          </div>
        </>
      ) : (
        <Space className="data-loader">
          <Spin size="large" />
        </Space>
      )}
    </div>
  );
};

export { OverallRating };
