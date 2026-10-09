import { useState, useEffect } from 'react';
import { projetoService } from '../services/projetoService'; 

function ListaProjetos() {
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

  if (loading) return <p>Carregando projetos...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div>
      <h2>Meus Projetos</h2>
      {projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <ul>
          {projetos.map((projeto) => (
            <li key={projeto.id}>
              <b>{projeto.titulo}</b> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaProjetos;