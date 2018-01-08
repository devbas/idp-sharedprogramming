import React, { Component } from 'react';
import TreeComponent from '../components/tree';

class Tree extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    return(
      <TreeComponent/>
    )
  }

}

export default Tree;