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
    <div className="space-y-6">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Meus Projetos</h2>
          <p className="text-sm text-slate-500">Gerencie seus projetos e acompanhe suas tarefas.</p>
        </div>
        <button
          onClick={() => onCreateProject()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm"
        >
          <span>+ Novo Projeto</span>
        </button>
      </div>

      {/* Lista ou Estado Vazio */}
      {projetos.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <p className="text-slate-500 mb-4">Nenhum projeto encontrado.</p>
          <button
            onClick={() => onCreateProject()}
            className="text-indigo-600 font-medium hover:underline text-sm"
          >
            Criar seu primeiro projeto
          </button>
        </div>
      ) : (
        <ul className="grid gap-3">
          {projetos.map((projeto) => (
            <li 
              key={projeto.id} 
              className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <span className="font-semibold text-slate-800 text-lg">{projeto.titulo}</span>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button 
                  onClick={() => onViewTasks(projeto)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-sm transition-colors"
                >
                  Tarefas
                </button>
                <button 
                  onClick={() => onEditProject(projeto)}
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-lg text-sm transition-colors"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(projeto.id)}
                  className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium rounded-lg text-sm transition-colors"
                >
                  Excluir
                </button>
              </div> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaProjetos;