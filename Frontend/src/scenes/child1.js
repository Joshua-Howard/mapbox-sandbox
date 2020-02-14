import React, { useMemo, useEffect } from 'react';
import Child2 from './child2';

// const Child1 = ({ testProp }) => {
//   return useMemo(
//     () => (
//       <div>
//         Dont Re-render - Here is the prop we are passing down
//         {testProp}
//         <Child2 testProp={testProp} />
//       </div>
//     ),
//     [testProp]
//   );
// };

// eslint-disable-next-line no-unused-vars
function Container({ testProp }) {
  useEffect(() => () => console.log('Child Dismounting'));

  const Child1 = useMemo(
    () => {
      console.log('Child1 inside of the container is re-rendering');
      return (
        <div>
          Dont Re-render - Here is the prop we are passing down
          {
            //! If the second parameter of useMemo is not updated, this testProp value will not change
          }
          {testProp}
        </div>
      );
    },
    []
    // ,[testProp]  // This line will cause this function to be run each time the parent functional component is mounted
  );

  return Child1;
}

export default Container;
