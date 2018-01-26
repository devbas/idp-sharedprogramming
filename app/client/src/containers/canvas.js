import React, { Component } from 'react';
import CanvasComponent from '../components/canvas';
import {
	Link
} from 'react-router-dom'; 
import Toolbar from './toolbar';
import * as PaintActions from '../actions/paint'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import DrawingOptions from './drawOptions';
var Immutable = require("immutable");
var installDevTools = require("immutable-devtools");
installDevTools(Immutable);

function DrawingLine({ line, stroke, color }) {

  let location = line.get('location')
  
  if(location === window.location.href) {
    let drawingLine = line.get('line')

    const pathData = "M " +
      drawingLine
        .map(p => p.get('x') + ' ' + p.get('y'))
        .join(" L "); 
      
    const colorFormatted = '#' + line.get('color')
    return <path className="path" d={pathData} strokeWidth={line.get('width')} stroke={colorFormatted} />;
  } else {
    return null
  }
}

function Drawing({ lines, stroke, color }) {
  return (
    <svg className="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} stroke={stroke} color={color} />
      ))}
    </svg>
  );
}

class Canvas extends Component {
  
  constructor() {
    super();

    this.state = {
      lines: Immutable.List(),
      isDrawing: false, 
      color: false, 
      stroke: 30, 
      color: '#f2994a', 
      canvas: true, 
      isCanvasPage: window.location.pathname.includes('canvas') ? true : false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.onToolbarClick = this.onToolbarClick.bind(this);
    this.onStrokeUpdate = this.onStrokeUpdate.bind(this); 
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.body.addEventListener("touchstart", this.handleMouseDown, false);
    document.body.addEventListener("touchmove", this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("touchstart", this.handleMouseUp);
    this.setState({ isDrawing: false, canvas: false })
    // Remove Toolbar
    // Remove canvas
  }

  handleMouseDown(mouseEvent) {
    
    mouseEvent.preventDefault()

    const point = this.relativeCoordinatesForEvent(mouseEvent);
    this.setState(prevState => ({
      lines: prevState.lines.push(Immutable.List([point])),
      isDrawing: true
    }));

    let newLine = Immutable.Map({
      line: Immutable.List([point]), 
      width: this.props.activeDrawingWidth,
      color: this.props.activeDrawingColor, 
      location: window.location.href
    })

    this.props.actions.boundSetLines(this.props.lines.push(newLine), this.props.activeDrawingWidth);
  }

  handleMouseMove(mouseEvent) {
    mouseEvent.preventDefault()
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent)
    
    this.setState(prevState =>  ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));

    this.props.actions.boundSetLines(this.props.lines.updateIn([this.props.lines.size - 1, 'line'], line => line.push(point)));

  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  relativeCoordinatesForEvent(mouseEvent) {

    const boundingRect = this.refs.drawArea.getBoundingClientRect();

    if(!mouseEvent.clientX) {
      return Immutable.Map({
        x: mouseEvent.touches[0].clientX - boundingRect.left, 
        y: mouseEvent.touches[0].clientY - boundingRect.top
      })
    } else {
      return Immutable.Map({
        x: mouseEvent.clientX - boundingRect.left,
        y: mouseEvent.clientY - boundingRect.top
      });
    }
  }

  onToolbarClick() {

  }

  onStrokeUpdate(value) {
    this.setState({
      stroke: value
    })
  }

  render() {
    return (
      <span>
        {this.state.isCanvasPage &&
          <div className="canvas-box">
            <Link to={'/#' + window.location.hash.replace(/#/g, '')}>
              <div className="arrow arrow-left arrow-editor"></div>
            </Link>
            
            {this.state.canvas && 
              <div
                className="draw-area"
                ref="drawArea"
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
              >
                <Drawing lines={this.props.lines} stroke={this.props.activeDrawingWidth} color={this.props.activeDrawingColor}/>
              </div>
            }

            <DrawingOptions toolsActive={true}/>

          </div>
        }

        {!this.state.isCanvasPage &&
          <div className="canvas-box" style={{'backgroundColor': 'rgba(000, 000, 000, 0.4)'}}>

            {this.state.canvas && 
              <div
                className="draw-area"
                ref="drawArea"
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
              >
                <Drawing lines={this.props.lines} stroke={this.props.activeDrawingWidth} color={this.props.activeDrawingColor}/>
              </div>
            }
          </div>
        }
        
      </span>
    );
  }
}

function mapStateToProps(state) {
	return { 
    parsedLayers: state.parsedLayers, 
    activeDrawingColor: state.activeDrawingColor, 
    activeDrawingWidth: state.activeDrawingWidth, 
    lines: state.drawingLines
	}
} 

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(PaintActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas); 