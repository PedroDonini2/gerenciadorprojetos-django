import { useState, useEffect } from 'react';
import { projetoService } from '../services/projetoService'; 

function ListaProjetos({onEditProject, onViewTasks, onCreateProject}) {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarProjetos = async () => {
      try {
        const response = await projetoService.getAllProjects();
        setProjetos(response.data); 
      } catch (err) {
        console.error('Erro ao buscar projetos:', err);
        setErro('Não foi possível carregar os projetos.');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    buscarProjetos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')){
      try {
        await projetoService.deleteProject(id);
        setProjetos(projetos.filter(projeto => projeto.id !== id));
      } catch(err){
        console.error('Não foi possível deletar o projeto:',err);
        alert('Não foi possível excluir o projeto');
      }
    }
  } ;

  if (loading) return <p>Carregando projetos...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div>
      <h2>Meus Projetos</h2>
      <div className="container mx-auto px-4 py-4">
           <button
              onClick={() => onCreateProject()}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
          Novo Projeto
          </button>
        </div>
      {projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <ul className='space-y-2'>
          {projetos.map((projeto) => (
            <li key={projeto.id} className='flex justify-between items-center bg-white p-3 shadow rounded'>
              <b>{projeto.titulo}</b>
              <div className='space-x-2'>
                <button onClick={() => onEditProject(projeto)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
                  Editar
                </button>
                <button onClick={() => handleDelete(projeto.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                  Excluir
                </button>
                <button 
                  onClick={() => onViewTasks(projeto)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >Tarefas</button>
              </div> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaProjetos;