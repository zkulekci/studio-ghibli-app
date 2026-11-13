# Studio Ghibli Web Application

A Single Page Application (SPA) built with React, Vite, and Bootstrap, showcasing the films of Studio Ghibli via the Studio Ghibli API.

## Live Demo
You can view the live application here: [https://zkulekci.github.io/studio-ghibli-app/](https://zkulekci.github.io/studio-ghibli-app/)

---

## Features
- **Film Catalog & Exploration**: Browse through Studio Ghibli films fetched dynamically from the API.
- **Detailed Film Views**: View detailed information for each film, including director, producer, release date, running time, description, and Rotten Tomatoes score.
- **Interactive Quiz Engine**: Test your Ghibli knowledge with a dynamic quiz featuring randomized questions and duplicate-answer prevention.
- **Responsive UI**: Styled with Bootstrap 5 and enhanced with custom branding and icons (`lucide-react`).
- **SPA Routing**: Configured with `react-router-dom` (`BrowserRouter` with `basename` and GitHub Pages 404 fallback) for seamless navigation across subpaths.

---

## Tech Stack
- **Framework**: React (with Vite)
- **Styling**: Bootstrap 5, Custom CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Data Source**: [Studio Ghibli REST API](https://ghibliapi.vercel.app/films)
- **Hosting & Deployment**: [GitHub Pages](https://zkulekci.github.io/studio-ghibli-app/)

---

## Project Structure

studio-ghibli-app/
├── public/
│   ├── 404.html          # SPA routing fallback for GitHub Pages
│   └── favicon.svg       # Custom Ghibli-themed favicon
├── src/
│   ├── assets/           # Custom Totoro SVG logo
│   ├── components/       # Reusable Navbar component
│   ├── pages/            # View pages (Home, FilmDetail, Quiz)
│   ├── App.jsx           # Main routing and layout setup
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── package.json
└── vite.config.js

## Getting Started & Local Development

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/zkulekci/studio-ghibli-app.git
cd studio-ghibli-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```

### 5. Deploy to GitHub Pages
```bash
npm run deploy
```