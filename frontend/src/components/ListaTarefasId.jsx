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

  if (loading) return <p>Carregando tarefas...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Tarefas do Projeto: {projeto.titulo}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
        >
          Voltar para Projetos
        </button>
      </div>
      <div>
        <button onClick={() => onCreateTask()}>
          Nova Tarefa
        </button>
      </div>
      {tarefas.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa cadastrada para este projeto.</p>
      ) : (
        <ul className="space-y-3">
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">Descrição: {tarefa.descricao}</p>
                <span className="text-xs text-gray-500">Prioridade: {tarefa.prioridade}</span>
              </div>
              <div>
                <button onClick={() => onEditTask(tarefa)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
                  Editar
                </button>
                <button onClick={() => handleDelete(tarefa.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
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