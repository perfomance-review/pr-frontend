import React from 'react';
import { Polls } from './Polls';

const ManagerPolls = () => {
  return (
    <Polls
      title="Опросы"
      statuses={[]}
      userType={'manager'}></Polls>
  );
};

export { ManagerPolls };
