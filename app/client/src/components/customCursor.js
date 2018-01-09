import React from 'react';

const CustomCursor = ({ cursorId, height, width, top, left }) => (
  <div className="customCursor" id={cursorId} style={{height: height, top: top, width: width, left: left }}/>
)

export default CustomCursor;