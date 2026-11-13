import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, RotateCcw, Loader2 } from 'lucide-react';

export default function Quiz() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Fetch films from Ghibli API and generate dynamic questions
  useEffect(() => {
    const fetchFilmsForQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://ghibliapi.vercel.app/films');
        const data = await response.json();
        setFilms(data);
        generateQuestions(data);
      } catch (err) {
        console.error('Failed to fetch films for quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmsForQuiz();
  }, []);

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Generate dynamic questions based on fetched film data with unique options across 4 reliable categories
  const generateQuestions = (filmData) => {
    if (!filmData || filmData.length === 0) return;

    const generated = [];
    const selectedFilms = shuffleArray(filmData).slice(0, 5);

    selectedFilms.forEach((film, index) => {
      // Determine question type based on index (0 to 3)
      const questionType = index % 4;

      if (questionType === 0) {
        // Type 1: Director
        const wrongOptions = [...new Set(
          filmData.filter(f => f.director !== film.director).map(f => f.director)
        )];
        const options = shuffleArray([film.director, ...shuffleArray(wrongOptions).slice(0, 3)]);
        
        generated.push({
          id: index + 1,
          question: `Which director directed the Studio Ghibli film "${film.title}"?`,
          options: options,
          correctAnswer: options.indexOf(film.director)
        });
      } 
      else if (questionType === 1) {
        // Type 2: Release Date
        const wrongOptions = [...new Set(
          filmData.filter(f => f.release_date !== film.release_date).map(f => f.release_date)
        )];
        const options = shuffleArray([film.release_date, ...shuffleArray(wrongOptions).slice(0, 3)]);

        generated.push({
          id: index + 1,
          question: `In which year was the film "${film.title}" released?`,
          options: options,
          correctAnswer: options.indexOf(film.release_date)
        });
      }
      else if (questionType === 2) {
        // Type 3: Producer
        const wrongOptions = [...new Set(
          filmData.filter(f => f.producer !== film.producer).map(f => f.producer)
        )];
        const options = shuffleArray([film.producer, ...shuffleArray(wrongOptions).slice(0, 3)]);

        generated.push({
          id: index + 1,
          question: `Who produced the Studio Ghibli film "${film.title}"?`,
          options: options,
          correctAnswer: options.indexOf(film.producer)
        });
      }
      else {
        // Type 4: Running Time
        const wrongOptions = [...new Set(
          filmData.filter(f => f.running_time !== film.running_time).map(f => `${f.running_time} minutes`)
        )];
        const correctTime = `${film.running_time} minutes`;
        const options = shuffleArray([correctTime, ...shuffleArray(wrongOptions).slice(0, 3)]);

        generated.push({
          id: index + 1,
          question: `What is the running time of the film "${film.title}"?`,
          options: options,
          correctAnswer: options.indexOf(correctTime)
        });
      }
    });

    setQuestions(generated);
  };

  // Handle option selection
  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  // Handle next question transition
  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  // Restart quiz by reshuffling questions
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
    generateQuestions(films);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Loader2 className="spinner-border text-dark mb-3 animate-spin" size={48} />
        <p className="text-muted">Generating diverse quiz questions from Ghibli API...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container py-4 text-center">
        <p className="text-danger">Failed to generate quiz questions. Please try again later.</p>
        <Link to="/" className="btn btn-outline-dark mt-3">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Back button */}
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-dark d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0 p-4">
            <div className="d-flex align-items-center gap-2 mb-4">
              <HelpCircle size={28} className="text-dark" />
              <h2 className="fw-bold mb-0">Studio Ghibli Film Quiz</h2>
            </div>

            {showScore ? (
              <div className="text-center py-5">
                <h3 className="fw-bold mb-3">Quiz Completed! 🎉</h3>
                <p className="lead text-muted mb-4">
                  You scored <span className="fw-bold text-dark">{score}</span> out of <span className="fw-bold text-dark">{questions.length}</span>
                </p>
                <button 
                  onClick={handleRestartQuiz}
                  className="btn btn-dark d-inline-flex align-items-center gap-2"
                >
                  <RotateCcw size={16} /> Try Again
                </button>
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted fw-bold small">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="badge bg-secondary">
                    Score: {score}
                  </span>
                </div>

                <h4 className="fw-bold mb-4">
                  {questions[currentQuestion].question}
                </h4>

                <div className="d-grid gap-3 mb-4">
                  {questions[currentQuestion].options.map((option, index) => {
                    let btnClass = "btn btn-outline-dark text-start py-3 px-4";
                    if (selectedOption === index) {
                      btnClass = "btn btn-dark text-start py-3 px-4 shadow-sm";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        className={btnClass}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedOption === null}
                    className="btn btn-dark px-4"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}