import React, { Component } from 'react';
import EditorComponent from '../components/editor';
import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
//import { html as htmlBeautify } from 'js-beautify';
import openSocket from 'socket.io-client';
import CustomCursor from '../components/customCursor'
import _ from 'lodash'
import {
	Link
} from 'react-router-dom'; 
const socket = openSocket('http://192.168.1.35:8000');

class Editor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editorValue: null, 
      lastEmittedValue: null, 
      cursorId: false
    }

    this.subscribeToEditorValue((err, editorValue) => {
      console.log('new editorValue: ', editorValue, err)
      if(editorValue != this.state.editorValue && editorValue.length > 0) {
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

    // Register new cursor
    if(!this.state.cursorId) {
      socket.emit('registerCursor');
    }

    this.updateEditorCursor = this.updateEditorCursor.bind(this)

    socket.on('assignedCursorId', cursorId => this.setState({ cursorId: cursorId }))
    socket.on('cursorUpdate', cursor => this.updateEditorCursor(cursor))

    
  }
  
  componentDidMount() {
    this.editor = ace.edit('editor-mirror');
    this.editor.setOptions({
      mode: 'ace/mode/html',
      theme: 'ace/theme/monokai',
      fontSize: 13,
      tabSize: 2,
      showLineNumbers: true,
      maxLines: Infinity, 
      minLines: 50
    }) 
    
    console.log('componsned mounted', this.state)

    if(this.state.editorValue) {
      this.editor.session.replace({
        start: {row: 0, column: 0},
        end: {row: 1000, column: Number.MAX_VALUE}
      }, this.state.editorValue)
    }

    this.editor.getSession().selection.on('changeCursor', (e) => {
      let editorValue = this.editor.getValue();
      this.setState({ editorValue: editorValue}) 
      console.log('editorValue state: ', this.state.editorValue)

      let cursor = this.editor.selection.getCursor();

      socket.emit('updateCursor', { cursorId: this.state.cursorId, position: { row: cursor.row, column: cursor.column } }) 
      
      if(editorValue != this.state.lastEmittedValue) {
        socket.emit('subscribeToEditor', editorValue);
      }
    })
  }


  updateEditorCursor(cursor) {
    /*var marker = {}
    marker.cursors = [{row: cursor.row, column: cursor.column}]
    marker.update = function(html, markerLayer, session, config) {

      let start = config.firstRow, end = config.lastRow;
      let cursors = this.cursors
      for (let i = 0; i < cursors.length; i++) {
        let pos = this.cursors[i];
        if (pos.row < start) {
          continue
        } else if (pos.row > end) {
          break
        } else {
          // compute cursor position on screen
          // this code is based on ace/layer/marker.js
          let screenPos = session.documentToScreenPosition(pos)

          let height = config.lineHeight;
          let cursorWidth = 2;
          let width = config.characterWidth;
          let top = markerLayer.$getTop(screenPos.row, config);
          let left = markerLayer.$padding + screenPos.column * width;
          // can add any html here
          
          //var customCursor = 

          //"<div class='customCursor' id='", cursor.cursorId, "' style='",
          //  "height:", height, "px;",
          //  "top:", top, "px;",
          //  "left:", left, "px; width:", cursorWidth, "px'></div>"
          let customCursor = `<div className="custom-cursor" id="${cursor.cursorId}" style="height: ${height}px; top: ${top}px; left: ${left}px; width: ${cursorWidth}px;"></div>`
          
          html = _.remove(html, (item) => {
            if(item.includes(cursor.cursorId)) return item
            //return item
          })

          console.log('html', html)

          html.push(
            customCursor 
          );
        }
      }
    }

    marker.redraw = function() {
      this.session._signal("changeFrontMarker");
    }
    
    marker.addCursor = function() {
    // add to this cursors

    // trigger redraw
      marker.redraw()
    }
    marker.session = this.editor.session;
    marker.session.addDynamicMarker(marker, true)  */

  }

  subscribeToEditorValue(callback) {
    console.log('hiiii')
    socket.on('newValue', newValue => callback(false, newValue))
  }

  render() {
    console.log('we are done')
    return(
      <div>
        <div className="arrow arrow-top">CLICK</div>
        <Link to="/canvas">
          <div className="arrow arrow-right">CLICK</div>
        </Link>
        <Link to="/reload">
          <div className="arrow arrow-bottom">CLICK</div>
        </Link>
        <Link to="/tree">
          <div className="arrow arrow-left">CLICK</div>
        </Link>
        <div className="editor-mirror" id="editor-mirror">
          <div ref={this.updateRef} style={{width: '100%', height: '100%'}}></div>
        </div>
      </div>
    )
  }

}

export default Editor;