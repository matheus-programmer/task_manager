// frontend/src/pages/ViewTask.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchTask();
  }, [id]);
  
  const fetchTask = async () => {
    try {
      const result = await api.getTaskById(id);
      setTask(result);
    } catch (error) {
      setError('Erro ao buscar detalhes da tarefa');
      console.error('Erro ao buscar tarefa:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await api.deleteTask(id);
        navigate('/');
      } catch (error) {
        setError('Erro ao excluir tarefa');
        console.error('Erro ao excluir tarefa:', error);
      }
    }
  };
  
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
  
  if (loading) {
    return <div className="loading">Carregando detalhes da tarefa...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Voltar para Lista
        </button>
      </div>
    );
  }
  
  if (!task) {
    return (
      <div className="not-found">
        <h2>Tarefa não encontrada</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Voltar para Lista
        </button>
      </div>
    );
  }
  
  return (
    <div className="view-task-container">
      <div className="task-header">
        <h2>{task.title}</h2>
        <div className={`task-status ${getStatusClass(task.status)}`}>
          {task.status}
        </div>
      </div>
      
      <div className="task-body">
        <h3>Descrição:</h3>
        <p className="task-description">
          {task.description || 'Sem descrição.'}
        </p>
      </div>
      
      <div className="task-actions">
        <Link to="/" className="btn-back">
          Voltar para Lista
        </Link>
        <Link to={`/edit/${task.id}`} className="btn-edit">
          Editar Tarefa
        </Link>
        <button className="btn-delete" onClick={handleDelete}>
          Excluir Tarefa
        </button>
      </div>
    </div>
  );
}

export default ViewTask;