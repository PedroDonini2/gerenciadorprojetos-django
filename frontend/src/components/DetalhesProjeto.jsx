// WIP
import { useState, useEffect } from 'react';
import { projetoService } from '../services/projetoService'; 

function ListaProjetoDetalhe(projeto) {
  const [projetoId, setProjetoId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarProjetoId = async (id) => {
      try {
        const response = await projetoService.getProject(id);
        setProjetoId(response.data); 
      } catch (err) {
        console.error('Erro ao buscar projeto:', err);
        setErro('Não foi possível carregar o projeto.');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    buscarProjetoId();
  }, []);

  if (loading) return <p>Carregando projeto...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div>
      <h2>Meu Projeto</h2>
      {projetoId.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <ul className='space-y-2'>
          {projetoId.map((projeto) => (
            <li key={projeto.id} className='flex justify-between items-center bg-white p-3 shadow rounded'>
              <b>{projeto.titulo}</b>
              <div className='space-x-2'>
                <button onClick={() => handleSubmit(projeto)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
                  Editar
                </button>
                <button onClick={() => handleDelete(projeto.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
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