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
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
                {tarefa ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Descrição */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descrição da Tarefa</label>
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Ex: Configurar autenticação JWT"
                        value={formData.descricao}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    />
                    {errors.descricao && <p className="text-rose-600 text-xs mt-1.5">{errors.descricao}</p>}
                </div>
                
                {/* Seletor de Projeto */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Projeto Atribuído</label>
                    <select
                        name="projeto_atribuido"
                        value={formData.projeto_atribuido}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    >
                        <option value="">Selecione um projeto...</option>
                        {projetos.map((projeto) => (
                            <option key={projeto.id} value={projeto.id}>
                                {projeto.titulo}
                            </option>
                        ))}
                    </select>
                    {errors.projeto_atribuido && <p className="text-rose-600 text-xs mt-1.5">{errors.projeto_atribuido}</p>}
                </div>

                {/* Seletor de Prioridade */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Prioridade</label>
                    <select
                        name="prioridade"
                        value={formData.prioridade}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    >
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                    {errors.prioridade && <p className="text-rose-600 text-xs mt-1.5">{errors.prioridade}</p>}
                </div>

                {/* Botões */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 shadow-sm transition-colors text-sm"
                    >
                        {loading ? 'Salvando...' : 'Salvar Tarefa'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default TaskForm;
