import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

const CasoDetalhe = (props) => {
    const [caso, setCaso] = useState();

    const id = props.id;

    useEffect(() => {
        api.get(`casos/${id}`).then(res => setCaso(res.data));
    }, [id])

    return ( 
        <div className="detalhe-container">
            <div>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={24} color="#1d7fca" />
                </Link>
                <h1 className="title">Caso {id}</h1>

            </div>
            <div className="detalhe-content">
                <div className="cards-container">
                    <div className="card">
                        <p className="caso-data title">{caso?.titulo}</p>
                        <div className="card-content">
                            <div>
                                <label>Descricao:</label>
                                <p className="caso-data">{caso?.descricao}</p>
                            </div>
                            <div>
                                <label>Pessoas afetadas:</label>
                                <p className="caso-data">{caso?.qtd_pessoas}</p>

                                <label>Local:</label>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="justify">
                                <label>Nome do solicitante: </label>
                                <span className="caso-data">{caso?.nome}</span>
                                <br />
                                <label>Local: </label>
                                <span className="caso-data">{caso?.cidade} / {caso?.uf}</span>
                            </div>
                            <div className="justify">
                                <label>E-mail: </label>
                                <span className="caso-data">{caso?.email}</span>
                                <br />
                                <label>Whatsapp: </label>
                                <span className="caso-data">{caso?.whatsapp}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contato-container">
                    <h2>Entre em contato e saiba como ajudar!</h2>
                    <a href={`mailto:${caso?.email}`} target="_blank" rel="noopener noreferrer" className="contact-button">
                        <button className="button">E-mail</button>
                    </a>
                    <a href={`https://wa.me/${caso?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact-button">
                        <button className="button">Whatsapp</button>
                    </a>
                </div>
            </div>
        </div>
     );
}
 
export default CasoDetalhe;