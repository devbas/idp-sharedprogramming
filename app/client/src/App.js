import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'; 
import { AnimatedRoute } from 'react-router-transition';

import Editor from './containers/editor';
import Toolbar from './containers/toolbar';
import Canvas from './containers/canvas';
import Tree from './containers/tree';
import Reload from './containers/reload';     

class App extends Component {
  render() {
    console.log('render')
    return (
      <Router>
        <div className="wrapper">
          <Route exact path="/" component={Editor}/>
          <AnimatedRoute 
            exact path="/canvas" 
            component={Canvas}
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(0%)`,
            })}/>
          <AnimatedRoute 
            exact path="/tree" 
            component={Tree}
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`,
            })}/>
          <Route exact path="/reload" component={Reload}/>
        </div>
      </Router>
    )
  }
}

export default App