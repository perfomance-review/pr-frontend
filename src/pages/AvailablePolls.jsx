import React from 'react';
import { Polls } from './Polls';

const AvailablePolls = () => {
  return (
    <Polls 
      title="Доступные опросы"
      statuses={['OPEN','PROGRESS']} />
  );
};

export { AvailablePolls };
