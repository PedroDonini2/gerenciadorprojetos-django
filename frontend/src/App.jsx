import { useState } from 'react';
import ListaProjetos from './components/ListaProjetos';
import ProjectForm from './components/ProjectForm';

function App() {
  const [view, setView] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setView('form') ;
  }

  const handleEditProject = (project) => {
    setSelectedProject(project) ;
    setView('form') ;
  }

  const handleSave = () => {
    setView('list');
  };
  const handleCancel = () => {
    setView('list');
  };

  const renderContent = () => {
    switch(view){
      case 'project':
        return <ListaProjetos onEditProject={handleEditProject} />;
      case 'form':
        return <ProjectForm
          projeto={selectedProject}
          onSave={handleSave}
          onCancel={handleCancel}
        /> ;
      default:
        return <ListaProjetos/>;
    }

  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
           <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
          Novo Projeto
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
export default App;