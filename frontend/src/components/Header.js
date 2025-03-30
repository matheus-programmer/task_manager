// frontend/src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Task Manager</h1>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/create" className="nav-link create-btn">Nova Tarefa</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;