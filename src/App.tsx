import React, { useState } from 'react';
import './App.css';

/* Child Components */
import Button from './components/Button';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Click me</Button>
      </header>
    </div>
  );
}

export default App;