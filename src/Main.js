import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import './App.css';
import Post from './Post';
import Blog from './Blog';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Blog} />
          <Route path="/blog" component={Blog} />
          <Route path="/post" component={Post} />
        </div>
      </Router>
    );
  }
}

export default App;
