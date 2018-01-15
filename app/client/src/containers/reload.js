import React, { Component } from 'react';
import ReloadComponent from '../components/reload';


class Reload extends Component {

  constructor(props) {
    super(props); 
  }

  render() {

    let url = 'http://' + window.location.hostname + ':8001' + '/src/assets/static/index.html';
    console.log('url: ', url);
    return(
      <ReloadComponent url={url} />
    )
  }

}

export default Reload;