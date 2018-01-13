import React from 'react';
import {
	Link
} from 'react-router-dom'; 
import Tree from '../containers/tree';
import Canvas from '../containers/canvas';

const Editor = ({ updateRef, showTree, onTreeToggleClick, showToolbar, onToolbarToggleClick }) => (
  <div className="editor">

    {!showToolbar &&
      <div className="arrow arrow-top" onClick={onToolbarToggleClick}>CLICK</div>
    }
    
    <Link to="/canvas">
      <div className="arrow arrow-right">CLICK</div>
    </Link>
    <Link to="/reload">
      <div className="arrow arrow-bottom">CLICK</div>
    </Link>
   
    {!showTree &&
      <div onClick={onTreeToggleClick}>
        <div className="arrow arrow-left">CLICK</div>
      </div>
    }

    {showTree &&
      <Tree onTreeClose={onTreeToggleClick}/>
    }

    {showToolbar &&
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
            <div className="left full-width item">
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
            </div>
            <div className="left full-width item">
              <div className="html-icon"></div>
              <span className="file-label">index.html</span>
            </div>
            <div className="left full-width item">
              <div className="css-icon"></div>
              <span className="file-label">main.css</span>
            </div>
            <div className="left full-width item">
              <div className="js-icon"></div>
              <span className="file-label">script.js</span>
            </div>
            <div className="left full-width item">
              <div className="image-icon"></div>
              <span className="file-label">logo.svg</span>
            </div>
            <div className="left full-width item">
              <div className="html-icon"></div>
              <span className="file-label">contact.html</span>
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

export default Editor;