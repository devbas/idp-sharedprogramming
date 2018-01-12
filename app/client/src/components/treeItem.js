import React from 'react';

const TreeItem = ({ color, date, duration, description }) => (
  <div className="tree-item-box">
    <div className="left color-label" style={{backgroundColor: color}}>
    </div>
    <div className="left item-content-box">
      <div className="left item-meta-content">
        <span className="item-date">{date}</span>
        <br/><br/>
        <span className="duration-label">Duration</span><br/>
        <span className="duration-value">{duration}</span>
      </div>
      <div className="left item-description">
        {description}
      </div>
      <div className="left item-play">
      </div>
      <div className="left item-delete">
      </div>
    </div>
  </div>
)

export default TreeItem;