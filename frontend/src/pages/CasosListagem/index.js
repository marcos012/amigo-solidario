import React, { useState, useEffect } from 'react';
import './styles.css'
import api from '../../services/api'

import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiLogIn } from 'react-icons/fi'

const CasosListagem = () => {
    const [casos, setCasos] = useState([]);
    const [loading, setLoading] = useState(false);

    const id = localStorage.getItem('id');
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const headers = { headers: { Authorization: id } };
    const history = useHistory();

    function getCasos() {
        setLoading(true)
        api.get('casos')
            .then(response => setCasos(response.data))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getCasos();
    }, [id]);

    async function handleDeleteIncident(id, event) {
        event.stopPropagation();

        const confirmação = window.confirm("Deseja deletar o caso?");

        if (!confirmação) {
            return;
        }

        try {
            await api.delete(`casos/${id}`, headers);
            setCasos(casos.filter(caso => caso.id !== id));
        } catch (error) {
            alert('Eror ao deletar caso');
        }
    }

    function handleNavigateToDetail(idCaso) {
        id ? history.push(`/casos/${idCaso}`) : history.push('/login')
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/login');
    }

    function handleLogin() {
        history.push('/login');
    }


    function handleFilterCasos(e) {
        setLoading(true);

        e.target.value === 'meus-casos' 
            ? api.get('perfil', headers)
                .then(response => setCasos(response.data))
                .finally(() => setLoading(false))
            : getCasos()
    }

    return ( 
        <div className="listagem-container">
            <header>
                <h1>Bem vindo(a){nomeUsuario ? `, ${nomeUsuario}` : ''}</h1>

                {id && (<span onClick={handleLogout}>Sair <FiPower size={18} color="#1d7fca" /></span>)}

                {!id && (<span onClick={handleLogin}>Entrar <FiLogIn size={18} color="#1d7fca" /></span>)}
            </header>

            <div className="title-container">
                <select onChange={handleFilterCasos}>
                    <option value='todos'>Todos</option>
                    <option value='meus-casos'>Meus casos</option>
                </select>
                {id && (<Link className="button" to="/casos/new">Cadastrar novo caso</Link>)}
            </div>
            <h2>Casos encontrados:</h2>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id} onClick={() => handleNavigateToDetail(caso.id)}>
                        <strong>Caso:</strong>
                        <p>{caso.titulo}</p>

                        <strong>Descrição:</strong>
                        <p>{caso.descricao}</p>
                        <strong>Local:</strong>
                        <p>{caso.local}</p>
                        {id && caso.id_user === id && (
                            <button onClick={e => handleDeleteIncident(caso.id, e)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {casos && casos.length === 0 && !loading && (
                <p className="label-sem-itens">Nenhum item encontrado</p>
            )}

            {loading && (
                <p className="label-sem-itens">Carregando...</p>
            )}
        </div>
    );
}
 
export default CasosListagem;