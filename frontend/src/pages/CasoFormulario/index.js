import React, { useState }from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

const CasoFormulario = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qtd_pessoas, setQtdPessoas] = useState('');

    const id = localStorage.getItem('id');

    const history = useHistory();

    async function cadastrarNovoCaso(e) {
        e.preventDefault();
        const data = { titulo, descricao, qtd_pessoas };

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
                    <input placeholder="Título do caso" value={titulo} onChange={e => setTitulo(e.target.value)}/>
                    <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)}/>
                    <input placeholder="Quantidade de pessoas afetadas" value={qtd_pessoas} onChange={e => setQtdPessoas(e.target.value)}/>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
 
export default CasoFormulario;