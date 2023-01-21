import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
// import '../styles/Users.css';
import axios from 'axios';
import SearchBarUser from '../components/SearchBarUser';

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // new
  const [filteredData, setFilteredData] = useState('');
  const recordsPerPage = 5;  // new
  const indexOfLastRecord = currentPage * recordsPerPage; // new
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // new
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord); // new
  const nPages = Math.ceil(data.length / recordsPerPage); // new

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(res => {
        setData(res.data.map((user, index) => ({
          id: index + 1,
          ...user,
        })));
        setLoading(false);
      })
      .catch(() => {
        alert('There was an error while retrieving the data')
      })
  }, []);

  return (
    <div>
      <br />
      <br />
      { loading ? (
        <p>A lista de usuários está sendo carregada</p>
      ) : (
        <>
        <SearchBarUser 
          data={data}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <UserCard 
          data={!filteredData.length ? currentRecords : filteredData}
          currentPage={currentPage}
          filteredData={filteredData}
        />
        <Pagination 
          nPages ={nPages}
          currentPage = {currentPage}
          setCurrentPage = {setCurrentPage}
          recordsPerPage={recordsPerPage}
          indexOfFirstRecord={indexOfFirstRecord}
          indexOfLastRecord={indexOfLastRecord}
          currentRecords={currentRecords}
        />
        </>
      )
      }
      <p>{`Exibindo resultados de ${indexOfFirstRecord + 1} a ${indexOfLastRecord} em um total de ${data.length} usuários.`}</p>
    </div>
  );
}