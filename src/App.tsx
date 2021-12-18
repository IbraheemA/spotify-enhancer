import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

/* Screens */
import HomeScreen from './components/screens/HomeScreen';
import ListenLaterScreen from './components/screens/ListenLaterScreen';

/* Child Components */
import { OuterContainer } from './styles/Basic';

const App = () => {
  return (
    <OuterContainer>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/listen-later" element={<ListenLaterScreen />} />
          <Route path="/auth-callback" element={<HomeScreen />} />
        </Routes>
      </Router>
    </OuterContainer>
  );
}

export default App;