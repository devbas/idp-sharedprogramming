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
  canvasActive
 }) => (
  <div className="editor">

    {!showToolbar &&
      <div className="arrow arrow-top" onClick={onToolbarToggleClick}></div>
    }
    
    <Link to="/canvas">
      <div className="arrow arrow-right"></div>
    </Link>

    <Link to="/reload" indexHtml={indexHtml} styleScript={styleScript} jsScript={jsScript}>
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
        <Toolbar onEditClick={onToolbarEditClick}/>
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
              <span className="file-label">index.html</span>
            </div>
            <div className="left full-width item" onClick={() => loadInEditor('main.css')}>
              <div className="css-icon"></div>
              <span className="file-label">main.css</span>
            </div>
            <div className="left full-width item" onClick={() => loadInEditor('script.js')}>
              <div className="js-icon"></div>
              <span className="file-label">script.js</span>
            </div>
            <div className="left full-width item" onClick={() => loadInEditor('logo.svg')}>
              <div className="image-icon"></div>
              <span className="file-label">logo.svg</span>
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

export default Editor;