import React, { Component } from 'react';
import ToolbarComponent from '../components/toolbar';
import * as PaintActions from '../actions/paint';
import * as RecordActions from '../actions/record';
import Modal from './modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

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

    this.onRecordClick = this.onRecordClick.bind(this)
    this.onPauseToggle = this.onPauseToggle.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)
    this.onStrokeClick = this.onStrokeClick.bind(this)
    this.onColorClick = this.onColorClick.bind(this)
    this.onSaveCancel = this.onSaveCancel.bind(this)
    this.onSaveSubmit = this.onSaveSubmit.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onWipeClick = this.onWipeClick.bind(this)
  }

  onRecordClick() {
    console.log('on record click');
    
    if(!this.props.isRecordingActive) {
      this.props.actions.boundToggleRecording();
      this.props.actions.boundSetPause(true)
    } else {
      this.props.actions.boundToggleRecording();
      this.props.actions.boundSetPause(false)
    }

    /*if(!this.state.isRecording) {
      this.setState({
        isRecording: !this.state.isRecording, 
        isPaused: false
      })
    } else {
      this.setState({
        isRecording: !this.state.isRecording, 
        isPaused: true
      })
    }*/

    
    // Change record icon to recordING icon

    // Make toolbar smaller
  }

  onEditClick() {
    console.log('ooon edit click', this.props.actions)
    this.props.actions.boundToggleDrawing()
  }

  onPauseToggle() {

    this.props.actions.boundToggleRecording();
    this.props.actions.boundTogglePause();

    /*this.setState({
      isRecording: !this.state.isRecording, 
      isPaused: !this.state.isPaused
    })*/
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

  onSaveSubmit() {
    this.setState({
      isSaving: !this.state.isSaving
    })
  }

  onStrokeClick(value) {
    
    if(value) {
      this.props.actions.boundActiveWidth(value)
    }

    this.setState({
      isStrokeActive: !this.state.isStrokeActive, 
      isColorActive: false
    })
  }

  onColorClick(value) {

    if(value) {
      this.props.actions.boundActiveColor(value)
    }

    this.setState({
      isColorActive: !this.state.isColorActive, 
      isStrokeActive: false
    })
  }

  onMouseLeave() {
    /*if(this.props.isRecordingActive) {
      // Interval of 5 second
      setTimeout(() => {
        this.props.onCloseClick()
      }, 2000)  
    }
    console.log('mouse has left the div!');*/
  }

  onWipeClick() {
    this.props.actions.boundSetLines(Immutable.List())
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
          isRecording={this.props.isRecordingActive}
          onCloseClick={this.props.onCloseClick}
          isPaused={this.props.isPauseActive}
          onWipeClick={this.onWipeClick}
          onMouseLeave={this.onMouseLeave}
          isDrawingActive={this.props.isDrawingActive}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
	return { 
    activeDrawingColor: state.activeDrawingColor, 
    activeDrawingWidth: state.activeDrawingWidth, 
    isDrawingActive: state.isDrawingActive, 
    isRecordingActive: state.isRecordingActive, 
    isPauseActive: state.isPauseActive
	}
} 

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, PaintActions, RecordActions), dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar); 