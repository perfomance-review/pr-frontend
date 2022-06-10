import React, { useEffect, useState } from 'react';
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

const PollStart = (props) => {
  const [isPollLoading, setIsPollLoading] = useState(false);
  const pollId = useParams().id;
  const [selectedUsers, setSelectedUsers] = useState(props.poll.selectedUsers);

  useEffect(() => {
    setSelectedUsers(props.poll.selectedUsers);
  }, [props.poll.selectedUsers]);

  function handleChange(value) {
    setSelectedUsers(value);
  }

  async function startPoll() {
    setIsPollLoading(true);
    const response = await PollService.startPoll(pollId, selectedUsers);
    props.updatePollStatus(response.status);
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
            Опрос "{props.poll.title}"
          </Title>
          <p className="poll-description">
            <b>Описание:</b> {props.poll.description}
          </p>
          <p className="poll-description">
            <b>Подробности:</b> Опрос займёт приблизительно{' '}
            {countPollTime(props.poll.questionsCount, props.poll.respondentsCount)}
          </p>
          <p className="poll-description">
            <b>Срок выполнения:</b> {props.poll.deadline}
          </p>
          <p className="poll-description">
            <b>Количество вопросов:</b> {props.poll.questionsCount}
          </p>
          <p className="poll-description">
            <b>Оцениваемые коллеги</b>
          </p>

          <Select
            mode="multiple"
            size="large"
            placeholder="Выберите коллег"
            options={props.usersList}
            value={selectedUsers}
            onChange={handleChange}
            className="user-picker"
          />

          <Button
            onClick={startPoll}
            type="primary"
            shape="round"
            size="large"
            className="start-button"
          >
            Начать
          </Button>
        </>
      )}
    </div>
  );
};

export { PollStart };
