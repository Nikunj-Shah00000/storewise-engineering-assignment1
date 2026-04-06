import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Task = ({ id }) => {

  const [taskName, setTaskName] = useState(null);

  useEffect(() => {
    if (taskName === null) {
      const storedName = sessionStorage.getItem(`task-${id}`);
    
      let taskName = `Task #${id+1}`;
      if (!storedName) {
        sessionStorage.setItem(`task-${id}`, `Task #${id+1}`);
      }

      setTaskName(storedName || taskName );
    }
  }, [taskName, id]);

  return <>{taskName}</>;
};

export default Task;
