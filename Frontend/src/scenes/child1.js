import React, { useMemo } from 'react';
import Child2 from './child2';

const Child1 = ({ testProp }) => {
  return useMemo(
    () => (
      <div>
        Dont Re-render - Here is the prop we are passing down
        {testProp}
        <Child2 testProp={testProp} />
      </div>
    ),
    [testProp]
  );
};

export default Child1;
