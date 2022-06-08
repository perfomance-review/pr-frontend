import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, Space } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';
import PollService from '../API/PollService';

const { Title } = Typography;
const { Option } = Select;

const PollTake = ({ updatePollStatus }) => {
  const [question, setQuestion] = useState({
    questionId: '',
    text: '',
    hasNext: false,
    pairsOfPollInfo: [
      {
        person1: { userId: '', firstName: '', secondName: '' },
        person2: { userId: '', firstName: '', secondName: '' },
      },
    ],
  });
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [pairNumber, setPairNumber] = useState(0);
  const pollId = useParams().id;

  useEffect(() => {
    getQuestion();
  }, []);

  async function getQuestion() {
    setIsPollLoading(true);
    const response = await PollService.getQuestion(pollId);
    setQuestion(response);
    setIsPollLoading(false);
  }

  async function updateWinner(winnerId) {
    setIsPollLoading(true);
    const userAnswer = {
      pollId: pollId,
      questionId: question.questionId,
      person1Id: question.pairsOfPollInfo[pairNumber].person1.userId,
      person2Id: question.pairsOfPollInfo[pairNumber].person2.userId,
      winnerId: winnerId,
      isCompleted: !question.hasNext,
    };
    const response = await PollService.updateWinner(userAnswer);
    if(response){
      if (pairNumber + 1 < question.pairsOfPollInfo.length) {
        setPairNumber(pairNumber + 1);
      } else if (question.hasNext) {
        getQuestion();
        setPairNumber(0);
      } else {
        updatePollStatus('CLOSE');
      }
    }
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
            На оценку
          </Title>

          <div className="question-page-wrapper">
            <p className="question">{question.text}</p>

            <div className="answers-wrapper">
              <div className="answer">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    '/users/' +
                    question.pairsOfPollInfo[pairNumber].person1.userId +
                    '.svg'
                  }
                  alt="user"
                  className="answer-user"
                />
                <Title level={5} className="page-header">
                  {question.pairsOfPollInfo[pairNumber].person1.firstName}{' '}
                  {question.pairsOfPollInfo[pairNumber].person1.secondName}
                </Title>
                <Button
                  onClick={(event) => {
                    updateWinner(question.pairsOfPollInfo[pairNumber].person1.userId);
                  }}
                  type="primary"
                  shape="round"
                  size="large"
                  className="start-button"
                >
                  Выбрать
                </Button>
              </div>
              <div className="answer">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    '/users/' +
                    question.pairsOfPollInfo[pairNumber].person2.userId +
                    '.svg'
                  }
                  alt="user"
                  className="answer-user"
                />
                <Title level={5} className="page-header">
                  {question.pairsOfPollInfo[pairNumber].person2.firstName}{' '}
                  {question.pairsOfPollInfo[pairNumber].person2.secondName}
                </Title>
                <Button
                  onClick={(event) => {
                    updateWinner(question.pairsOfPollInfo[pairNumber].person2.userId);
                  }}
                  type="primary"
                  shape="round"
                  size="large"
                  className="start-button"
                >
                  Выбрать
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { PollTake };
