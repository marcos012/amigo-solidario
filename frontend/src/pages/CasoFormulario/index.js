import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'
import api from '../../services/api';
import './styles.css';

const CasoFormulario = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qtd_pessoas, setQtdPessoas] = useState('');
    const [local, setLocal] = useState('');

    const [loading, setLoading] = useState(false);

    const id = localStorage.getItem('id');

    const history = useHistory();
    const { addToast } = useToasts();

    async function cadastrarNovoCaso(e) {
        e.preventDefault();
        setLoading(true)
        const data = { titulo, descricao, qtd_pessoas, local };

        try {
            await api.post('casos', data, {
                headers: { Authorization: id }
            });
            addToast('Caso cadastrado com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            });
            setLoading(false)

            history.push('/')
        } catch {
            addToast('Erro no cadastro, tente novamente!', {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="header-action">
                <Link className="back-link" to="/">
                    <FiArrowLeft size={24} color="#1d7fca" />
                </Link>
                <h1 className="title">Cadastrar novo caso</h1>
            </div>
            <div className="content">
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
                        <input placeholder="Rua... - Cidade / UF" value={local} onChange={e => setLocal(e.target.value)}/>
                    </div>
                    <button type="submit" className="button" disabled={loading}>{loading ? 'Carregando...' : 'Cadastrar'}</button>
                </form>
            </div>
        </div>
    );
}
 
export default CasoFormulario;