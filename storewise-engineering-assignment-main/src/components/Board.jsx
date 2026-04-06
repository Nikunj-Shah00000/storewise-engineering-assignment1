import {useState} from 'react';
import Task from './Task';

const Board = () => {

  const [totalTasks, setTotalTasks] = useState(2);
  

  const increment = () => {
    
    setTimeout(() => {
      // a blocking process that should run before we increment totalTasks value
      // this is commented out for the assignment , but we need it to be here
      // blockingFunction()
      
      setTotalTasks(totalTasks + 1);
    }, 500);
  };
 
  return (
    <div className="container">
      <h2>Tasks ({totalTasks})</h2>
      <button>Clone Task</button>
      <button onClick={increment}>Create Task</button>
      <ul>
      {Array.from(Array(totalTasks).keys()).map((i) => (
        <li key={i}><Task id={i}/></li>
      ))}
      </ul>
    </div>
  );
};

export default Board;
