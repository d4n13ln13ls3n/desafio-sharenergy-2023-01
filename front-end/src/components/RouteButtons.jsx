import React from 'react';

export default function RouteButtons(props) {
  const { renderDeleteForm, renderGetForm, renderPostAndPutForm} = props;
  return (
  <div className='route-buttons-container'>
    <h1>O que você quer fazer agora?</h1>
    <div className='all-buttons'>
      <button
        id="get-customer-button"
        // onClick={renderGetForm}
      >
      Visualizar um cliente específico
      </button>
      <button
        id="create-customer-button"
        // onClick={renderPostAndPutForm}
      >
      Criar um novo registro
      </button>
      <button
        id="update-customer-button"
        // onClick={renderPostAndPutForm}
      >
      Atualizar dados de um cliente específico
      </button>
      <button
        id="get-customer-button"
        // onClick={renderDeleteForm}
      >
      Deletar um cliente específico
      </button>
      </div>
  </div>
  )
}
