import React, { useState } from 'react';
import NavBar from '../components/NavBar';
// import axios from 'axios';
// import '../styles/Users.css';

export default function Dogs() {
  const [showImage, setShowImage] = useState(false);
  const [dogUrl, setDogUrl] = useState('');

  const handleClick  = (() => {
    fetch('https://random.dog/woof')
      .then(res => res.text())
      .then((dogImageId) => {
        setShowImage(true);
        setDogUrl(dogImageId);
      })
      .catch(() => {
        alert('There was an error while rerieving the data')
      });
  });

  return (
    <div>
      <h1 id="dog-title">Dog Page - Clique no botão para ver um novo cachorro</h1>
        <button
          id="button"
          value="search"
          data-testid="search-buttoh"
          type="button"
          onClick={handleClick}
        >
          BUSCAR
        </button>
      <div className="image-container dog-image responsive-image">
        { showImage && (
          <img src={`https://random.dog/${dogUrl}`} className="dog-image"alt="Cachorro aleatório" />
        ) }
      </div>
    </div>
  );
}