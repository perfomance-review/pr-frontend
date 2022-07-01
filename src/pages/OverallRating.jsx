import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Spin, Space } from 'antd';
import { Select, Button, Table } from 'antd';
import PollService from '../API/PollService';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const columns = [
  {
    title: '',
    dataIndex: 'userId',
    key: 'userId',
    render: (text) => (
      <img
        src={process.env.PUBLIC_URL + '/users/' + text + '.svg'}
        alt="user"
        className="rating-img"
      />
    ),
  },
  {
    title: 'Сотрудник',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Баллы',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Профиль',
    key: 'profile',
    render: () => (
      <Link to="/profile">
        <Button type="primary" shape="round" size="default">
          Подробнее
        </Button>
      </Link>
    ),
  },
];

function changeUsersList(users, pollId){
  return users.map((item) => ( {
    userId: item.userInfo.userId,
    user: item.userInfo.firstName + ' ' + item.userInfo.secondName,
    score: item.score,
    profile: pollId,
  }))
}

const OverallRating = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [overallRating, setOverallRating] = useState([]);
  const pollId = useParams().id;
  //const pollId = 'c125e6e9-5dbc-4452-8c7e-faf749b7be41';

  useEffect(() => {
    getOverallRating();
  }, []);

  async function getOverallRating() {
    setIsLoading(true);
    const response = await PollService.getOverallRating(pollId);
    setOverallRating(response);
    setIsLoading(false);
  }

  return (
    <div>
      {!isLoading ? (
        <>
          <Title level={2} className="page-header">
            Рейтинг, на основании оценок сотрудников
          </Title>

          {overallRating.length > 0 &&
            overallRating.map((question, index) => (
              <div key={index}>
                <div className="question-page-wrapper">
                  <Title level={5} className="question">
                    { question.textCompetence } ({ question.textQuestion })
                  </Title>
                </div>
                
                <div className="rating-table-wrapper">
                  <Table columns={columns} dataSource={ changeUsersList(question.usersWithScore, pollId) } pagination={false} />
                </div>
                </div>
              ))
          }
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