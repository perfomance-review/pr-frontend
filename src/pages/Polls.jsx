import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    if(props.userType == 'respondent'){
      getRespondentPolls();
    } else{
      getManagerPolls();
    }
  }, []);

  async function getRespondentPolls() {
    setIsPollsLoading(true);
    const response = await PollService.getRespondentPolls(props.statuses);
    setPolls(response);
    setIsPollsLoading(false);
  }

  async function getManagerPolls() {
    setIsPollsLoading(true);
    const response = await PollService.getManagerPolls();
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
            {props.title}
          </Title>
          {polls.length == 0 ? <Empty /> : <></>}
          <div className="polls-wrapper">
            {polls.map((poll, index) => (
              (poll.status == "OPEN" || poll.status == "PROGRESS") && props.userType == 'respondent'
              ? (<Link to={`/availablePolls/${poll.pollId}`} key={poll.pollId}>
                  <Card hoverable className="poll-card" title={poll.title}>
                    <p>{poll.description}</p>
                    <p>
                      Опрос займёт приблизительно{' '}
                      {CommonFunctions.countPollTime(poll.questionsCount, poll.respondentsCount - 1)}
                    </p>
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
              :(poll.status == "CLOSED") && props.userType == 'respondent'
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
              :(poll.status == "CLOSED") && props.userType == 'manager'
              ? (<Link to={`/overallRating/${poll.pollId}`} key={poll.pollId}>
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
