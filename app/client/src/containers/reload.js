import React, { Component } from 'react';
import ReloadComponent from '../components/reload';


class Reload extends Component {

  constructor(props) {
    super(props); 
  }

  render() {

    let url = window.location.hostname === 'localhost' ? 'http://' + window.location.hostname + ':3000' + '/test/index.html' : 'http://' + window.location.hostname + ':8001' + '/test/index.html';
    console.log('url: ', url);
    return(
      <ReloadComponent url={url} />
    )
  }

}

export default Reload;