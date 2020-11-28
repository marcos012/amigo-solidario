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

    useEffect(() => {
        !!id 
            ? api.get('perfil', headers).then(response => setCasos(response.data))
            : api.get('casos').then(response => setCasos(response.data));

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

    return ( 
        <div className="listagem-container">
            <header>
                <h1>Bem vindo(a){nomeUsuario ? `, ${nomeUsuario}` : ''}</h1>

                {id && (<span onClick={handleLogout}>Sair <FiPower size={18} color="#1d7fca" /></span>)}

                {!id && (<span onClick={handleLogin}>Entrar <FiLogIn size={18} color="#1d7fca" /></span>)}

                
            </header>

            <div className="title-container">
                <h2>Casos encontrados:</h2>
                {id && (<Link className="button" to="/casos/new">Cadastrar novo caso</Link>)}
            </div>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id} onClick={() => handleNavigateToDetail(caso.id)}>
                        <strong>Caso:</strong>
                        <p>{caso.titulo}</p>

                        <strong>Descrição:</strong>
                        <p>{caso.descricao}</p>
                        <strong>Quantidade de pessoas afetadas:</strong>
                        <p>{caso.qtd_pessoas}</p>
                        {id && (
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