import api from './api';

export const tarefaService = {
 getAllTasks: () => api.get('/tarefas/'),
 getTask: (id) => api.get(`/tarefas/${id}/`),
 createTask: (TaskData) => api.post('/tarefas/', TaskData),
 updateTask: (id, TaskData) => api.put(`/tarefas/${id}/`, TaskData),
 deleteTask: (id) => api.delete(`/tarefas/${id}/`),
};
