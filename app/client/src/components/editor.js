import React from 'react';
import {
	Link
} from 'react-router-dom'; 
import Tree from '../containers/tree';
import Toolbar from '../containers/toolbar';
import Canvas from '../containers/canvas';

const Editor = ({ 
  updateRef, 
  showTree, 
  onTreeToggleClick, 
  showToolbar, 
  onToolbarToggleClick, 
  loadInEditor, 
  indexHtml,
  styleScript,
  jsScript, 
  onToolbarEditClick, 
  canvasActive, 
  isRecording, 
  activeHash, 
  currentFileOpen
 }) => (
  <div className="editor">

    {!showToolbar && !isRecording &&
      <div className="arrow arrow-top" onClick={onToolbarToggleClick}></div>
    }

    {!showToolbar && isRecording &&
      <div className="toolbar-tooltip" onClick={onToolbarToggleClick}>
        <div className="label">recording</div>
        <div className="recording"></div>
        <div className="arrow"></div>
      </div>
    }
    
    <Link to={'/canvas/#' + activeHash}>
      <div className="arrow arrow-right"></div>
    </Link>

    <Link to={'/reload/#' + activeHash}>
      <div className="arrow arrow-bottom"></div>
    </Link>
   
    {!showTree &&
      <div onClick={onTreeToggleClick}>
        <div className="arrow arrow-left"></div>
      </div>
    }

    {showTree &&
      <Tree onTreeClose={onTreeToggleClick}/>
    }

    {showToolbar &&
      <div>
        <Toolbar onToolbarEditClick={onToolbarEditClick} onCloseClick={onToolbarToggleClick}/>
      </div>
    }

    {canvasActive &&
      <div>
        <Canvas/>
      </div>
    }

    <div className="file-tree">
      <div className="title">Folders</div>
      <div className="hierarchy">
        <div className="level left">
          <div className="arrow-down-icon"></div>
          <div className="folder-open-icon"></div>
          <span className="file-label">TodoList</span>
          
          <div className="level left">
            <div className="left full-width item" onClick={() => loadInEditor('index.html')}>
              <div className="html-icon"></div>
              {currentFileOpen === 'index' &&
                <span className="file-label"><strong>index.html</strong></span>
              }

              {currentFileOpen !== 'index' &&
                <span className="file-label">index.html</span>
              }
            </div>
            <div className="left full-width item" onClick={() => loadInEditor('main.css')}>
              <div className="css-icon"></div>
              {currentFileOpen === 'style' &&
                <span className="file-label"><strong>main.css</strong></span>
              }

              {currentFileOpen !== 'style' &&
                <span className="file-label">main.css</span>
              }
            </div>
            <div className="left full-width item" onClick={() => loadInEditor('script.js')}>
              <div className="js-icon"></div>
              {currentFileOpen === 'script' &&
                <span className="file-label"><strong>script.js</strong></span>
              }

              {currentFileOpen !== 'script' &&
                <span className="file-label">script.js</span>
              }
            </div>            
          </div>
          
        </div>
      </div>
    </div>
    <div className="editor-mirror" id="editor-mirror">
      <div ref={updateRef} style={{width: '100%', height: '100%'}}></div>
    </div>
  </div>
)

// <Tree in={!!showTree} />

/*             <div className="left full-width item">
              <div className="arrow-left-icon"></div>
              <div className="folder-closed-icon"></div>
              <span className="file-label">images</span>
            </div>
            <div className="left full-width item">
              <div className="arrow-left-icon"></div>
              <div className="folder-closed-icon"></div>
              <span className="file-label">css</span>
            </div>
            <div className="left full-width item">
              <div className="arrow-left-icon"></div>
              <div className="folder-closed-icon"></div>
              <span className="file-label">js</span>
            </div>*/

/*             <div className="left full-width item" onClick={() => loadInEditor('contact.html')}>
              <div className="html-icon"></div>
              <span className="file-label">contact.html</span>
            </div>*/

/* <div className="left full-width item" onClick={() => loadInEditor('logo.svg')}>
              <div className="image-icon"></div>
              <span className="file-label">logo.svg</span>
            </div>*/

export default Editor;