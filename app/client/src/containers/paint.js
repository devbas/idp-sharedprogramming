import React, { Component } from 'react';
import Toolbar from './toolbar';
import Canvas from './canvas';

class Paint extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Toolbar hideCloseIcon={true}/>
        <Canvas/>
      </div>
    )
  }
}

export default Paint