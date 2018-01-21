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
    }

    this.onTreeToggleClick = this.onTreeToggleClick.bind(this)
    this.onToolbarToggleClick = this.onToolbarToggleClick.bind(this)
    this.loadInEditor = this.loadInEditor.bind(this)
  }

  componentWillMount() {
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
    console.log('firepadRef: ', firepadRef)

    let firepad = Firepad.fromACE(firepadRef, this.editor, {
      defaultText: this.state.indexHtml
    });

    this.editor.getSession().on('change', (e) => {
      let editorValue = this.editor.getValue();

      if(this.state.currentFileOpen === 'index') this.setState({ indexHtml: editorValue })
      if(this.state.currentFileOpen === 'style') this.setState({ styleScript: editorValue })
      if(this.state.currentFileOpen === 'script') this.setState({ jsScript: editorValue })
    })
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

  getFirebaseRef() {
    let ref = firebase.database().ref();
    let hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    
    return ref;
  }

  loadInEditor(key) {
    if(key === 'index.html') {
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
  }

  componentWillUnmount() {
    
    let host = window.location.hostname === 'localhost' ? 'http://' + window.location.hostname + ':8001' : 'http://' + window.location.hostname + ':8001';
    
    axios.post(`${host}/api/code/save`, {
      html: this.state.indexHtml, 
      style: this.state.styleScript, 
      script: this.state.jsScript
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
          loadInEditor={this.loadInEditor}/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { 
    isDrawingActive: state.isDrawingActive, 
    isRecordingActive: state.isRecordingActive
  }
} 

function mapDispatchToProps(dispatch) {
  return {
	actions: bindActionCreators(PaintActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor); 