import React, { useState, useEffect } from 'react';
import './styles.css'
import api from '../../services/api'

import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiLogIn } from 'react-icons/fi'

const CasosListagem = () => {
    const [casos, setCasos] = useState([]);

    const id = localStorage.getItem('id');
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const headers = { headers: { Authorization: id } };
    const history = useHistory();

    function getCasos() {
        api.get('casos').then(response => setCasos(response.data));
    }

    useEffect(() => {
        getCasos();
    }, [id]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: id
                }
            });

            setCasos(casos.filter(incident => incident.id !== id));
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

    function handleFilterCasos() {
        api.get('perfil', headers).then(response => setCasos(response.data));
    }

    function handleFilterCasos(e) {
        e.target.value === 'meus-casos' 
            ? api.get('perfil', headers).then(response => setCasos(response.data))
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
                            <button onClick={() => handleDeleteIncident(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {casos && casos.length === 0 && (
                <p className="label-sem-itens">Nenhum item encontrado</p>
            )}
        </div>
    );
}
 
export default CasosListagem;