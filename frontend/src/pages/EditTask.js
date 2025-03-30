// frontend/src/pages/EditTask.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!task.title.trim()) {
      setError('O título da tarefa é obrigatório');
      return;
    }
    
    setSaving(true);
    try {
      await api.updateTask(id, task);
      navigate('/');
    } catch (error) {
      setError('Erro ao atualizar tarefa. Tente novamente.');
      console.error('Erro ao atualizar tarefa:', error);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div className="loading">Carregando detalhes da tarefa...</div>;
  }
  
  return (
    <div className="edit-task-container">
      <h2>Editar Tarefa</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Digite o título da tarefa"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Digite a descrição da tarefa"
            rows={4}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pendente">Pendente</option>
            <option value="em progresso">Em Progresso</option>
            <option value="concluída">Concluída</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-submit" 
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;