import React from 'react';
import { Link } from 'react-router-dom';
import { Home, HelpCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <span>🐱‍🚀</span> Anime Facts App
        </Link>
        <div className="navbar-nav ms-auto gap-3">
          <Link className="nav-link d-flex align-items-center gap-1 fs-5" to="/">
            <Home size={20} /> Home
          </Link>
          <Link className="nav-link d-flex align-items-center gap-1 fs-5" to="/quiz">
            <HelpCircle size={20} /> Anime Quiz
          </Link>
        </div>
      </div>
    </nav>
  );
}