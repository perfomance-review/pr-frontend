import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Select, Typography, Spin, Space } from 'antd';
import { Diagram } from './Diagram';
import { useSelector } from 'react-redux';
import PollService from '../API/PollService';

const { Title } = Typography;
const { Option } = Select;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState({ resultForQuestions: [], resultForCompetences: [] });
  const [isPollLoading, setIsPollLoading] = useState(false);
  const pollId = useParams().id;

  useEffect(() => {
    getUserResult();
  }, []);

  async function getUserResult() {
    setIsPollLoading(true);
    const response = await PollService.getUserResult(pollId);
    setResult(response);
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
            Профиль сотрудника
          </Title>

          <div className="profile-wrapper">
            <div className="profile-block">
              <div className="info-wrapper">
                <img
                  src={process.env.PUBLIC_URL + '/users/' + user.userId + '.svg'}
                  alt="user"
                  className="info-img"
                />
                <Title level={4} className="page-header">
                  {user.firstName} {user.secondName}
                </Title>
              </div>

              {result.resultForQuestions.map((question, index) => (
                <div key={index}>
                  <div className="info-wrapper">
                    {question.textQuestion}
                    <br/>({question.textCompetence})
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={question.score}
                    step="1"
                    readOnly
                    className="range purple"
                  />
                </div>
              ))}
            </div>

            {result.resultForCompetences.length > 0 && (
              <div className="profile-block">
                <Diagram result={result.resultForCompetences} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export { Profile };
