// backend/cloud/main.js

// Importar o Parse
const Parse = require('parse/node');

// Configuração inicial para o Parse Server
Parse.initialize('SUA_APP_ID', 'SUA_JAVASCRIPT_KEY');
Parse.serverURL = 'https://parseapi.back4app.com/';

// Definir a classe Task
const Task = Parse.Object.extend("Task");

// Funções do Cloud Code
Parse.Cloud.define("getTasks", async (request) => {
  const query = new Parse.Query(Task);
  try {
    const results = await query.find();
    return results.map(task => {
      return {
        id: task.id,
        title: task.get('title'),
        description: task.get('description'),
        status: task.get('status')
      };
    });
  } catch (error) {
    throw new Error(`Erro ao buscar tarefas: ${error.message}`);
  }
});

Parse.Cloud.define("getTaskById", async (request) => {
  const query = new Parse.Query(Task);
  try {
    const task = await query.get(request.params.taskId);
    return {
      id: task.id,
      title: task.get('title'),
      description: task.get('description'),
      status: task.get('status')
    };
  } catch (error) {
    throw new Error(`Erro ao buscar tarefa: ${error.message}`);
  }
});

Parse.Cloud.define("createTask", async (request) => {
  const task = new Task();
  
  task.set('title', request.params.title);
  task.set('description', request.params.description);
  task.set('status', request.params.status || 'pendente');
  
  try {
    const result = await task.save();
    return {
      id: result.id,
      title: result.get('title'),
      description: result.get('description'),
      status: result.get('status')
    };
  } catch (error) {
    throw new Error(`Erro ao criar tarefa: ${error.message}`);
  }
});

Parse.Cloud.define("updateTask", async (request) => {
  const query = new Parse.Query(Task);
  
  try {
    const task = await query.get(request.params.taskId);
    
    if (request.params.title) task.set('title', request.params.title);
    if (request.params.description) task.set('description', request.params.description);
    if (request.params.status) task.set('status', request.params.status);
    
    const result = await task.save();
    return {
      id: result.id,
      title: result.get('title'),
      description: result.get('description'),
      status: result.get('status')
    };
  } catch (error) {
    throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
  }
});

Parse.Cloud.define("deleteTask", async (request) => {
  const query = new Parse.Query(Task);
  
  try {
    const task = await query.get(request.params.taskId);
    await task.destroy();
    return { message: "Tarefa excluída com sucesso" };
  } catch (error) {
    throw new Error(`Erro ao excluir tarefa: ${error.message}`);
  }
});

// Função para filtrar tarefas por status
Parse.Cloud.define("getTasksByStatus", async (request) => {
  const query = new Parse.Query(Task);
  query.equalTo("status", request.params.status);
  
  try {
    const results = await query.find();
    return results.map(task => {
      return {
        id: task.id,
        title: task.get('title'),
        description: task.get('description'),
        status: task.get('status')
      };
    });
  } catch (error) {
    throw new Error(`Erro ao buscar tarefas: ${error.message}`);
  }
});