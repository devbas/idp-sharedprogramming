import React, { Component } from 'react';
import ModalComponent from '../components/modal'; 

class Modal extends Component {
  render() {
    console.log('modal props: ', this.props)
    return(
      <ModalComponent props={this.props}/>
    )
  }
}

export default Modal;