# Movie Dashboard

A responsive movie dashboard built with React, TypeScript, Vite, and Tailwind CSS. Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

**Live demo:** https://movie-dashboard-rust-ten.vercel.app/

<img width="1296" height="929" alt="Screenshot 2026-11-01 at 12 27 52" src="https://github.com/user-attachments/assets/893fbc4b-b5c7-4dd5-9a85-1d8d15b4352a" />

## Features

- **Movie discovery:** Fetches movies from TMDB's `/discover/movie` endpoint with server side paging and sorting. Only movies with at least 100 votes are shown, so ratings are meaningful.
- **Genre filter:** Narrow the results to any TMDB genre. The genre list is loaded from TMDB, with a built in fallback if that request fails.
- **Responsive grid:** Displays movie posters in a layout that adapts to different screen sizes.
- **Movie details:** Shows each movie's poster, title, release year, audience rating, and vote count.
- **Search:** Filter the movies on the current page by title.
- **Sorting:** Sort by audience rating, title, newest release, or oldest release. Sorting is done by TMDB, so it applies across all pages.
- **Interactive cards:** Hover, focus, or tap a poster to reveal its synopsis.
- **Loading and error states:** Previous results stay visible while a new page loads, and failed requests show a Retry button.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- TMDB API

## Project Structure

```text
api/            Vercel Function that proxies TMDB requests and keeps the API key on the server
src/
  components/   UI components (Header, FilterBar, MovieGrid, MovieCard, Pagination)
  hooks/        useMovies (paged discover requests) and useGenres
  services/     TMDB API calls
  data/         Fallback genre list
  types/        Shared TypeScript types
```

## Design Notes

Sorting and genre filtering are sent to TMDB, so they apply across every page of results. Search runs in the browser, so it only covers the movies on the current page. The browser never talks to TMDB directly. Requests go to `/api/tmdb`, a small Vercel Function that adds the API key on the server and only forwards the two read-only endpoints the app needs, and Vite's dev server proxy plays the same role locally. In flight requests are cancelled with `AbortController` when the page, sort, or genre changes, so a slow response can never overwrite a newer one.

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
TMDB_API_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your own TMDB API key. The variable has no `VITE_` prefix on purpose, so it is never bundled into the browser code.

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
| `npm run lint`    | Runs ESLint on the project            |
| `npm run preview` | Previews the production build locally |

## Environment Variables

The application uses the following environment variable:

| Variable       | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `TMDB_API_KEY` | TMDB API key, used only on the server (Vercel Function or dev proxy) |

For local development, store your key in `.env.local`. When deploying to Vercel, add `TMDB_API_KEY` under the project's Environment Variables.

**Important:** Never commit `.env.local` or other files containing your personal API key. Use an appropriate TMDB key and follow TMDB's API usage requirements.

## Known Limitations

- Search only filters the movies on the current page.
- The `/api/tmdb` proxy is open to anyone who can load the site. It only forwards two read-only TMDB endpoints and caches successful responses, but it has no per user rate limiting.
- There are no automated tests yet.
