// frontend/src/services/api.js

import Parse from 'parse';

// Inicializar o Parse
Parse.initialize('TbcacKDAgXr3wyXDU8pvpVGPlGzudBCZeEijT2Qr', 'nAxT42aH08Gis2t5F2eU5pHRtuwYbbvgvkTZrCgF');
Parse.serverURL = 'https://parseapi.back4app.com/';

const api = {
  // Buscar todas as tarefas
  getTasks: async () => {
    try {
      const result = await Parse.Cloud.run('getTasks');
      return result;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw error;
    }
  },
  
  // Buscar uma tarefa pelo ID
  getTaskById: async (taskId) => {
    try {
      const result = await Parse.Cloud.run('getTaskById', { taskId });
      return result;
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      throw error;
    }
  },
  
  // Criar uma nova tarefa
  createTask: async (taskData) => {
    try {
      const result = await Parse.Cloud.run('createTask', taskData);
      return result;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },
  
  // Atualizar uma tarefa existente
  updateTask: async (taskId, taskData) => {
    try {
      const result = await Parse.Cloud.run('updateTask', {
        taskId,
        ...taskData
      });
      return result;
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },
  
  // Excluir uma tarefa
  deleteTask: async (taskId) => {
    try {
      const result = await Parse.Cloud.run('deleteTask', { taskId });
      return result;
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      throw error;
    }
  },
  
  // Filtrar tarefas por status
  getTasksByStatus: async (status) => {
    try {
      const result = await Parse.Cloud.run('getTasksByStatus', { status });
      return result;
    } catch (error) {
      console.error('Erro ao filtrar tarefas:', error);
      throw error;
    }
  }
};

export default api;