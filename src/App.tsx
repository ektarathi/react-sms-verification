import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PhoneAuth from './components/PhoneAuth';
import UserDetails from './components/UserDetails';

import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Router>
              <PhoneAuth path="/"/>
              <UserDetails path="user-details"/>
          </Router>
        </main>
      </Container>
    </div>
  );
}

export default App;
