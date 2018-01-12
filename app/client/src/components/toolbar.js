import React from 'react';

const Toolbar = ({ onClick }) => (
  <div className="toolbar">
    <div className="toolbar-box">
      <div className="left record-icon"></div>
      <div className="left pause-icon"></div>
      <div className="left save-icon"></div>

      <div className="left toolbar-divider"></div>

      <div className="left edit-icon"></div>
      <div className="left stroke-icon"></div>
      <div className="left color-menu-box">
        <div className="left color-icon"></div> 
      </div>

      <div className="left toolbar-divider"></div>

      <div className="left settings-icon"></div> 
      <div className="left help-icon"></div> 

    </div>
  </div>
)

export default Toolbar;