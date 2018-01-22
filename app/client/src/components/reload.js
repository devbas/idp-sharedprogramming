import React from 'react';
import Iframe from 'react-iframe'
import {
	Link
} from 'react-router-dom'; 

const Reload = ({ url, onEditorToggleClick, activeHash, iframeAllowed}) => (
  <div className="reload-box">
    <div className="header">
      <Link to={'/#' + activeHash}>
        <div className="arrow arrow-top" onClick={onEditorToggleClick}></div>
      </Link>
    </div>
    <div className="iframe-box">
      {iframeAllowed &&
        <Iframe url={url} style={{width: '400px', height: '400px'}}></Iframe>
      } 

      {!iframeAllowed &&
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      }
    </div>
  </div>
)

export default Reload;