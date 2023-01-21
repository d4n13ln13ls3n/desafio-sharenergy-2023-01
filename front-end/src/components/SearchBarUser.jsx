import React, { useState } from 'react';

export default function SearchBarUser({ data, filteredData, setFilteredData }) {
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredData, setFilteredData] = useState(data);

  const sTILC = searchTerm.toLowerCase();

  const handleClick = () => {
    setFilteredData(data.filter((user) => (user.fullname.toLowerCase()).includes(sTILC) || (user.email.toLowerCase()).includes(sTILC) || (user.username.toLowerCase()).includes(sTILC)));
  }

  const isDisabled = searchTerm.length < 3;

  return (
    <div className="container-search-bar-users">
      <label id="search-bar-users" htmlFor='title-search-bar-users'>
        Encontre um usuário por nome, email ou username  
      </label>
      <br />
      <input
          id="search-bar-users"
          name="search-bar-users"
          type="text"
          placeholder="Digite um nome, email ou username"
          value={ searchTerm }
          onChange={ ({ target }) => setSearchTerm(target.value) }
        />
        <button
          id="search-user-button"
          disabled={ isDisabled }
          onClick={handleClick}
        >
        BUSCAR USUÁRIO          
        </button>
        { filteredData && <button
          id="reset-list-button"
          disabled={ isDisabled }
          onClick={() => setFilteredData('')}
        >
        Resetar lista          
        </button>
        }
    </div>
  );
}