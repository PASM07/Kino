import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviesList from './MoviesList'; 
import MovieDetails from './MovieDetails'; 

function MovieApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MoviesList />} />
                <Route path="/movie/:genre/:year/:title" element={<MovieDetails />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default MovieApp;
