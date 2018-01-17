import React, { Component } from 'react';
import ReloadComponent from '../components/reload';


class Reload extends Component {

  constructor(props) {
    super(props); 

    this.onEditorToggleClick = this.onEditorToggleClick.bind(this)
  }

  onEditorToggleClick() {
    
  }

  render() {

    let url = window.location.hostname === 'localhost' ? 'http://' + window.location.hostname + ':3000' + '/test/index.html' : 'http://' + window.location.hostname + ':8001' + '/test/index.html';
    console.log('url: ', url);
    return(
      <ReloadComponent url={url} onEditorToggleClick={this.onEditorToggleClick} />
    )
  }

}

export default Reload;