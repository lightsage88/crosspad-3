import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from '../src/components/header/header.js';
import Search from '../src/components/search/search.js';
import './app-router.css';

function AppRouter() {
    return (
        <Router>
            <Header />
            <Search />
            {/* <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <About />
            </Route>
            <Route>
              <Login />
            </Route>
        </Switch> */}
        </Router>
    );
}

export default AppRouter;
