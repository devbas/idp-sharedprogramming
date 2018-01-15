import React from 'react';
import Iframe from 'react-iframe'

const Reload = ({ url }) => (
  <div>
    Hello Reload
    <Iframe url={url} style={{width: '400px', height: '400px'}}></Iframe>
  </div>
)

export default Reload;