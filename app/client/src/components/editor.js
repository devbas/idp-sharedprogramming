import React from 'react';
import {
	Link
} from 'react-router-dom'; 
import Tree from '../containers/tree';

const Editor = ({ updateRef, showTree, onTreeToggleClick }) => (
  <div>
    <div className="arrow arrow-top">CLICK</div>
    <Link to="/canvas">
      <div className="arrow arrow-right">CLICK</div>
    </Link>
    <Link to="/reload">
      <div className="arrow arrow-bottom">CLICK</div>
    </Link>
    <div onClick={onTreeToggleClick}>
      <div className="arrow arrow-left">CLICK</div>
    </div>
    <div>
      <Tree in={!!showTree} />
    </div>
    <div className="editor-mirror" id="editor-mirror">
      <div ref={updateRef} style={{width: '100%', height: '100%'}}></div>
    </div>
  </div>
)

export default Editor;