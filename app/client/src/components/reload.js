import React from 'react';
import Iframe from 'react-iframe'
import {
	Link
} from 'react-router-dom'; 

const Reload = ({ url, onEditorToggleClick, activeHash}) => (
  <div className="reload-box">
    <div className="header">
      <Link to={'/#' + activeHash}>
        <div className="arrow arrow-top" onClick={onEditorToggleClick}></div>
      </Link>
    </div>
    <div className="iframe-box">
      <Iframe url={url} style={{width: '400px', height: '400px'}}></Iframe>
    </div>
  </div>
)

export default Reload;