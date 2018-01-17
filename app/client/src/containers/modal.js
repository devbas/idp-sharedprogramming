import React, { Component } from 'react';
import ModalComponent from '../components/modal'; 

class Modal extends Component {
  render() {
    return(
      <ModalComponent props={this.props}/>
    )
  }
}

export default Modal;