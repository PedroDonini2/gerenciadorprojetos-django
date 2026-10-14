import { useEffect, useState } from 'react';
import { projetoService } from '../services/projetoService';
import { tarefaService } from '../services/tarefaService';
const TaskForm = ({ tarefa, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        descricao: tarefa?.descricao || '',
        projeto_atribuido: tarefa?.projeto_atribuido || '',
        prioridade: tarefa?.prioridade || 'Média',
    });
    const [projetos, setProjetos] = useState([])
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        const carregarProjetos = async() => {
            try {
               const response = await projetoService.getAllProjects();
               setProjetos(response.data)
            } catch(err){
                console.error("Erro ao carregar projetos para o select:",err);
            }
        }
        carregarProjetos();
    },[]);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value 
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            if (tarefa) {
                await tarefaService.updateTask(tarefa.id, formData);
            } 
            else {
                await tarefaService.createTask({
                    ...formData,
                });
            }
            onSave();
        } catch (err) {
            if (err.response?.data) {
                setErrors(err.response.data);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">
                {tarefa ? 'Editar Tarefa' : 'Criar Tarefa'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Descrição da Tarefa */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao}</p>}
                    </div>
                    
                    {/* Seletor de Projeto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Projeto Atribuído</label>
                        <select
                            name="projeto_atribuido"
                            value={formData.projeto_atribuido}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Selecione um projeto...</option>
                            {projetos.map((projeto) => (
                                <option key={projeto.id} value={projeto.id}>
                                    {projeto.titulo}
                                </option>
                            ))}
                        </select>
                        {errors.projeto_atribuido && <p className="text-red-500 text-sm">{errors.projeto_atribuido}</p>}
                    </div>

                    {/* Seletor de Prioridade */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prioridade</label>
                        <select
                            name="prioridade"
                            value={formData.prioridade}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                        {errors.prioridade && <p className="text-red-500 text-sm">{errors.prioridade}</p>}
                    </div>

                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default TaskForm;
