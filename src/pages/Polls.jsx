import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Typography, Spin, Space, Empty } from 'antd';
import { FieldTimeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import PollService from '../API/PollService';
import CommonFunctions from '../API/CommonFunctions';
import { openNotification } from '../API/Notification';
const { Meta } = Card;
const { Title } = Typography;

const Polls = (props) => {
  const [polls, setPolls] = useState([]);
  const [isPollsLoading, setIsPollsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getPolls();
  }, []);

  async function getPolls() {
    setIsPollsLoading(true);
    const response = user.role === 'RESPONDENT' 
      ? await PollService.getRespondentPolls(props.statuses) 
      : await PollService.getManagerPolls();
    setPolls(response);
    setIsPollsLoading(false);
  }

  function getLink(pollStatus){
    if (pollStatus === "OPEN" || pollStatus === "PROGRESS"){
      return `/availablePolls/`
    } else if (user.role === 'MANAGER'){
      return `/overallRating/`
    } 
    return `/profile/`
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
            {props.title}
          </Title>
          {polls.length === 0 && <Empty />}
          <div className="polls-wrapper">
            {polls.map((poll, index) => (
              poll.status === "CLOSED" || (["OPEN", "PROGRESS"].includes(poll.status) && user.role === 'RESPONDENT')
              ? (<Link to={`${getLink(poll.status)}${poll.pollId}`} key={poll.pollId}>
                  <Card hoverable className="poll-card" title={poll.title}>
                    <p>{poll.description}</p>
                    {(poll.status === "OPEN" || poll.status === "PROGRESS") &&
                      <p>
                        Опрос займёт приблизительно{' '}
                        {CommonFunctions.countPollTime(poll.questionsCount, poll.respondentsCount - 1)}
                      </p>
                    }
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
                      onClick={(event) => {
                        openNotification('Результаты опроса будут доступны после deadline');
                      }}>
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

export { Polls };
