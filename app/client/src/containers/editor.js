import React, { Component } from 'react';
import EditorComponent from '../components/editor';
import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/chrome';
//import { html as htmlBeautify } from 'js-beautify';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class Editor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editorValue: null, 
      lastEmittedValue: null
    }

    this.subscribeToEditorValue((err, editorValue) => {
      console.log('new editorValue: ', editorValue)
      if(editorValue != this.state.editorValue) {
        this.setState({ 
          editorValue: editorValue, 
          lastEmittedValue: editorValue 
        });

        this.editor.session.replace({
          start: {row: 0, column: 0},
          end: {row: 1000, column: Number.MAX_VALUE}
        }, editorValue)
      }
    })
  }
  
  componentDidMount() {
    this.editor = ace.edit('editor-mirror');
    this.editor.setOptions({
      mode: 'ace/mode/html',
      theme: 'ace/theme/chrome',
      fontSize: 13,
      tabSize: 2,
      showLineNumbers: true,
      showGutter: true,
      maxLines: Infinity, 
      autoScrollEditorIntoView: false
    })

    this.editor.getSession().selection.on('changeCursor', (e) => {
      let editorValue = this.editor.getValue(); 
      if(editorValue != this.state.lastEmittedValue) {
        socket.emit('subscribeToEditor', editorValue);
      }
    })

    var marker = {}
    marker.cursors = [{row: 0, column: 10}]

    //marker.redraw = function() {
      //this.session._signal("changeFrontMarker");
    //}
    marker.addCursor = function() {
    // add to this cursors

    // trigger redraw
    //marker.redraw()
    }
    marker.session = this.editor.session;
    marker.session.addDynamicMarker(marker, true)

  }

  subscribeToEditorValue(callback) {
    console.log('hiiii')
    socket.on('newValue', newValue => callback(false, newValue))
    /*socket.on('newValue', function(newValue) {
      console.log('newValue: ', newValue)
    })*/
  }

  render() {
    console.log('we are done')
    return(
      <div className="editor-mirror" id="editor-mirror">
        <div ref={this.updateRef} style={{width: '100%', height: '100%'}}></div>
      </div>
    )
  }

}

export default Editor;