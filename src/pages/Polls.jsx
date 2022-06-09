import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Card, Typography, Spin, Space } from 'antd';
import { FieldTimeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import PollService from '../API/PollService';
const { Meta } = Card;
const { Title } = Typography;

function countPollTime(questionsCount, respondentsCount) {
  let d = questionsCount * ((respondentsCount * (respondentsCount - 1)) / 2) * 5;
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  if (s > 0) {
    m = m + 1;
  }

  function getMinutes(m){
    if( m%10 == 1){
      return ' минута '
    } else if (m%10 == 0 || m%10 >= 5 && m%10 <= 9 || m%100 >= 11 && m%100 <= 14){
      return ' минут '
    } else {
      return ' минуты '
    }
  }
  
  function getHours(h){
    if( h%10 == 1){
      return ' час '
    } else if (h%10 == 0 || h%10 >= 5 && h%10 <= 9 || h%100 >= 11 && h%100 <= 14){
      return ' часов '
    } else {
      return ' часа '
    }
  }

  let hDisplay = h > 0 ? h + getHours(h) : '';
  let mDisplay = m > 0 ? m + getMinutes(m) : '';

  return hDisplay + mDisplay;
}

function formatDate(date){
  return new Date(date).toLocaleDateString('ru-RU');
}

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [isPollsLoading, setIsPollsLoading] = useState(false);

  useEffect(() => {
    getPolls();
  }, []);

  async function getPolls() {
    setIsPollsLoading(true);
    const response = await PollService.getUserPolls();
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
            Доступные опросы
          </Title>
          <div className="polls-wrapper">
            {polls.map((poll, index) => (
              <Link to={`/polls/${poll.pollId}`} key={poll.pollId}>
                <Card hoverable className="poll-card" title={poll.title}>
                  <p>{poll.description}</p>
                  <p>
                    Опрос займёт приблизительно{' '}
                    {countPollTime(poll.questionsCount, poll.respondentsCount)}
                  </p>
                  <div className="poll-card-details">
                    <div>
                      <QuestionCircleOutlined className="poll-card-detail-icon" />
                      {poll.questionsCount}
                    </div>
                    <div>
                      <FieldTimeOutlined className="poll-card-detail-icon" />
                      {formatDate(poll.deadline)}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { Polls };
