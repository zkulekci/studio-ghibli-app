import React from 'react';
import { Link } from 'react-router-dom';
import { Home, HelpCircle } from 'lucide-react';
import ghibliLogo from '../assets/ghibli-logo.svg';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white d-flex align-items-center gap-2">
          <img src={ghibliLogo} alt="Studio Ghibli Logo" width="38" height="38" className="rounded-circle" />
          <span className="fw-bold fs-5">Studio Ghibli App</span>
        </Link>
        <div className="navbar-nav ms-auto gap-3">
          <Link className="nav-link d-flex align-items-center gap-1 fs-5" to="/">
            <Home size={20} /> Home
          </Link>
          <Link className="nav-link d-flex align-items-center gap-1 fs-5" to="/quiz">
            <HelpCircle size={20} /> Quiz
          </Link>
        </div>
      </div>
    </nav>
  );
}