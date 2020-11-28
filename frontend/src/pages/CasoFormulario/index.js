import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

const CasoFormulario = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qtd_pessoas, setQtdPessoas] = useState('');
    const [local, setLocal] = useState('');

    const id = localStorage.getItem('id');

    const history = useHistory();

    async function cadastrarNovoCaso(e) {
        e.preventDefault();
        const data = { titulo, descricao, qtd_pessoas, local };

        try {
            await api.post('casos', data, {
                headers: { Authorization: id }
            });
            history.push('/')
        } catch {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return (
        <div className="container">
            <div className="content">
                <Link className="back-link" to="/">
                    <FiArrowLeft size={24} color="#1d7fca" />
                </Link>
                <h1 className="title">Cadastrar novo caso</h1>
                <form onSubmit={cadastrarNovoCaso}>
                    <div className="espacamento">
                        <span>Título</span>
                        <input value={titulo} onChange={e => setTitulo(e.target.value)}/>
                    </div>
                    <div className="espacamento">
                        <span>Descrição</span>
                        <textarea value={descricao} onChange={e => setDescricao(e.target.value)}/>
                    </div>
                    <div className="espacamento">
                        <span>Quantidade de pessoas afetadas</span>
                        <input value={qtd_pessoas} onChange={e => setQtdPessoas(e.target.value)}/>
                    </div>
                    <div className="espacamento">
                        <span>Local</span>
                        <input placeholder="Cidade / UF" value={local} onChange={e => setLocal(e.target.value)}/>
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
 
export default CasoFormulario;