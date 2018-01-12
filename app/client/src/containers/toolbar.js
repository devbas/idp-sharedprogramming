import React, { Component } from 'react';
import ToolbarComponent from '../components/toolbar';

class Toolbar extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    return(
      <ToolbarComponent onClick={this.props.onToolbarClick}/>
    )
  }

}

export default Toolbar;