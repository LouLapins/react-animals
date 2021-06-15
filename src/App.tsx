import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AllAnimals } from './components/AllAnimals';
import { Animal } from './components/Animal';
import { PageNotFound } from './components/PageNotFound';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/">
        <AllAnimals></AllAnimals>
        </Route>

        <Route path="/animal/:id">
          <Animal></Animal>
        </Route>

        <Route path="*">
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
