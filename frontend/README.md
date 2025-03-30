# Gerenciador de Tarefas

Este é um gerenciador de tarefas simples e bonito, desenvolvido para demonstrar o uso de plataformas em nuvem para o desenvolvimento e implantação de aplicações web.

## Tecnologias Utilizadas

### Frontend
- React.js para a interface do usuário
- CSS para estilização
- React Router para navegação
- Vercel para hospedagem do frontend

### Backend
- Parse Server (Back4App) para o backend
- Cloud Functions para a lógica de negócios

## Estrutura do Projeto

O projeto está estruturado em duas partes principais:

1. **Frontend**: Contém a interface do usuário desenvolvida em React.js
2. **Backend**: Contém as funções do servidor usando Parse Server no Back4App

## Funcionalidades

- Visualizar lista de tarefas
- Criar novas tarefas
- Editar tarefas existentes
- Excluir tarefas
- Visualizar detalhes de uma tarefa
- Filtrar tarefas por status (pendente, em progresso, concluída)

## Configuração e Execução

### Pré-requisitos
- Node.js (v14 ou superior)
- Conta no Back4App
- Conta no Vercel (para implantação)

### Configuração do Backend (Back4App)
1. Crie uma conta no [Back4App](https://www.back4app.com/)
2. Crie um novo aplicativo
3. Na seção "Database", crie uma classe chamada `Task` com os seguintes campos:
   - title (String)
   - description (String)
   - status (String)
4. Na seção "Cloud Code", faça o upload dos arquivos da pasta `backend/cloud`
5. Anote seu `Application ID` e `JavaScript Key` para configuração do frontend

### Configuração do Frontend
1. Abra o arquivo `frontend/src/services/api.js`
2. Substitua `'SUA_APP_ID'` e `'SUA_JAVASCRIPT_KEY'` pelos valores do seu aplicativo no Back4App

### Execução Local
1. Navegue até a pasta `frontend`
2. Execute `npm install` para instalar as dependências
3. Execute `npm start` para iniciar o servidor de desenvolvimento
4. Acesse `http://localhost:3000` no seu navegador

### Implantação no Vercel
1. Crie uma conta no [Vercel](https://vercel.com/)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `REACT_APP_PARSE_APP_ID`: Seu Application ID do Back4App
   - `REACT_APP_PARSE_JS_KEY`: Seu JavaScript Key do Back4App
4. Implante o projeto

## Distribuição de Tarefas para a Equipe

Este projeto pode ser dividido entre os membros da equipe da seguinte forma:

1. **Membro 1**: Implementação do CRUD de tarefas (criar e listar tarefas)
   - Frontend: Componentes `Home.js` e `CreateTask.js`
   - Backend: Funções `getTasks` e `createTask`

2. **Membro 2**: Implementação do CRUD de tarefas (editar e visualizar tarefas)
   - Frontend: Componentes `EditTask.js` e `ViewTask.js`
   - Backend: Funções `getTaskById` e `updateTask`

3. **Membro 3**: Implementação do CRUD de tarefas (excluir tarefas e filtrar por status)
   - Frontend: Componentes `TaskItem.js` (lógica de exclusão) e filtro de status em `Home.js`
   - Backend: Funções `deleteTask` e `getTasksByStatus`

4. **Membro 4**: Implementação da interface e estilização
   - Frontend: Componentes `Header.js` e estilos CSS
   - Backend: Configuração inicial do Back4App

## Repositório

O código-fonte deste projeto está disponível em: [URL_DO_REPOSITÓRIO]

## URLs de Acesso

- Frontend: [URL_DO_FRONTEND_NO_VERCEL]
- Backend: [URL_DO_BACKEND_NO_BACK4APP]