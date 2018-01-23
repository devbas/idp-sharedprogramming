import React, { Component } from 'react';
import OptionsComponent from '../components/drawOptions';
import * as PaintActions from '../actions/paint';
import * as RecordActions from '../actions/record';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

class DrawOptions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      mainButtonActive: false, 
      strokeIsActive: false, 
      colorIsActive: false 
    }

    this.mainOnClick = this.mainOnClick.bind(this)
    this.strokeOnClick = this.strokeOnClick.bind(this)
    this.colorOnClick = this.colorOnClick.bind(this)
    this.deleteOnClick = this.deleteOnClick.bind(this)
  }

  mainOnClick() {
    this.setState({ mainButtonActive: !this.state.mainButtonActive })
  }

  strokeOnClick(value) {

    if(value) {
      this.props.actions.boundActiveWidth(value)
    }

    this.setState({ 
      strokeIsActive: !this.state.strokeIsActive, 
      colorIsActive: false
    })
  }

  colorOnClick(value) {

    if(value) {
      this.props.actions.boundActiveColor(value)
    }

    this.setState({ 
      colorIsActive: !this.state.colorIsActive, 
      strokeIsActive: false 
    })
  }

  deleteOnClick() {
    this.props.actions.boundSetLines(Immutable.List())
  }

  render() {
    return (
      <OptionsComponent 
        mainOnClick={this.mainOnClick} 
        mainIsActive={this.state.mainButtonActive}
        strokeOnClick={this.strokeOnClick}
        strokeIsActive={this.state.strokeIsActive}
        colorOnClick={this.colorOnClick}
        colorIsActive={this.state.colorIsActive}
        deleteOnClick={this.deleteOnClick}
        activeDrawingColor={this.props.activeDrawingColor}
        activeDrawingWidth={this.props.activeDrawingWidth}/>
    )
  }
}

function mapStateToProps(state) {
	return { 
    activeDrawingColor: state.activeDrawingColor, 
    activeDrawingWidth: state.activeDrawingWidth
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, PaintActions, RecordActions), dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawOptions); 
