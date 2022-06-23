import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Spin, Space, notification } from 'antd';
import { FieldTimeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import PollService from '../API/PollService';
import CommonFunctions from '../API/CommonFunctions';
const { Meta } = Card;
const { Title } = Typography;

const openNotification = () => {
  notification.open({
    message: 'Результаты опроса будут доступны после deadline',
    description: '',
  });
};

const ClosedPolls = () => {
  const [polls, setPolls] = useState([]);
  const [isPollsLoading, setIsPollsLoading] = useState(false);

  useEffect(() => {
    getPolls();
  }, []);

  async function getPolls() {
    setIsPollsLoading(true);
    const response = await PollService.getUserPolls(['COMPLETED','CLOSED']);
    setPolls(response);
    setIsPollsLoading(false);
  }

  return (
    <div>
      {isPollsLoading ? (
        <Space className="data-loader">
          <Spin size="large" />
        </Space>
      ) : (
        <>
          <Title level={2} className="page-header">
            Пройденные и завершенные опросы
          </Title>
          <div className="polls-wrapper">
            {polls.map((poll, index) => (
              poll.status == "CLOSED" 
              ? (<Link to={`/profile/${poll.pollId}`} key={poll.pollId}>
                  <Card hoverable className="poll-card" title={poll.title}>
                    <p>{poll.description}</p>
                    <div className="poll-card-details">
                      <div>
                        <QuestionCircleOutlined className="poll-card-detail-icon" />
                        {poll.questionsCount}
                      </div>
                      <div>
                        <FieldTimeOutlined className="poll-card-detail-icon" />
                        {CommonFunctions.formatDate(poll.deadline)}
                      </div>
                    </div>
                  </Card>
                </Link>)
              :(<Card hoverable 
                      className="poll-card" 
                      title={poll.title} 
                      key={poll.pollId} 
                      onClick={openNotification}>
                  <p>{poll.description}</p>
                  <div className="poll-card-details">
                    <div>
                      <QuestionCircleOutlined className="poll-card-detail-icon" />
                      {poll.questionsCount}
                    </div>
                    <div>
                      <FieldTimeOutlined className="poll-card-detail-icon" />
                      {CommonFunctions.formatDate(poll.deadline)}
                    </div>
                  </div>
                </Card>)
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { ClosedPolls };
