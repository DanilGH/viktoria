import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Users from './components/users/Users';
import User from './components/user/User';
import NotFound from './components/not-found/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Users/>
            </Route>
            <Route path="/users/create">
              <User newUser={true}/>
            </Route>
            <Route path="/users/:id" component={User} />
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
