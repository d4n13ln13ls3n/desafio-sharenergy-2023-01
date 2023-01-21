import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const minUsernameLength = 4;
const minPasswordLength = 6;

function validate({ username, password }) {
  if (username.length < minUsernameLength) {
    return false;
  }

  if (password.length < minPasswordLength) {
    return false;
  }

  return true;
}

function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const values = { username, password };

  const isValid = validate(values);
  
  const handleRegister = async () => {
    try {
      await register(values);
      navigate('/');
    } catch ({ response }) {
      const {
        data: { message },
      } = response;
      setErrorMessage(message);
    }
  }

  return (
    <div className="register-container">
      <label className="label-login" htmlFor="username">
        Username:
        <input
          id="username"
          data-testid="common_register__input-username"
          type="text"
          placeholder="Digite o seu username"
          value={ username }
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </label>

      <label className="label-login" htmlFor="password">

        Senha:

        <input
          id="password"
          data-testid="common_register__input-password"
          type="password"
          value={ password }
          placeholder="Digite a sua senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>

      <button
        data-testid="common_register__button-register"
        type="button"
        disabled={ !isValid }
        onClick={ handleRegister }
      >
        CADASTRAR
      </button>
      {
        errorMessage === '' ? '' : (
          <span
            data-testid="common_register__element-invalid_register"
          >
            { errorMessage }
          </span>)
      }

    </div>
  );
}
export default RegisterForm;