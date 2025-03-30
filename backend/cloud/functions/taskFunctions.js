// backend/cloud/functions/taskFunctions.js

const Task = Parse.Object.extend("Task");

// Função para buscar todas as tarefas
const getTasks = async () => {
  const query = new Parse.Query(Task);
  query.descending("updatedAt");
  
  try {
    const results = await query.find({ useMasterKey: true });
    return results.map(task => {
      return {
        id: task.id,
        title: task.get('title'),
        description: task.get('description'),
        status: task.get('status'),
        createdAt: task.get('createdAt'),
        updatedAt: task.get('updatedAt')
      };
    });
  } catch (error) {
    throw new Error(`Erro ao buscar tarefas: ${error.message}`);
  }
};

// Função para buscar uma tarefa por ID
const getTaskById = async (taskId) => {
  const query = new Parse.Query(Task);
  
  try {
    const task = await query.get(taskId, { useMasterKey: true });
    return {
      id: task.id,
      title: task.get('title'),
      description: task.get('description'),
      status: task.get('status'),
      createdAt: task.get('createdAt'),
      updatedAt: task.get('updatedAt')
    };
  } catch (error) {
    throw new Error(`Erro ao buscar tarefa: ${error.message}`);
  }
};

// Função para criar uma nova tarefa
const createTask = async (data) => {
  const task = new Task();
  
  task.set('title', data.title);
  task.set('description', data.description || '');
  task.set('status', data.status || 'pendente');
  
  try {
    const result = await task.save(null, { useMasterKey: true });
    return {
      id: result.id,
      title: result.get('title'),
      description: result.get('description'),
      status: result.get('status'),
      createdAt: result.get('createdAt'),
      updatedAt: result.get('updatedAt')
    };
  } catch (error) {
    throw new Error(`Erro ao criar tarefa: ${error.message}`);
  }
};

// Função para atualizar uma tarefa
const updateTask = async (taskId, data) => {
  const query = new Parse.Query(Task);
  
  try {
    const task = await query.get(taskId, { useMasterKey: true });
    
    if (data.title !== undefined) task.set('title', data.title);
    if (data.description !== undefined) task.set('description', data.description);
    if (data.status !== undefined) task.set('status', data.status);
    
    const result = await task.save(null, { useMasterKey: true });
    return {
      id: result.id,
      title: result.get('title'),
      description: result.get('description'),
      status: result.get('status'),
      createdAt: result.get('createdAt'),
      updatedAt: result.get('updatedAt')
    };
  } catch (error) {
    throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
  }
};

// Função para excluir uma tarefa
const deleteTask = async (taskId) => {
  const query = new Parse.Query(Task);
  
  try {
    const task = await query.get(taskId, { useMasterKey: true });
    await task.destroy({ useMasterKey: true });
    return { message: "Tarefa excluída com sucesso" };
  } catch (error) {
    throw new Error(`Erro ao excluir tarefa: ${error.message}`);
  }
};

// Função para filtrar tarefas por status
const getTasksByStatus = async (status) => {
  const query = new Parse.Query(Task);
  query.equalTo("status", status);
  query.descending("updatedAt");
  
  try {
    const results = await query.find({ useMasterKey: true });
    return results.map(task => {
      return {
        id: task.id,
        title: task.get('title'),
        description: task.get('description'),
        status: task.get('status'),
        createdAt: task.get('createdAt'),
        updatedAt: task.get('updatedAt')
      };
    });
  } catch (error) {
    throw new Error(`Erro ao buscar tarefas: ${error.message}`);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus
};