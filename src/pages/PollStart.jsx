import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, Space } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';
import PollService from '../API/PollService';
import CommonFunctions from '../API/CommonFunctions';

const { Title } = Typography;
const { Option } = Select;

const PollStart = (props) => {
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [pollTime, setPollTime] = useState(
    CommonFunctions.countPollTime(props.poll.questionsCount, props.poll.respondentsCount),
  );
  const pollId = useParams().id;
  const [selectedUsers, setSelectedUsers] = useState(props.poll.selectedUsers);

  useEffect(() => {
    setSelectedUsers(props.poll.selectedUsers);
  }, [props.poll.selectedUsers]);

  function handleChange(value) {
    if (value.length >= 2) {
      setSelectedUsers(value);
      setPollTime(CommonFunctions.countPollTime(props.poll.questionsCount, value.length));
    }
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
            <b>Подробности:</b> Опрос займёт приблизительно {pollTime}
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
