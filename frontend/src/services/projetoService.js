import api from './api';

export const projetoService = {
 getAllProjects: () => api.get('/projetos/'),
 getProject: (id) => api.get(`/projetos/${id}/`),
 createProject: (projectData) => api.post('/projetos/', projectData),
 updateProject: (id, projectData) => api.put(`/projetos/${id}/`, projectData),
 deleteProject: (id) => api.delete(`/projetos/${id}/`),

 // Rota para buscar as tarefas de um projeto específico
 getProjectTasks: (id) => api.get(`/projetos/${id}/tarefas/`),
};
