import React, { Component } from 'react';
import ReloadComponent from '../components/reload';


class Reload extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      iframeAllowed: false 
    }

    this.onEditorToggleClick = this.onEditorToggleClick.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ iframeAllowed: true })
    }, 1500)
  }

  onEditorToggleClick() {
    
  }

  render() {

    let url = window.location.hostname === 'localhost' ? 'http://' + window.location.hostname + ':3000' + '/test/index.html' : 'http://' + window.location.hostname + ':8001' + '/test/index.html';
    console.log('url: ', url);
    return(
      <ReloadComponent 
        url={url} 
        onEditorToggleClick={this.onEditorToggleClick} 
        activeHash={window.location.hash.replace(/#/g, '')}
        iframeAllowed={this.state.iframeAllowed}/>
    )
  }

}

export default Reload;