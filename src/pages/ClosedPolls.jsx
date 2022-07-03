import React from 'react';
import { Polls } from './Polls';

const ClosedPolls = () => {
  return (
    <Polls
      title="Пройденные и завершенные опросы"
      statuses={['COMPLETED','CLOSED']}
      userType={'respondent'}></Polls>
  );
};

export { ClosedPolls };
