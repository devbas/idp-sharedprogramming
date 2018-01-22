import React from 'react';
import Transition from 'react-transition-group/Transition';
import '../assets/stylesheets/animated.css';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

//const content = 

const Tree = ({ in: inProp, renderItem, onTreeClose, content, onItemDeleteClick, onItemPlayClick }) => (
  <div className="tree-box animated slideInLeft">
    <div className="tree-box-inner">
      <div className="header">
        <div onClick={onTreeClose} className="close-tree"></div>
        <div className="left header-title">Session List</div>
      </div>
      <div className="content">
        {content.map((item) => {
          return (
            <div className="tree-item-box">
              <div className="left color-label" style={{backgroundColor: item.color}}>
              </div>
              <div className="left item-content-box">
                <div className="left item-meta-content">
                  <span className="item-date">{item.date}</span>
                  <br/><br/>
                  <span className="duration-label">Duration</span><br/>
                  <span className="duration-value">{item.duration}</span>
                </div>
                <div className="left item-description">
                  {item.description}
                </div>
                <div className="left item-play" onClick={() => onItemPlayClick(item.key)}>
                </div>
                <div className="left item-delete" onClick={() => onItemDeleteClick(item.key)}>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

export default Tree;