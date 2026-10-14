import { useState } from 'react';
import { projetoService } from '../services/projetoService';

const ProjectForm = ({ projeto, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        titulo: projeto?.titulo || '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
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
            if (projeto) {
                await projetoService.updateProject(projeto.id, formData);
            } 
            else {
                await projetoService.createProject(formData);
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
                {projeto ? 'Editar Projeto' : 'Criar Novo Projeto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Título do Projeto</label>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Ex: Redesign do App Mobile"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    />
                    {errors.titulo && <p className="text-rose-600 text-xs mt-1.5">{errors.titulo}</p>}
                </div>
                
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
                        {loading ? 'Salvando...' : 'Salvar Projeto'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default ProjectForm;
