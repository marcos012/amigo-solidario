import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

const Login = () => {
    const [id, setId] = useState('');
    
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault(); 

        try {
            const response = await api.post('login', { id });
            localStorage.setItem('id', id);
            localStorage.setItem('nomeUsuario', response.data.nome);

            history.push('/');
        } catch {
            alert('Falha no login.');
        }
    }

    return (
        <div className="container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input placeholder="Seu ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button type="submit" className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        É novo aqui? Cadastre-se :)
                    </Link>
                </form>

            </section>
        </div> 
    );
}
 
export default Login;