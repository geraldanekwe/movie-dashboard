# Movie Dashboard

A responsive movie dashboard built with React, TypeScript, Vite, and Tailwind CSS. Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

## Features

- **Movie discovery:** Fetches movies from TMDB's `/discover/movie` endpoint, filtered by animation genre.
- **Responsive grid:** Displays movie posters in a layout that adapts to different screen sizes.
- **Movie details:** Shows each movie's poster, title, release year, audience rating, and vote count.
- **Search:** Filter the displayed movies by title.
- **Sorting:** Sort movies by audience rating, title, newest release, or oldest release.
- **Interactive cards:** Hover over a movie poster to reveal its synopsis.
- **Loading and error states:** Provides feedback while movie data is loading or if a request fails.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- TMDB API

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/geraldanekwe/movie-dashboard.git
cd movie-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your TMDB API key

Create a `.env.local` file in the project root and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your own TMDB API key.

See `.env.example` for the expected environment variable format.

### 4. Start the development server

```bash
npm start
```

Open the local URL printed in your terminal to view the dashboard.

## Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm start`       | Starts the Vite development server    |
| `npm run build`   | Builds the application for production |
| `npm run dev`     | Starts the Vite development server    |
| `npm run preview` | Previews the production build locally |

## Environment Variables

The application uses the following environment variable:

| Variable            | Description                              |
| ------------------- | ---------------------------------------- |
| `VITE_TMDB_API_KEY` | TMDB API key used to retrieve movie data |

For local development, store your key in `.env.local`.

**Important:** Never commit `.env.local` or other files containing your personal API key. Vite exposes variables prefixed with `VITE_` to browser-side code, so this key is not a server-side secret. Use an appropriate TMDB key and follow TMDB's API usage requirements.

## Acknowledgments

Movie data and poster images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.
