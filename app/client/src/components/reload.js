import React from 'react';
import Iframe from 'react-iframe'

const Reload = ({ url }) => (
  <div className="reload-box">
    
    <div className="iframe-box">
      <Iframe url={url} style={{width: '400px', height: '400px'}}></Iframe>
    </div>
  </div>
)

export default Reload;