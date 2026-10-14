import { useState } from 'react';
import ListaProjetos from './components/ListaProjetos';
import ProjectForm from './components/ProjectForm';
import ListaTarefasId from './components/ListaTarefasId';
import TaskForm from './components/TaskForm'

function App() {
  const [view, setView] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setView('form') ;
  }

  const handleEditProject = (project) => {
    setSelectedProject(project) ;
    setView('form') ;
  }
  
  const handleCreateTask = () => {
    setSelectedTask(null);
    setView('taskform');
  }

  const handleEditTask = (task) => {
    setSelectedTask(task) ;
    setView('taskform') ;
  }

  const handleViewTasks = (project) => {
    setSelectedProject(project);
    setView('tarefas');
  }

  const handleSave = () => {
    setView('list');
  };
  const handleCancel = () => {
    setView('list');
  };

  const renderContent = () => {
    switch(view){
      case 'form': 
        return <ProjectForm
          projeto={selectedProject}
          onSave={handleSave}
          onCancel={handleCancel}
        /> ;
      case 'tarefas':
        return <ListaTarefasId
          projeto = {selectedProject} 
          onBack ={() => setView('list')}
          onCreateTask={handleCreateTask}
          onEditTask={handleEditTask}
        /> ;
      case 'taskform':
        return <TaskForm
          tarefa = {selectedTask}
          onSave={handleSave}
          onCancel={handleCancel}
        />;
      case 'list':
      default:
        return <ListaProjetos
        onCreateProject={handleCreateProject} 
        onEditProject={handleEditProject}
        onViewTasks={handleViewTasks}
        />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header Moderno */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gerenciador de Projetos</h1>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-5xl w-full mx-auto px-6 py-8 flex-1">
        {renderContent()}
      </main>
    </div>
  );
}
export default App;