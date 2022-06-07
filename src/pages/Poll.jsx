import React, {useState } from 'react';
import { PollStart } from './PollStart';
import { PollTake } from './PollTake';
import { PollResult } from './PollResult';

const Poll = () => {
  const [pollStage, setPollStage] = useState(0);

  const updatePollStage = (value) => {
    setPollStage(value)
  }
  
  return (
    <div>
      {pollStage == 0 ? (
        <PollStart updatePollStage={updatePollStage}/>
      ) : (
        <>
          {pollStage == 1 ? (
            <PollTake updatePollStage={updatePollStage}/>
          ) : (
            <PollResult/>
          )}
          
        </>
      )}
    </div>
  );
};

export { Poll };
