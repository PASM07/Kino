import React from 'react';
import { createRoot } from 'react-dom/client';
import MovieApp from './MovieApp';

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(<MovieApp />);