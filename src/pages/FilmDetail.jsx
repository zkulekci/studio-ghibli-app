import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Calendar, Clock, User, Award } from 'lucide-react';

export default function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Asynchronously fetch specific film details by ID using async/await
    const fetchFilmDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setFilm(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch film details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetail();
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <Loader2 className="spinner-border text-dark mb-3 animate-spin" size={48} />
        <p className="text-muted">Loading film details...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
        <hr />
        <Link to="/" className="btn btn-outline-dark mt-3">
          <ArrowLeft size={16} className="me-1" /> Back to Collection
        </Link>
      </div>
    );
  }

  if (!film) return null;

  return (
    <div className="container py-4">
      {/* Back button */}
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-dark d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} /> Back to Collection
        </Link>
      </div>

      <div className="row g-5 align-items-start">
        {/* Film Poster */}
        <div className="col-md-4">
          <div className="card shadow border-0 overflow-hidden">
            <img 
              src={film.image} 
              alt={film.title} 
              className="img-fluid w-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Film Information */}
        <div className="col-md-8">
          <h1 className="fw-bold mb-1">{film.title}</h1>
          <h4 className="text-muted fst-italic mb-3">{film.original_title} ({film.original_title_romanised})</h4>
          
          <p className="lead mb-4">{film.description}</p>

          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm d-flex align-items-center gap-3">
                <User className="text-dark" size={24} />
                <div>
                  <small className="text-muted d-block">Director</small>
                  <span className="fw-bold">{film.director}</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm d-flex align-items-center gap-3">
                <Award className="text-dark" size={24} />
                <div>
                  <small className="text-muted d-block">Producer</small>
                  <span className="fw-bold">{film.producer}</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm d-flex align-items-center gap-3">
                <Calendar className="text-dark" size={24} />
                <div>
                  <small className="text-muted d-block">Release Date</small>
                  <span className="fw-bold">{film.release_date}</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="p-3 bg-light rounded shadow-sm d-flex align-items-center gap-3">
                <Clock className="text-dark" size={24} />
                <div>
                  <small className="text-muted d-block">Running Time</small>
                  <span className="fw-bold">{film.running_time} minutes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-dark text-white rounded d-flex justify-content-between align-items-center">
            <span>Rotten Tomatoes Score</span>
            <span className="badge bg-light text-dark fs-5 fw-bold">{film.rt_score}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}