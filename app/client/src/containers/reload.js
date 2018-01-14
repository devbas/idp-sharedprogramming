import React, { Component } from 'react';
import ReloadComponent from '../components/reload';

class Reload extends Component {

  constructor(props) {
    super(props); 

    this.createApplication = this.createApplication.bind(this)
  }

  createApplication() {
    console.log('html: ', this.props.indexHtml)
    return {
      __html: this.props.indexHtml
    }
  }

  render() {
    return(
      <ReloadComponent createApplication={this.createApplication}/>
    )
  }

}

export default Reload;