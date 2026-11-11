import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  // Temporary mock data
  const [mockAnimeList] = useState([
    { 
      anime_id: 1, 
      anime_name: 'naruto', 
      anime_img: 'https://via.placeholder.com/300x180?text=Naruto',
      total_facts: 10 
    },
    { 
      anime_id: 2, 
      anime_name: 'onepiece', 
      anime_img: 'https://via.placeholder.com/300x180?text=One+Piece',
      total_facts: 12 
    },
    { 
      anime_id: 3, 
      anime_name: 'bleach', 
      anime_img: 'https://via.placeholder.com/300x180?text=Bleach',
      total_facts: 8 
    },
  ]);

  return (
    <div>
      <div className="mb-5 text-center">
        <h1 className="fw-bold">Anime Collection</h1>
        <p className="text-muted">Explore fascinating facts and details about your favorite anime series</p>
      </div>

      <div className="row g-4">
        {mockAnimeList.map((anime) => (
          <div key={anime.anime_id} className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <img 
                src={anime.anime_img} 
                alt={anime.anime_name} 
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-capitalize fw-bold mb-2">
                    {anime.anime_name}
                  </h5>
                  <p className="card-text text-muted small mb-3">
                    Discover {anime.total_facts} unique facts and trivia about this series.
                  </p>
                </div>
                <Link
                  to={`/anime/${anime.anime_name}`}
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