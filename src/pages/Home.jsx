import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Loader2, Film } from 'lucide-react';

export default function Home() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Asynchronously fetch Ghibli films using async/await as required
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://ghibliapi.vercel.app/films');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setFilms(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch Ghibli films from the API. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <Loader2 className="spinner-border text-dark mb-3 animate-spin" size={48} />
        <p className="text-muted">Loading Ghibli magical universe...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        <h4 className="alert-heading">Connection Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 text-center">
        <h1 className="fw-bold">Studio Ghibli Collection</h1>
        <p className="text-muted">Explore magical films, characters, and stories</p>
      </div>

      <div className="row g-4">
        {films.map((film) => (
          <div key={film.id} className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <img 
                src={film.image} 
                alt={film.title} 
                className="card-img-top"
                style={{ height: '280px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold mb-2">
                    {film.title}
                  </h5>
                  <p className="card-text text-muted small mb-3">
                    Director: {film.director} ({film.release_date})
                  </p>
                </div>
                <Link
                  to={`/film/${film.id}`}
                  className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-1"
                >
                  View Details <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}