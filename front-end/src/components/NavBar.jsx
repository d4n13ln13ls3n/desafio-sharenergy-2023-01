import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className='nav-bar'>
      <ul>
        <li className='left-side'><strong>Share Energy Challenge</strong></li>
      </ul>
      <ul>
        <li className='right-side'>
          <Link to="/users">Users</Link>
        </li>
        <li className='right-side'>
          <Link to="/cats">Cats</Link>
        </li>
        <li className='right-side'>
          <Link to="/dogs">Dogs</Link>
        </li>
        <li className='right-side'>
          <Link to="/customers">Customers</Link>
        </li>
      </ul>
    </nav>
  );
}
