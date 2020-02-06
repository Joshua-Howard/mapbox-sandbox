import React from 'react';

const Child1 = ({ testProp }) => {
  return (
    <div>
      This text should change because its the child
      {testProp}
    </div>
  );
};

export default Child1;
