import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, Space } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';
import PollService from '../API/PollService';

const { Title } = Typography;
const { Option } = Select;

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

const Poll = () => {
  const [poll, setPoll] = useState({title:"",questionsCount:0,deadline:"",respondents:[],users:[],respondentsCount:0});
  const [isPollLoading, setIsPollLoading] = useState(false);
  const pollId = useParams().id;
  
  const [selectedUsers, setSelectedUsers] = useState([]);

  const usersList = useMemo(() => {
    return poll.users.map(({ id, name }) => ({ label: name, value: id }))
  }, [poll]);

  useEffect(() => {
    getPoll();
  }, []);

  async function getPoll() {
    setIsPollLoading(true);
    const response = await PollService.getPoll(pollId);
    const changedResponse = {
      respondentsCount: response.respondents.length,
      users: response.respondents.map(item => ({id: item.userId, name: item.secondName + " " + item.firstName})),
      selectedUsers: response.respondents.map(item => (item.userId)),
      title: response.title,
      questionsCount: response.questionsCount,
      deadline: response.deadline
    }
    setPoll(changedResponse);
    setSelectedUsers(changedResponse.selectedUsers)
    setIsPollLoading(false);
  }

  function handleChange(value) {
    setSelectedUsers(value);
  }

  async function startPoll() {
    setIsPollLoading(true);
    const response = await PollService.startPoll(pollId,selectedUsers);
    setIsPollLoading(false);
  }

  return (
    <div>
      {isPollLoading ? (
        <Space className="data-loader">
          <Spin size="large" />
        </Space>
      ) : (
        <>
          <Title level={2} className="page-header">
            Опрос "{poll.title}"
          </Title>
          <p className="poll-description">
            <b>Подробности:</b> Опрос займёт приблизительно {countPollTime(poll.questionsCount, poll.respondentsCount)}
          </p>
          <p className="poll-description">
            <b>Срок выполнения:</b> {poll.deadline}
          </p>
          <p className="poll-description">
            <b>Количество вопросов:</b> {poll.questionsCount}
          </p>
          <p className="poll-description">
            <b>Оцениваемые коллеги</b>
          </p>

          <Select
            mode="multiple"
            size="large"
            placeholder="Выберите коллег"
            options={usersList}
            value={selectedUsers}
            onChange={handleChange}
            className="user-picker"
          />

          <Button 
              onClick={startPoll}
              type="primary" 
              shape="round" 
              size="large" 
              className="start-button">
            Начать
          </Button>
        </>
      )}
    </div>
  );
};

export { Poll };
