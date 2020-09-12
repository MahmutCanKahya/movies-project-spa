import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Movie from './components/MovieList';
import { store } from './store';
import error from './error';
import MovieDetail from './components/MovieDetail';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Movie} />
            <Route exact path="/movie/:imdbID" component={MovieDetail} />
            <Route component={error} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
