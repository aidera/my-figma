import React from 'react';
import { CssBaseline } from '@material-ui/core';

import './App.css';
import Project from './pages/Project/Project';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Project/>
    </div>
  );
}

export default App;
