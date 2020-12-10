import React, { useRef, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'
import { unmaskPhone } from '../../components/PhoneInput';
import PhoneInput from '../../components/PhoneInput';
import api from '../../services/api';
import './styles.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const [createdId, setCreatedId] = useState('');
    const [copyText, setCopyText] = useState('Copiar');
    const inputRef = useRef(null);

    const history = useHistory();
    const { addToast } = useToasts();

    function handleWhatsapp(event) {
        const whatsappSemFormatacao = unmaskPhone(event.target.value);
        
        setWhatsapp(whatsappSemFormatacao);
    }

    async function handleRegister(e) {
        e.preventDefault();
        const data = { nome, email, whatsapp, cidade, uf };

        try {
            const response = await api.post('usuarios', data);
            setCreatedId(response.data.id)
        } catch {
            addToast('Erro no cadastro, tente novamente!', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    function actionForSucess() {
        addToast('Cadastro realizado!', {
            appearance: 'success',
            autoDismiss: true,
        });
        history.push('/login')
    }

    function copyToClipboard(e) {
        inputRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopyText('Copiado!');
        actionForSucess();
    };

    function renderCopyClipboard() {
        return (
            <div>
                <label>Copie seu ID para proceguir</label>
                <div className="copy-input-group">
                    <input ref={inputRef} value={createdId} className="copy-clipboard-input" />
                    <button onClick={copyToClipboard}>{copyText}</button> 
                </div>
            </div>
        );
    }

    return ( 
        <div className="container-cadastro">
            <div className="content">
                <Link className="back-link" to="/login">
                    <FiArrowLeft size={24} color="#1d7fca" />
                </Link>
                <h1 className="title">Cadastre-se :)</h1>

                {createdId && document.queryCommandSupported('copy') && renderCopyClipboard()}  
                    
                
                <form onSubmit={handleRegister}>
                    <input disabled={createdId} placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
                    <input type="email" disabled={createdId} placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <PhoneInput disabled={createdId} placeholder="Whatsapp" handleNumberChange={handleWhatsapp}/>

                    <div className="input-group">
                        <input disabled={createdId} placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)}/>
                        <input disabled={createdId} placeholder="Uf" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button type="submit" disabled={createdId} className="button">Cadastrar</button>
                </form>
            </div>
        </div>
     );
}
 
export default Cadastro;