import React, { Component } from 'react';
import EditorComponent from '../components/editor';
import brace from 'brace';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import jsBeautify from 'js-beautify';
import { html as htmlBeautify, css as cssBeautify } from 'js-beautify';
import firebase from '../lib/firebase'
import Firepad from 'firepad'
import * as PaintActions from '../actions/paint'; 
import * as RecordActions from '../actions/record'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import exampleData from '../assets/example-data.json'
import axios from 'axios'
global.ace = brace;
global.ace.require = global.ace.acequire;

class Editor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showToolbar: false, 
      showTree: false, 
      currentFileOpen: 'index', 
      indexHtml: false, 
      styleScript: false,
      jsScript: false, 
      svgLogo: exampleData.svg,
      loadedInEditor: false 
    }

    this.onTreeToggleClick = this.onTreeToggleClick.bind(this)
    this.onToolbarToggleClick = this.onToolbarToggleClick.bind(this)
    this.loadInEditor = this.loadInEditor.bind(this)
  }

  componentWillMount() {
    let hostname = window.location.hostname === 'localhost' ? 'http://' + window.location.hostname + ':' + window.location.port : 'http://' + window.location.hostname + ':' + window.location.port;
    console.log('load from hostname: ', hostname)
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
  }

  componentDidMount() {
    
    this.editor = brace.edit('editor-mirror'); 
    this.editor.setOptions({
      mode: 'ace/mode/html',
      theme: 'ace/theme/monokai',
      fontSize: 13,
      tabSize: 2,
      enableBasicAutocompletion: false, 
      enableLiveAutocompletion: false
    }) 

    this.session = this.editor.getSession();
    this.session.setUseWrapMode(true);
    this.session.setUseWorker(false);

    let firepadRef = this.getFirebaseRef();

    let firepad = Firepad.fromACE(firepadRef, this.editor, {
      defaultText: this.state.indexHtml
    });

    this.editor.getSession().on('change', (e) => {
      let editorValue = this.editor.getValue();

      console.log('currentFileOpen: ', this.state.currentFileOpen, '     editorValue: ', editorValue)

      if(!this.state.loadedInEditor) {
        if(this.state.currentFileOpen === 'index.html') this.setState({ indexHtml: editorValue })
        if(this.state.currentFileOpen === 'main.css') this.setState({ styleScript: editorValue })
        if(this.state.currentFileOpen === 'script.js') this.setState({ jsScript: editorValue })
      } else {
        this.setState({ loadedInEditor: false })
      }
    })
  }

  onTreeToggleClick() {
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

  getFirebaseRef() {

    //if(this.props.identifier) {
    let ref = firebase.database().ref();
    //} else {
      //let ref = firebase.database().ref();
    //}

    let hash = this.props.identifier ? this.props.identifier : window.location.hash.replace(/#/g, '');
  
    if (hash) {
      console.log('hash already found!');
      ref = ref.child(hash);
      this.props.actions.boundSetIdentifier(ref.key)
    } else {
      console.log('lets not do this one')
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
      //if(!this.props.identifier) {
      this.props.actions.boundSetIdentifier(ref.key)
      //}
    }
    
    return ref;
  }

  loadInEditor(key) {

    if(key === 'index.html') {

      new Promise((resolve, reject) => {
        this.setState((prevState) => {
          resolve()
          return {
            currentFileOpen: 'index.html'
          }
        })
      }).then(() => {
        this.setState({ loadedInEditor: true })
        this.editor.session.replace({
          start: {row: 0, column: 0},
          end: {row: 1000, column: Number.MAX_VALUE}
        }, htmlBeautify(this.state.indexHtml))
        this.editor.session.setMode("ace/mode/html")
      })

      

    }

    if(key === 'main.css') {
      new Promise((resolve, reject) => {
        this.setState((prevState) => {
          resolve()
          return {
            currentFileOpen: 'main.css'
          }
        })
      }).then(() => {
        this.setState({ loadedInEditor: true })
        this.editor.session.replace({
          start: {row: 0, column: 0},
          end: {row: 1000, column: Number.MAX_VALUE}
        }, cssBeautify(this.state.styleScript))
        this.editor.session.setMode("ace/mode/css")
      })
      //this.setState({ styleScript: editorValue })
    }
  
    if(key === 'script.js') {
      new Promise((resolve, reject) => {
        this.setState((prevState) => {
          resolve()
          return {
            currentFileOpen: 'script.js'
          }
        })
      }).then(() => {
        this.editor.session.replace({
          start: {row: 0, column: 0},
          end: {row: 1000, column: Number.MAX_VALUE}
        }, jsBeautify(this.state.jsScript))
        this.editor.session.setMode("ace/mode/javascript")
      })
    }

  }

  componentWillUnmount() {
    
    let host = window.location.hostname === 'localhost' ? 'http://' + window.location.hostname + ':' + window.location.port : 'http://' + window.location.hostname + ':' + window.location.port;
    
    axios.post(`${host}/api/code/save`, {
      html: this.state.indexHtml
    })
  }

  render() {
    return (
      <div className="editor-box">
        <EditorComponent
          onTreeToggleClick={this.onTreeToggleClick}
          showTree={this.state.showTree}
          onToolbarToggleClick={this.onToolbarToggleClick}
          showToolbar={this.state.showToolbar}
          canvasActive={this.props.isDrawingActive}
          isRecording={this.props.isRecordingActive}
          loadInEditor={this.loadInEditor}
          activeHash={this.props.identifier}
          currentFileOpen={this.state.currentFileOpen}/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { 
    isDrawingActive: state.isDrawingActive, 
    isRecordingActive: state.isRecordingActive, 
    identifier: state.currentIdentifier
  }
} 

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators(Object.assign({}, PaintActions, RecordActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor); 