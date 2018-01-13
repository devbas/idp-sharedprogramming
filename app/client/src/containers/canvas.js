import React, { Component } from 'react';
import CanvasComponent from '../components/canvas';
import {
	Link
} from 'react-router-dom'; 
import Toolbar from './toolbar';
const { List, Map } = require('immutable');

function DrawingLine({ line, stroke, color }) {
  const pathData = "M " +
    line
      .map(p => p.get('x') + ' ' + p.get('y'))
      .join(" L ");
    
    return <path className="path" d={pathData} stroke-width={stroke} stroke={color} />;
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
      lines: new List(),
      isDrawing: false, 
      color: false, 
      stroke: 30, 
      color: '#800000'
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    //this.relativeCoordinatesForEvent = this.relativeCoordinatesForEvent.bind(this);
    this.onToolbarClick = this.onToolbarClick.bind(this);
    this.onStrokeUpdate = this.onStrokeUpdate.bind(this); 
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button != 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.push(new List([point])),
      isDrawing: true
    }));
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);
    
    this.setState(prevState =>  ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
      // style: current style
    });
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
      <div className="canvas-box">
        <Toolbar onClick={this.onToolbarClick} onStrokeUpdate={this.onStrokeUpdate}/>
        <Link to="/">
          <div className="arrow arrow-left">CLICK</div>
        </Link>
        <div
          className="draw-area"
          ref="drawArea"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        >
          <Drawing lines={this.state.lines} stroke={this.state.stroke} color={this.state.color}/>
        </div>
      </div>
    );
  }

}

export default Canvas;