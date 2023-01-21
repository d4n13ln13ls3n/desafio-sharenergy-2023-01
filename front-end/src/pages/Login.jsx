import React from 'react';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <article data-theme="dark" className='container'>
      <h2 className='login-title'>Seja bem-vindo à pagina da Share Energy Technical Challenge!</h2>
      <LoginForm />
      <p>Website desenvolvido por Daniel Yabu em janeiro de 2023</p>
    </article>
  );
}

export default Login;

