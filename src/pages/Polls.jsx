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

  let hDisplay = h > 0 ? h + (h % 10 == 1 ? ' час ' : h % 10 < 5 ? ' часa ' : ' часов ') : '';
  let mDisplay = m > 0 ? m + (m % 10 == 1 ? ' минута ' : m % 10 < 5 ? ' минуты ' : ' минут ') : '';

  return hDisplay + mDisplay;
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
                      {poll.deadline}
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
