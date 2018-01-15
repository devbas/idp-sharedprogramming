import React, { Component } from 'react';
import ToolbarComponent from '../components/toolbar';

class Toolbar extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      strokeWidth: 1, 
      isStrokeActive: false, 
      isColorActive: false, 
      isRecording: false
    }

    this.onRecordClick = this.onRecordClick.bind(this)
    this.onPauseClick = this.onPauseClick.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)
    this.onStrokeClick = this.onStrokeClick.bind(this)
    this.onColorClick = this.onColorClick.bind(this)
  }

  onRecordClick() {
    console.log('on record click');
    this.setState({
      isRecording: !this.state.isRecording
    })
    // Change record icon to recordING icon

    // Make toolbar smaller
  }

  onPauseClick() {

  }

  onSaveClick() {

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
      <ToolbarComponent 
        onRecordClick={this.onRecordClick}
        onPauseClick={this.onPauseClick}
        onSaveClick={this.onSaveClick}
        onEditClick={this.props.onEditClick}
        onStrokeClick={this.onStrokeClick}
        onColorClick={this.onColorClick}
        isStrokeActive={this.state.isStrokeActive}
        isColorActive={this.state.isColorActive}
        isRecording={this.state.isRecording}
      />
    )
  }

}

export default Toolbar;