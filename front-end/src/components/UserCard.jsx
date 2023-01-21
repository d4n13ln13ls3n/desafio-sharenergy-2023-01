import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { getData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorage';
// import '../styles/OrderDetails.css';
// import axios from 'axios';

export default function UserCard({ data, currentPage }) {
  const [userToken, setUserToken] = useState('');
  // const location = useLocation();
  
  
  useEffect(() => {
    const token = readStorage('token');
    setUserToken(token);
  }, []);

  return (
    <table className="table-users">
      <thead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>Avatar</th>
          <th scope='col'>Full Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Username</th>
          <th scope='col'>Age</th>
        </tr>
      </thead>
      <tbody>
      {data.map((user) => {
        const {
          avatar,
          fullname,
          email,
          username,
          age
        } = user;
        return (
          <tr key={username}>
            <td>{user.id}</td>
            <td><img src={avatar} alt={username}/></td>
            <td>{fullname}</td>
            <td>{email}</td>
            <td>{username}</td>
            <td>{age}</td>
          </tr>
      )})}
      </tbody>
    </table>
  );
}