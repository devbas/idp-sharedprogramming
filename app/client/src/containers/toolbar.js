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
      isSaving: false, 
      closeVisible: true
    }

    this.onRecordClick = this.onRecordClick.bind(this)
    this.onPauseToggle = this.onPauseToggle.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)
    this.onSaveSubmit = this.onSaveSubmit.bind(this)
    this.onSaveCancel = this.onSaveCancel.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  componentDidMount() {
    if(window.location.pathname.includes('canvas')) {
      this.setState({ closeVisible: false })
    }
  }

  onRecordClick() {
    
    if(!this.props.isRecordingActive) {
      this.props.actions.boundToggleRecording();
      this.props.actions.boundSetPause(true)
    } else {
      this.props.actions.boundToggleRecording();
      this.props.actions.boundSetPause(false)
    }
  }

  onPauseToggle() {

    this.props.actions.boundToggleRecording();
    this.props.actions.boundTogglePause();

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

  onMouseLeave() {
    /*if(this.props.isRecordingActive) {
      // Interval of 5 second
      setTimeout(() => {
        this.props.onCloseClick()
      }, 2000)  
    }
    console.log('mouse has left the div!');*/
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
          isRecording={this.props.isRecordingActive}
          onCloseClick={this.props.onCloseClick}
          isPaused={this.props.isPauseActive}
          onMouseLeave={this.onMouseLeave}
          isDrawingActive={this.props.isDrawingActive}
          closeVisible={this.state.closeVisible}
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