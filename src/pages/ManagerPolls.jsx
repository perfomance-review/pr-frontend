import React from 'react';
import { Polls } from './Polls';

const ManagerPolls = () => {
  return (
    <Polls
      title="Пройденные и завершенные опросы"
      statuses={['COMPLETED','CLOSED']}></Polls>
  );
};

export { ManagerPolls };
