import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = { nome, email, whatsapp, cidade, uf };

        try {
            const response = await api.post('usuarios', data);
            alert(`Seu id de acesso: ${response.data.id}`);

            history.push('/login')
        } catch {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return ( 
        <div className="container">
            <div className="content">
                <Link className="back-link" to="/login">
                    <FiArrowLeft size={24} color="#1d7fca" />
                </Link>
                <h1 className="title">Cadastre-se :)</h1>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Cidade"  value={cidade} onChange={e => setCidade(e.target.value)}/>
                        <input placeholder="Uf" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
     );
}
 
export default Cadastro;