import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PollStart } from './PollStart';
import { PollTake } from './PollTake';
import { PollResult } from './PollResult';
import PollService from '../API/PollService';
import { Spin, Space } from 'antd';
import 'antd/dist/antd.css';

const Poll = () => {
  const [poll, setPoll] = useState({
    title: '',
    questionsCount: 0,
    deadline: '',
    users: [],
    respondentsCount: 0,
    selectedUsers: [],
    status: "",
  });
  const updatePollStatus = (value) => {
    let newPoll = poll;
    newPoll.status = value;
    setPoll(newPoll);
  };
  const [isPollLoading, setIsPollLoading] = useState(false);
  const pollId = useParams().id;

  const usersList = useMemo(() => {
    return poll.users.map(({ id, name }) => ({ label: name, value: id }));
  }, [poll]);

  useEffect(() => {
    getPoll();
  }, []);

  async function getPoll() {
    setIsPollLoading(true);
    const response = await PollService.getPoll(pollId);
    const changedResponse = {
      respondentsCount: response.respondents.length,
      users: response.respondents.map((item) => ({
        id: item.userId,
        name: item.secondName + ' ' + item.firstName,
      })),
      selectedUsers: response.respondents.map((item) => item.userId),
      title: response.title,
      questionsCount: response.questionsCount,
      deadline: response.deadline,
      status: response.status,
    };
    setPoll(changedResponse);
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
          {poll.status == 'OPEN' ? (
            <PollStart 
              poll={poll}
              usersList={usersList}
              updatePollStatus={updatePollStatus} />
          ) : (
            <>
              {poll.status == 'PROGRESS' 
                ? <PollTake 
                    updatePollStatus={updatePollStatus} /> 
                : <PollResult />}
            </>
          )}
        </>
      )}
    </div>
  );
};

export { Poll };
