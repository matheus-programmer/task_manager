// frontend/src/components/TaskList.js

import React from 'react';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={() => onDelete(task.id)} 
        />
      ))}
    </div>
  );
}

export default TaskList;