import React from 'react';
import MaskedInput from 'react-text-mask'

const phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export function maskPhone(value) {
    if (!value) {
        return;
    }

    let valorFormatado = value;

    valorFormatado = valorFormatado.replace(/\D/g, '');
    valorFormatado = valorFormatado.replace(/^(\d{2})(\d)/g, '($1) $2');
    valorFormatado = valorFormatado.replace(/(\d)(\d{4})$/, '$1-$2');
    return valorFormatado;
}

export function unmaskPhone(value) {
    let valorSemFormatacao = value;
  
    valorSemFormatacao = valorSemFormatacao.replace(/[^0-9]+/g, '');
    return valorSemFormatacao;
}

const PhoneInput = (props) => {
    return <MaskedInput
        mask={phoneMask}
        placeholder={props.placeholder}
        id="phone-input"
        onChange={props.handleNumberChange}
        className="input"
    />;
}

export default PhoneInput;