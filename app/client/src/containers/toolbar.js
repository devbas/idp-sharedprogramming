import React, { Component } from 'react';
import ToolbarComponent from '../components/toolbar';
import Modal from './modal';

class Toolbar extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      strokeWidth: 1, 
      isStrokeActive: false, 
      isColorActive: false, 
      isRecording: false, 
      isPaused: false, 
      isSaving: false
    }

    console.log('props: ', this.props)

    this.onRecordClick = this.onRecordClick.bind(this)
    this.onPauseToggle = this.onPauseToggle.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)
    this.onStrokeClick = this.onStrokeClick.bind(this)
    this.onColorClick = this.onColorClick.bind(this)
    this.onSaveCancel = this.onSaveCancel.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
  }

  onRecordClick() {
    console.log('on record click');
    
    if(!this.state.isRecording) {
      this.setState({
        isRecording: !this.state.isRecording, 
        isPaused: false
      })
    } else {
      this.setState({
        isRecording: !this.state.isRecording, 
        isPaused: true
      })
    }

    
    // Change record icon to recordING icon

    // Make toolbar smaller
  }

  onEditClick() {
    console.log('ooon edit click')
    this.props.onToolbarEditClick()
  }

  onPauseToggle() {
    this.setState({
      isRecording: !this.state.isRecording, 
      isPaused: !this.state.isPaused
    })
  }

  onSaveClick() {
    this.setState({
      isSaving: !this.state.isSaving
    })
  }

  onSaveCancel() {
    this.setState({
      isSaving: !this.state.isSaving
    })
  }

  onStrokeClick(value) {
    
    if(value) {
      this.props.onStrokeUpdate(value)
    }

    this.setState({
      isStrokeActive: !this.state.isStrokeActive
    })
    // Check current stroke 
  }

  onColorClick() {
    this.setState({
      isColorActive: !this.state.isColorActive
    })
  }

  render() {
    return(
      <div>

        {this.state.isSaving &&
          <Modal
            title='Save Session'
            type='save'
            onCancel={this.onSaveCancel}
            onSubmit={this.onSaveSubmit}/>
        }

        <ToolbarComponent 
          onRecordClick={this.onRecordClick}
          onPauseToggle={this.onPauseToggle}
          onSaveClick={this.onSaveClick}
          onEditClick={this.onEditClick}
          onStrokeClick={this.onStrokeClick}
          onColorClick={this.onColorClick}
          isStrokeActive={this.state.isStrokeActive}
          isColorActive={this.state.isColorActive}
          isRecording={this.state.isRecording}
          onCloseClick={this.props.onCloseClick}
          isPaused={this.state.isPaused}
        />
      </div>
    )
  }

}

export default Toolbar;