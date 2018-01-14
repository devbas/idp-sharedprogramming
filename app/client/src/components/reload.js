import React from 'react';

const Reload = ({ createApplication }) => (
  <div>
    Hello Reload
    <div dangerouslySetInnerHTML={createApplication()}></div>
  </div>
)

export default Reload;