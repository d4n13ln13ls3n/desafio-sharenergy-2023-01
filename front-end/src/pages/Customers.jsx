import React, { useState, useEffect } from 'react';
import CustomerCard from '../components/CustomerCard';
import Pagination from '../components/Pagination';
// import '../styles/Customers.css';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm';
import RouteButtons from '../components/RouteButtons';
// import BackToAllButtonsButton from '../components/BackToAllButtonsButton';

export default function Customers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // new
  const [filteredData, setFilteredData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showGetOne, setShowGetOne] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showGetFiltered, setShowGetFiltered] = useState(false);
  const [showAllButtons, setShowAllButtons] = useState(false);
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [isPostAlertVisible, setIsPostAlertVisible] = useState(false);
  const [isPutAlertVisible, setIsPutAlertVisible] = useState(false);

  const recordsPerPage = 5;  // new
  const indexOfLastRecord = currentPage * recordsPerPage; // new
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // new
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord); // new
  const nPages = Math.ceil(data.length / recordsPerPage); // new
  const isDisabled = !searchTerm.length;
  const filteredDataArray = [filteredData];

  useEffect(() => {
    axios.get('http://localhost:3001/customers')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('There was an error while retrieving the data')
      })
  }, []);

  const renderGetForm = () => {
    setShowGetOne(true);
    setShowCreate(false);
    setShowUpdate(false);
    setShowDelete(false);
    setShowGetFiltered(false);
  }
  
  const renderPostForm = () => {
    setShowGetOne(false);
    setShowCreate(true);
    setShowUpdate(false);
    setShowDelete(false);
    setShowGetFiltered(false);
  }

  const renderPutForm = () => {
    setShowGetOne(false);
    setShowCreate(false);
    setShowUpdate(true);
    setShowDelete(false);
    setShowGetFiltered(false);
  }

  const renderDeleteForm = () => {
    setShowGetOne(false);
    setShowCreate(false);
    setShowUpdate(false);
    setShowDelete(true);
    setShowGetFiltered(false);
  }

  const fetchCustomers = () => {
    axios.get(`http://localhost:3001/customers`)
      .then(res => {
        setData(res.data);
      })
      .catch((res) => {
        console.log('res:', res);
        alert('There was an error while retrieving the data')
      })
  }

  const handleGet = () => {
    axios.get(`http://localhost:3001/customers/${searchTerm}`)
      .then(res => {
        console.log('res.data:', res.data);
        setFilteredData(res.data);
        // console.log('filtered data:', filteredData)
        setShowGetFiltered(true);
        // console.log('get filtered:', showGetFiltered);
      })
      .catch((res) => {
        console.log('res:', res);
        alert('There was an error while retrieving the data')
      })
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/customers/${searchTerm}`)
      .then(res => {
        fetchCustomers();
        // setData(res.data);
        setIsDeleteAlertVisible(true);
        setTimeout(() => {
        setIsDeleteAlertVisible(false);
      }, 2000);
        // setFilteredData(res.data);
      })
      .catch(() => {
        alert('There was an error while retrieving the data')
      })
  }

  const backToAllButtons = () => {
    setShowAllButtons(true);
    setShowGetOne(false);
    setShowGetFiltered(false);
    setShowCreate(false);
    setShowUpdate(false);
    setShowDelete(false);
  }

  const handleCreateCustomerSuccess = () => {
    setShowCreate(true);
    fetchCustomers();
    setShowGetFiltered(false);
    setIsPostAlertVisible(true);
    setTimeout(() => {
      setIsPostAlertVisible(false);
      console.log('showgetfiltered:', showGetFiltered);
    }, 2000);
  }

  const handleUpdateCustomerSuccess = () => {
    setShowGetFiltered(false);
    setShowUpdate(true);
    fetchCustomers();
    // props.setData(res.data);
    setIsPutAlertVisible(true);
    setTimeout(() => {
      setIsPutAlertVisible(false);
    }, 2000);
  }

  // console.log(showGetFi)
  // console.log('filtered data in the body:', filteredData);
  // console.log('filtered data array in the body:', filteredDataArray);
  // console.log('show create or update after click:', showCreateOrUpdate);
  return (
    <div className='grid'>
      <section className='left-side-container'>
        { loading ? (
          <p>A lista de clientes está sendo carregada</p>
        ) : (
          <>
            <h2>Veja abaixo a lista de nossos clientes:</h2>
            <CustomerCard 
              // data={!filteredData.length ? currentRecords : filteredData}
              data={currentRecords}
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
        )}
      </section>

      <section className='right-side-container'>
      { (!showGetOne && !showCreate && !showUpdate && !showDelete && !showGetFiltered) ? (
        <div className='route-buttons-container'>
          <p className='buttons-title'><strong>O que você quer fazer agora?</strong></p>
          <nav className='all-buttons'>
            <button
              id="get-customer-button"
              onClick={renderGetForm}
            >
            Visualizar um cliente específico
            </button>
            <button
              id="create-customer-button"
              onClick={renderPostForm}
            >
            Criar um novo registro
            </button>
            <button
              id="update-customer-button"
              onClick={renderPutForm}
            >
            Atualizar dados de um cliente específico
            </button>
            <button
              id="get-customer-button"
              onClick={renderDeleteForm}
            >
            Deletar um cliente específico
            </button>
            </nav>
      </div>
            ) : null }

      { (showGetOne) ? (
        <section className='view-one-customer'>
          <label htmlFor='input-search-customer'>
            Consulte aqui o cliente desejado:
            <input
              id="input-search-customer"
              type="text"
              placeholder="Digite um id"
              value={ searchTerm }
              onChange={ ({ target }) => setSearchTerm(target.value) }
            />  
          </label>
          <button
            id="search-user-button"
            disabled={ isDisabled }
            onClick={handleGet}
          >
          BUSCAR
          </button>
        </section>
      ) : null }

      { (showGetFiltered) && (
        <>
          <CustomerCard 
          data={filteredDataArray}
        />
        <button
          id="back-all-buttons-button"
          onClick={backToAllButtons}
        >
          VOLTAR
        </button>
          {/* <button
            id="back-all-buttons-button"
            onClick={backToAllButtons}
          >
            Voltar
          </button> */}
          {/* <BackToAllButtonsButton 
            onClick={backToAllButtons}
          /> */}
        </>
      )}

      { (showCreate || showUpdate) && !showDelete && !showGetOne ? (
          <section className='update-or-create-customer'>
            <CustomerForm
              showCreate={showCreate}
              showUpdate={showUpdate}
              onUpdateCustomerSuccess={handleUpdateCustomerSuccess}
              onCreateCustomerSuccess={handleCreateCustomerSuccess}
              setData={() => setData}
              setShowGetFiltered={setShowGetFiltered}
              data={data}
            />
            <button
                id="back-all-buttons-button"
                onClick={backToAllButtons}
              >
                VOLTAR
              </button>
            {/* <button
                id="back-all-buttons-button"
                onClick={backToAllButtons}
            >
                Voltarwha
            </button> */}
            { isPostAlertVisible ? (
              <p>Usuário criado com sucesso!</p>
            ) : null }
            { isPutAlertVisible ? (
              <p>Usuário atualizado com sucesso!</p>
            ) : null }
              </section>
            ) : null }

      {/* { (showGetOne || showCreate || showUpdate || showGetFiltered) ? (
        <button
          id="back-all-buttons-button"
          onClick={backToAllButtons}
        >
          VOLTAR
        </button>
      ) : null } */}

        { (showDelete) ? (
          <section className='delete-one-customer'>
            <label htmlFor='input-search-customer'>
              Exclua aqui o cliente desejado:
              <input
                id="input-delete-customer"
                type="text"
                placeholder="Digite um id"
                value={ searchTerm }
                onChange={ ({ target }) => setSearchTerm(target.value) }
              />  
            </label>
            <button
              id="search-user-button"
              disabled={ isDisabled }
              onClick={handleDelete}
            >
              EXCLUIR
            </button>
            <button
              id="back-all-buttons-button"
              onClick={backToAllButtons}
            >
              VOLTAR
            </button>
            {/* { (showGetOne || showCreate || showUpdate || showGetFiltered || showDelete) ? (
              <button
                id="back-all-buttons-button"
                onClick={backToAllButtons}
              >
                VOLTAR
              </button>
            ) : null }

            <br /> */}
            { isDeleteAlertVisible ? (
            <p>Usuário removido com sucesso!</p>
            ) : null }
          </section>
        )  : null }
      </section>
    </div>
  )
}