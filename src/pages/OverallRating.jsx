import React, { useEffect, useState } from 'react';
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
  let usersList = [];
  users.forEach(function(item, index, array) {
    let user = {
      userId: item.userInfo.userId,
      user: item.userInfo.firstName + ' ' + item.userInfo.secondName,
      score: item.score,
      profile: pollId,
    }
    usersList.push(user)
  });
  return usersList
}

const OverallRating = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [overallRating, setOverallRating] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //const pollId = useParams().id;
  const pollId = 'd2fc6508-dda2-4b24-9df9-956e428f8a0c';

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
                <>
                  <div className="question-page-wrapper">
                    <Title level={5} className="question">
                      { overallRating[currentQuestion].textCompetence } ({ overallRating[currentQuestion].textQuestion })
                    </Title>
                  </div>
                  <div className='change-questions-button-wrapper'>
                    <Button 
                      size="large" 
                      icon={<LeftOutlined /> }
                      onClick={(event) => {
                        setCurrentQuestion(currentQuestion - 1);
                      }}
                      disabled={currentQuestion <= 0} />
                    <Button 
                      size="large" 
                      icon={<RightOutlined />}
                      onClick={(event) => {
                        setCurrentQuestion(currentQuestion + 1);
                      }}
                      disabled={currentQuestion >= overallRating.length - 1} />
                  </div>
                  <div className="rating-table-wrapper">
                    <Table columns={columns} dataSource={ changeUsersList(overallRating[currentQuestion].usersWithScore, pollId) } pagination={false} />
                  </div>
                </>
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