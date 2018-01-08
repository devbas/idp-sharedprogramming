import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'; 

import Editor from './containers/editor';
import Toolbar from './containers/toolbar';
import Canvas from './containers/canvas';
import Tree from './containers/tree';
import Reload from './containers/reload';     
console.log('balbal')
class App extends Component {
  render() {
    console.log('render')
    return (
      <Router>
        <div>
          <Route exact path="/" component={Editor}/>
          <Route exact path="/canvas" component={Canvas}/>
          <Route exact path="/tree" component={Tree}/>
          <Route exact path="/reload" component={Reload}/>
        </div>
      </Router>
    )
  }
}

export default App