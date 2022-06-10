import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PollStart } from './PollStart';
import { PollTake } from './PollTake';
import { PollResult } from './PollResult';
import PollService from '../API/PollService';
import AdditionalFunctions from '../API/AdditionalFunctions';
import { Spin, Space } from 'antd';
import 'antd/dist/antd.css';
import {Status} from '../API/Status';

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
    const newPoll = {...poll, status: value}
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
      deadline: AdditionalFunctions.formatDate(response.deadline),
      status: response.status,
      description: response.description,
    };
    setPoll(changedResponse);
    setIsPollLoading(false);
  }

  function showScreen(){
    if (poll.status == Status.Open) {
      return (
        <PollStart 
              poll={poll}
              usersList={usersList}
              updatePollStatus={updatePollStatus} />
      )
    } 
    
    if (poll.status === Status.Progress) {
      return  (
        <PollTake 
          updatePollStatus={updatePollStatus} /> 
      )
    }
    return <PollResult />
  }

  return (
    <div>
      {isPollLoading ? (
        <Space className="data-loader">
          <Spin size="large" />
        </Space>
      ) : (
        <>
          {showScreen()}
        </>
      )}
    </div>
  );
};

export { Poll };
