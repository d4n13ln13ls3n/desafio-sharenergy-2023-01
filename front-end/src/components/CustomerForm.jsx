import React, { useState } from 'react';
import axios from 'axios';
import BackToAllButtonsButton from '../components/BackToAllButtonsButton';

export default function CustomerForm(props) {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCpf] = useState('');
  const [isPostAlertVisible, setIsPostAlertVisible] = useState(false);
  const [isPutAlertVisible, setIsPutAlertVisible] = useState(false);
  const { 
    showCreate,
    showUpdate,
    onCreateCustomerSuccess,
    onUpdateCustomerSuccess,
    data,
    setShowGetFiltered,
  } = props;
  
  function ValidateEmail(email) 
{
 if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

  const isDisabled = 
    nome.length < 4 || 
    phone.length < 10 || 
    address.length < 10 || 
    cpf.length !== 11 ||
    !ValidateEmail(email);

  const customer = { name: nome, phone, address, cpf, email };
  // console.log('customer:', customer);
  // const customerHasEmptyValues = Object.values(customer).some((value) => !value.length);

  const onSubmitPost = async () => {
    try {
      await axios.post('http://localhost:3001/customers', customer);
      console.log('onSubmitPostCalled');
      // setShowGetFiltered(false);
      // console.log('get filtered:')
      onCreateCustomerSuccess();
    } catch(e) {
      console.log(e);
    }
  }

  const onSubmitUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/customers/${id}`, customer);
      setShowGetFiltered();
      onUpdateCustomerSuccess();
    } catch(e) {
      console.log(e);
    }
  }

  console.log('data:', data);
  return (
    <>
      { showUpdate && (
        <div className='update-form-elements'>
          <label className="id-inserted-customer" htmlFor="id">
          Atualizar usuário:
          <br />
          <input
            id="id"
            data-testid="common_login__input-id"
            type="text"
            placeholder="Digite o id do usuário que quer atualizar"
            value={ id }
            onChange={ ({ target }) => setId(target.value) }
          />
        </label>
        
      </div>
      )}
      <form className="create-customer-container">
        <label className="label-insert-name" htmlFor="nome">
          Nome completo:
          <br />
          <input
            id="nome"
            data-testid="common_login__input-nome"
            type="text"
            placeholder="Digite o novo nome"
            value={ !nome.length ? data.nome : nome } // NÃO FUNCIONA PORQUE DATA É UM ARRAY DE OBJETOS, UTILIZAR O ID
            onChange={ ({ target }) => setNome(target.value) }
          />
        </label>
        <br />
        <label className="label-insert-email" htmlFor="email">
          Email:
          <br />
          <input
            id="email"
            data-testid="common_login__input-email"
            type="text"
            placeholder="Digite o novo email"
            value={ !email.length ? data.email : email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <br />
        <label className="label-insert-phone" htmlFor="phone">
          Telefone:
          <br />
          <input
            id="phone"
            data-testid="common_login__input-phone"
            type="text"
            placeholder="Digite o telefone sem hífens e parênteses"
            value={ !phone.length ? data.phone : phone }
            onChange={ ({ target }) => setPhone(target.value) }
          />
        </label>
        <br />
        <label className="label-insert-address" htmlFor="address">
          Endereço:
          <br />
          <input
            id="address"
            data-testid="common_login__input-address"
            type="text"
            placeholder="Digite o novo endereço"
            value={ !address.length ? data.address : address }
            onChange={ ({ target }) => setAddress(target.value) }
          />
        </label>
        <br />
        <label className="label-insert-cpf" htmlFor="cpf">
          CPF:
          <br />
          <input
            id="cpf"
            data-testid="common_login__input-cpf"
            type="text"
            placeholder="Digite o novo CPF sem hífens e pontos"
            value={ !cpf.length ? data.cpf : cpf }
            onChange={ ({ target }) => setCpf(target.value) }
          />
        </label>
        <br />
        { showCreate && (
          <button
          id="button-create"
          type="button"
          disabled={ isDisabled }
          onClick={ onSubmitPost }
        >
          CADASTRAR
        </button> 
        )}
        { showUpdate && (
          <button
            id="button-update"
            type="button"
            onClick={ onSubmitUpdate }
            >
            ATUALIZAR
          </button>
        )}
        {/* <BackToAllButtonsButton /> */}
      </form>
    </>
    
  )
  
}