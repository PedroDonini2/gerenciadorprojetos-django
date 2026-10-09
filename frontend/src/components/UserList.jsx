import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response.data);
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            setErro('Não foi possível carregar os usuários.');
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await userService.deleteUser(id);
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                setError('Erro ao excluir usuário');
                console.error(err);
            }
        }
    };
    if (loading) return <div className="text-center py-8">Carregando...</div>;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
    return (
        <div>
            <h2>Usuários</h2>
            {users.length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
            ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                <b>{user.username}</b> 
                                {}
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    );
};

export default UserList;