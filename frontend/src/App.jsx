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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
      </header>
      <main className="container mx-auto px-4 py-8">
        <div>
        {renderContent()}
        </div>
      </main>
    </div>
  );
}
export default App;