import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { getData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorage';
// import '../styles/OrderDetails.css';
// import axios from 'axios';

export default function CustomerCard({ data, currentPage }) {
  const [userToken, setUserToken] = useState('');
  // const location = useLocation();
  
  
  useEffect(() => {
    const token = readStorage('token');
    setUserToken(token);
  }, []);

  return (
    <table className="table-customers">
      <thead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>Nome</th>
          <th scope='col'>Email</th>
          <th scope='col'>Telefone</th>
          <th scope='col'>Endereço</th>
          <th scope='col'>CPF</th>
        </tr>
      </thead>
      <tbody>
      {data.map((customer, index) => {
        const {
          id,
          name,
          email,
          phone,
          address,
          cpf
        } = customer;
        return (
          <tr key={index}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{cpf}</td>
          </tr>
      )})}
      </tbody>
    </table>
  );
}