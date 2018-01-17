import React, { Component } from 'react';
import EditorComponent from '../components/editor';
import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
import jsBeautify from 'js-beautify';
import { html as htmlBeautify, css as cssBeautify } from 'js-beautify';
import openSocket from 'socket.io-client';
import CustomCursor from '../components/customCursor'
import _ from 'lodash'
import async from 'async'
import axios from 'axios';
import {
	Link
} from 'react-router-dom'; 
import exampleData from '../assets/example-data.json'

const socket = openSocket(window.location.hostname === 'localhost' ? 'http://localhost:8002': 'http:' + window.location.hostname + ':8002');


class Editor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editorValue: null, 
      lastUpdate: null, 
      cursorId: false, 
      markers: [], 
      socketInserted: false, 
      showTree: false, 
      showToolbar: false, 
      indexHtml: false, 
      styleScript: false,
      jsScript: false, 
      svgLogo: exampleData.svg,
      currentFileOpen: 'index', 
      canvasActive: false
    }

    this.updateEditorCursor = this.updateEditorCursor.bind(this)
    this.onTreeToggleClick = this.onTreeToggleClick.bind(this)
    this.onToolbarToggleClick = this.onToolbarToggleClick.bind(this)
    this.loadInEditor = this.loadInEditor.bind(this)
    this.onToolbarEditClick = this.onToolbarEditClick.bind(this)

    this.subscribeToEditorValue((err, editorValue) => {
      this.setState({ 
        lastUpdate: editorValue
      });

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
        let startLine = editorValue.start.row
        let endRow = editorValue.end.row
        let totalLines = this.editor.getSession().getLength()

        if(editorValue.lines.length > 1) {

          /*let delta = {
            action: 'insertLines', 
            range: {
              start: {
                row: editorValue.start.row, 
                column: editorValue.start.column
              }, 
              end: {
                row: editorValue.end.row, 
                column: editorValue.end.column
              }
            }, 
            lines: editorValue.lines*/

            console.log('startLine: ', startLine, '   editorValue line length: ', editorValue.lines.length, '   Total Length: ', startLine + editorValue.lines.length)

            this.editor.getSession().getDocument().insert(startLine, editorValue.lines)
            this.setState({ socketInserted: true })

          //}

          //console.log('lets apply deltas', delta);

          //this.editor.getSession().getDocument().applyDeltas([delta]);*/

          /*

            this.setState({ socketInserted: true })
            this.editor.getSession().getDocument().insert({ row: startLine, column: 0 }, line)        
          })*/
        } else {
          this.setState({ socketInserted: true })
          this.editor.getSession().getDocument().insert(editorValue.start, editorValue.lines[0])    
        }

      } else if(editorValue.action === 'remove') {
        console.log('editorValue: ', editorValue)
        
        console.log('range: ', range)
        this.editor.getSession().getDocument().remove({ start: editorValue.start, end: editorValue.end })
      }

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
      minLines: 50, 
      enableBasicAutocompletion: false, 
      enableLiveAutocompletion: false
    }) 

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

    let hostname = window.location.hostname === 'localhost' ? 'http://' + window.location.hostname + ':3000' : 'http://' + window.location.hostname + ':8001';

    axios.get(hostname + '/test/index.html')
    .then((result) => {
      this.setState({ indexHtml: result.data })
    })

    axios.get(hostname + '/test/style.css')
    .then((result) => {
      this.setState({ styleScript: result.data })
    })

    axios.get(hostname + '/test/script.js')
    .then((result) => {
      this.setState({ jsScript: result.data })
    })

    this.loadInEditor('index.html')
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

  onTreeToggleClick() {
    console.log('click!')
    this.setState(({ showTree }) => ({
      showTree: !showTree
    }))

    this.setState(({ showToolbar }) => ({
      showToolbar: false
    }))
  }

  onToolbarToggleClick() {
    this.setState(({ showToolbar }) => ({
      showToolbar: !showToolbar
    }))

    this.setState(({ showTree }) => ({
      showTree: false
    }))
  }

  loadInEditor(key) {
    if(key === 'index.html') {
      console.log('load it!');
      this.setState({
        currentFileOpen: 'index'
      })

      this.editor.session.replace({
        start: {row: 0, column: 0},
        end: {row: 1000, column: Number.MAX_VALUE}
      }, htmlBeautify(this.state.indexHtml))
      this.editor.session.setMode("ace/mode/html")
    }

    if(key === 'main.css') {
      this.setState({
        currentFileOpen: 'style'
      })

      this.editor.session.replace({
        start: {row: 0, column: 0},
        end: {row: 1000, column: Number.MAX_VALUE}
      }, cssBeautify(this.state.styleScript))
      this.editor.session.setMode("ace/mode/css")
      
    }

    if(key === 'script.js') {
      this.setState({
        currentFileOpen: 'script'
      })

      this.editor.session.replace({
        start: {row: 0, column: 0},
        end: {row: 1000, column: Number.MAX_VALUE}
      }, jsBeautify(this.state.jsScript))
      this.editor.session.setMode("ace/mode/javascript")
    }

    if(key === 'logo.svg') {
      this.setState({
        currentFileOpen: 'logo'
      })

      this.editor.session.replace({
        start: {row: 0, column: 0},
        end: {row: 1000, column: Number.MAX_VALUE}
      }, htmlBeautify(this.state.svgLogo))
      this.editor.session.setMode("ace/mode/html")
    }

    if(key === 'contact.html') {
      this.setState({
        currentFileOpen: 'contact'
      })
    }
  }

  onToolbarEditClick() {
    // Render canvas
    console.log('toolbar edit click')
    this.setState({
      canvasActive: !this.state.canvasActive
    })
  }

  render() {
    console.log('rerender');
    return(
      <div className="editor-box">
        <EditorComponent 
          updateRef={this.updateRef}
          onTreeToggleClick={this.onTreeToggleClick}
          showTree={this.state.showTree}
          onToolbarToggleClick={this.onToolbarToggleClick}
          showToolbar={this.state.showToolbar}
          loadInEditor={this.loadInEditor}
          indexHtml={this.state.indexHtml} 
          styleScript={this.state.styleScript}
          jsScript={this.state.jsScript}
          onToolbarEditClick={this.onToolbarEditClick}
          canvasActive={this.state.canvasActive} />
      </div>
    )
  }

}

export default Editor;