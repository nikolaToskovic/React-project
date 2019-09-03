import React, {Component, Fragment} from 'react';
import './App.scss';

import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import ErrorPage from './pages/ErrorPage';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';




class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={MoviesPage} />
            <Route path='/watched/:id' exact component={MovieDetailsPage} />
            <Route path='/to-watch/:id' exact component={MovieDetailsPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
