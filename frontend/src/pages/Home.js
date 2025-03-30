// frontend/src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    fetchTasks();
  }, [filter]);
  
  const fetchTasks = async () => {
    setLoading(true);
    try {
      let result;
      if (filter === 'all') {
        result = await api.getTasks();
      } else {
        result = await api.getTasksByStatus(filter);
      }
      setTasks(result);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await api.deleteTask(taskId);
        // Atualizar a lista após excluir
        fetchTasks();
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
      }
    }
  };
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Minhas Tarefas</h2>
        <div className="filter-container">
          <label htmlFor="status-filter">Filtrar por status:</label>
          <select 
            id="status-filter" 
            value={filter} 
            onChange={handleFilterChange}
          >
            <option value="all">Todas</option>
            <option value="pendente">Pendentes</option>
            <option value="em progresso">Em Progresso</option>
            <option value="concluída">Concluídas</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Carregando tarefas...</div>
      ) : (
        <>
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
          ) : (
            <div className="empty-list">
              <p>Nenhuma tarefa encontrada.</p>
              <Link to="/create" className="btn-primary">Criar Nova Tarefa</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;