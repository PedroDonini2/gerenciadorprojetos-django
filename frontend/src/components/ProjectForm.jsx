import { useState } from 'react';
import { projetoService } from '../services/projetoService';

const ProjectForm = ({ projeto, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        titulo: projeto?.titulo || '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
                await projetoService.createProject({
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
                {projeto ? 'Editar Projeto' : 'Criar Projeto'}
            </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Projeto</label>
        <input
    type="text"
    name="titulo"
    value={formData.titulo}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ringblue-500 focus:border-blue-500"
    />
    {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo}</p>}
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
export default ProjectForm;
