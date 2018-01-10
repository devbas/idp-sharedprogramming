import React, { Component } from 'react';
import EditorComponent from '../components/editor';
import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
//import { html as htmlBeautify } from 'js-beautify';
import openSocket from 'socket.io-client';
import CustomCursor from '../components/customCursor'
import _ from 'lodash'
import async from 'async'
import {
	Link
} from 'react-router-dom'; 
const socket = openSocket('http://10.2.12.30:8000');

class Editor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editorValue: null, 
      lastUpdate: null, 
      cursorId: false, 
      markers: [], 
      socketInserted: false
    }

    this.updateEditorCursor = this.updateEditorCursor.bind(this)

    this.subscribeToEditorValue((err, editorValue) => {
      this.setState({ 
        lastUpdate: editorValue
      });
      console.log('editorValue: ', editorValue, this.editor.getSession().getLength())

      //if(editorValue.end.row > this.editor.getSession().getLength()) {
      //  this.editor.getSession().getDocument().insertNewLine()
      //}

      let range = new Range({
        start: {
          row: editorValue.start.row, 
          column: editorValue.start.column
        }, 
        end:{
          row: editorValue.end.row, 
          column: editorValue.end.column
        }
      })

      if(editorValue.action === 'insert') {
        this.editor.getSession().getDocument().insert(editorValue.start, editorValue.lines[0])
        this.setState({ socketInserted: true })
      } else if(editorValue.action === 'remove') {
        console.log('editorValue: ', editorValue)
        
        console.log('range: ', range)
        this.editor.getSession().getDocument().remove({ start: editorValue.start, end: editorValue.end })
      }
      

      //let cursor = this.editor.getCursorPosition();

      //console.log('old cursor position: ', cursor)

      //console.log('lets set cursor position again: ', cursor)

      //this.editor.moveCursorTo(cursor.row, cursor.column)

    })

    // Register new cursor
    if(!this.state.cursorId) {
      socket.emit('registerCursor');
    }

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

    this.editor.session.replace({
      start: {row: 0, column: 0},
      end: {row: 1000, column: Number.MAX_VALUE}
    }, '')

    this.editor.getSession().on('change', (e) => {
      let editorValue = this.editor.getValue();

      console.log('e: ', e, ' editorValue: ', editorValue)

      let cursor = this.editor.selection.getCursor();

      socket.emit('updateCursor', { cursorId: this.state.cursorId, position: { row: cursor.row, column: cursor.column } }) 
      
      if(!this.state.socketInserted) {
        socket.emit('subscribeToEditor', e);
      } else {
        this.setState({ socketInserted: false })
      }
    })
  }


  updateEditorCursor(cursor) {
    
    if(cursor.cursorId !== this.state.cursorId) {

      let stateMarkers = this.state.markers; 

      stateMarkers = _.map(stateMarkers, (marker) => {
        if(marker.cursorId === cursor.cursorId) {
          return { cursorId: cursor.cursorId, row: cursor.position.row, column: cursor.position.column }
        } else {
          return marker
        }
      })

      if(_.filter(stateMarkers, { cursorId: cursor.cursorId }).length === 0) {
        stateMarkers.push(cursor)
      }
      
      this.setState({ markers: stateMarkers })

      let self = this;
      let marker = {};
      marker.cursors = this.state.markers;
      marker.update = function(html, markerLayer, session, config) {
        async.waterfall([
         (callback) => {
          for(let i = 0; html.length >= i; i++) {

            if(html[i] && html[i].includes(cursor.cursorId)) {
              delete html[i]
            }

            if(i >= html.length) {
              callback(false, html)
              break;
              
            }
          }
         }, 
         (html, callback) => {

          let start = config.firstRow
          let end = config.lastRow
          let cursors = this.cursors

          for (let i = 0; i < cursors.length; i++) {
            let cursor = cursors[i]
            if(cursor.row < start) {
              continue
            } else if(cursor.row > end) {
              break
              // Add new line
            } else {

              //if(cursor.row > self.editor.getSession().getLength()) {
              //  self.editor.getSession().getDocument().insertNewLine({ row: cursor.row, column: 0 })
              //}

              let screenPos = session.documentToScreenPosition(cursor)

              let height = config.lineHeight
              let cursorWidth = 2; 
              let width = config.characterWidth;
              let top = markerLayer.$getTop(screenPos.row, config);
              let left = markerLayer.$padding + screenPos.column * width;

              let customCursor = `<div class="custom-cursor" id="${cursor.cursorId}" style="height: ${height}px; top: ${top}px; left: ${left}px; width: ${cursorWidth}px;"></div>`;
            
              html.push(customCursor)
            }
          }
         }
        ])
        
      }

      marker.redraw = function() {
        this.session._signal("changeFrontMarker");
      }

      marker.addCursor = function() {
        marker.redraw()
      }

      marker.session = this.editor.session;
      marker.session.addDynamicMarker(marker, true)
    }

  }

  subscribeToEditorValue(callback) {
    socket.on('newValue', newValue => callback(false, newValue))
  }

  render() {
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