import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

const content = [
  {
    color: '#FFD700', 
    date: '12/12/2017', 
    duration: '28:38', 
    description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
  }, 
  {
    color: '#2D9CDB', 
    date: '07/12/2017', 
    duration: '43:38', 
    description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
  }, 
  {
    color: '#FF6666', 
    date: '28/12/2017', 
    duration: '15:38', 
    description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
  },
  {
    color: '#6DC066', 
    date: '14/11/2017', 
    duration: '22:33', 
    description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
  },
]

const Tree = ({ in: inProp, renderItem }) => (
  <div>
    <div className="tree-box">
      <div className="header">
        Session List
      </div>
      <div className="content">
        {content.map(renderItem)}
      </div>
    </div>
  </div>
)

export default Tree;