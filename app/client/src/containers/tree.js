import React, { Component } from 'react';
import TreeComponent from '../components/tree';
import TreeItemComponent from '../components/treeItem';

class Tree extends Component {

  constructor(props) {
    super(props); 

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem(item) {
    return <TreeItemComponent 
      color={item.color}
      date={item.date}
      duration={item.duration}
      description={item.description}
    />
  }

  render() {
    return(
      <TreeComponent in={this.props.in} renderItem={this.renderItem}/>
    )
  }

}

export default Tree;