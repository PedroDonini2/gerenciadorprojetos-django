import { useState, useEffect } from 'react';
import { tarefaService } from '../services/tarefaService'; 
import { projetoService } from '../services/projetoService';

function ListaTarefasId({projeto, onBack, onCreateTask, onEditTask}) {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarTarefas = async () => {
      try {
        const response = await projetoService.getProjectTasks(projeto.id);
        setTarefas(response.data); 
      } catch (err) {
        console.error('Erro ao buscar tarefas do projeto:', err);
        setErro('Não foi possível carregar as tarefas do projeto.');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    if (projeto?.id){
      buscarTarefas();
    }
  }, [projeto]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')){
      try {
        await tarefaService.deleteTask(id);
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
      } catch(err){
        console.error('Não foi possível deletar a tarefa:',err);
        alert('Não foi possível excluir a tarefa');
      }
    }
  } ;

  const getPriorityBadge = (prioridade) => {
    const styles = {
      Alta: 'bg-rose-50 text-rose-700 border-rose-200',
      Média: 'bg-amber-50 text-amber-700 border-amber-200',
      Baixa: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    return styles[prioridade] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  if (loading) return <p>Carregando tarefas...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div className="space-y-6">
      {/* Topo do Projeto */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Projeto Atual</span>
          <h2 className="text-2xl font-bold text-slate-900">{projeto.titulo}</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onCreateTask()}
            className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors text-sm"
          >
            + Nova Tarefa
          </button>
          <button
            onClick={onBack}
            className="flex-1 sm:flex-none bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Voltar
          </button>
        </div>
      </div>

      {/* Lista de Tarefas */}
      {tarefas.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <p className="text-slate-500">Nenhuma tarefa cadastrada para este projeto.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tarefas.map((tarefa) => (
            <li 
              key={tarefa.id} 
              className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="space-y-1">
                <p className="font-semibold text-slate-800 text-base">{tarefa.descricao}</p>
                <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${getPriorityBadge(tarefa.prioridade)}`}>
                  {tarefa.prioridade}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onEditTask(tarefa)} 
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-lg text-sm transition-colors"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(tarefa.id)} 
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

export default ListaTarefasId;