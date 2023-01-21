import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function LoginForm() {
  const navigate = useNavigate();
  
  const { signIn } = useAuthContext();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');
  
  const isDisabled = username.length < 4;

  useEffect(() => {
    const savedUserame = localStorage.getItem('share-username');
    if (savedUserame) {
      setUsername(savedUserame);
    }
  }, []);
  
  const handleAccess = async () => {
    try {
      await signIn({ username, password, rememberMe });
      if (rememberMe) {
        localStorage.setItem('share-username', username);
      }
    } catch ({ response }) {
      const { 
        data: { message } 
      } = response;
      setErrorMessage(message);
    }
  };

  const handleCreate = () => {
    navigate('/register');
  };

  function toggleRememberMe() {
    setRememberMe(!rememberMe);
  }

  return (
    <form className="login-container">
      <label className="label-login" htmlFor="username">
        Username:
        <br />
        <input
          id="username"
          name="username"
          data-testid="common_login__input-username"
          type="username"
          placeholder="Digite o seu username"
          value={ username }
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </label>
      <label className="label-login" htmlFor="password">
        <br />
        Senha:
        <br />
        <input
          id="password"
          data-testid="common_login__input-password"
          type="password"
          value={ password }
          placeholder="Digite a sua senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <br />
      <button
        id="button"
        value="Login"
        data-testid="common_login__button-login"
        type="button"
        disabled={ isDisabled }
        onClick={ handleAccess }
      >
        LOGIN
      </button>
      <br />
      <div className="label-checkbox">
        <label className="" htmlFor="checkbox">
          Remember me
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            onClick={toggleRememberMe}
            className=""
          />
        </label>
      </div>
      <button
        data-testid="common_login__button-register"
        type="button"
        onClick={ handleCreate }
      >
        Ainda não tenho conta
      </button>
      {
        errorMessage === '' ? ( '' ) : (
          <span
            data-testid="common_login__element-invalid-username"
          >
            { errorMessage }
          </span>
        )}
    </form>
  );
}

export default LoginForm;