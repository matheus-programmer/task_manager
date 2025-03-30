// frontend/src/components/TaskItem.js

import React from 'react';
import { Link } from 'react-router-dom';

function TaskItem({ task, onDelete }) {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'status-pending';
      case 'em progresso':
        return 'status-progress';
      case 'concluída':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3>{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <div className={`task-status ${getStatusClass(task.status)}`}>
          {task.status}
        </div>
      </div>
      <div className="task-actions">
        <Link to={`/view/${task.id}`} className="btn-view">
          Visualizar
        </Link>
        <Link to={`/edit/${task.id}`} className="btn-edit">
          Editar
        </Link>
        <button className="btn-delete" onClick={onDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskItem;