import React, { Component } from 'react';
import TreeComponent from '../components/tree';
import Modal from './modal';
import _ from 'lodash';

class Tree extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      deleteModalIsOpen: false, 
      content: [
        {
          key: 1,
          color: '#FFD700', 
          date: '12/12/2017', 
          duration: '28:38', 
          description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
        }, 
        {
          key: 2,
          color: '#2D9CDB', 
          date: '07/12/2017', 
          duration: '43:38', 
          description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
        }, 
        {
          key: 3,
          color: '#FF6666', 
          date: '28/12/2017', 
          duration: '15:38', 
          description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
        },
        {
          key: 4,
          color: '#6DC066', 
          date: '14/11/2017', 
          duration: '22:33', 
          description: 'Lorem ipsum dolor amet try-hard lomo yr la croix flannel, tattooed gentrify ramps shoreditch helvetica quinoa literally distillery austin sartorial. Bespoke venmo pitchfork cornhole street art hammock banjo lumbersexual church-key.'
        },
      ], 
      selectedItem: {}
    }

    this.onItemDeleteClick = this.onItemDeleteClick.bind(this);
    this.modalOnCancel = this.modalOnCancel.bind(this);
    this.modalOnSubmit = this.modalOnSubmit.bind(this);
  }

  onItemDeleteClick(key) {
  
    let selectedItem = _.find(this.state.content, { key: key});
    console.log('selectedItem: ', selectedItem, key)

    this.setState({
      deleteModalIsOpen: !this.state.deleteModalIsOpen, 
      selectedItem: selectedItem
    })
  }

  modalOnCancel() {
    this.setState({ deleteModalIsOpen: !this.state.deleteModalIsOpen })
  }

  modalOnSubmit(key) {
    this.setState((prevState) => {
      return {
        deleteModalIsOpen: !prevState.deleteModalIsOpen,
        content: _.filter(prevState.content, (item) => item.key !== key)
      }
    }) 
  }

  render() {
    return(
      <div>
        {this.state.deleteModalIsOpen &&
          <Modal 
            title='Delete Session'
            type='delete'
            body={this.state.deleteSessionBody}
            onCancel={this.modalOnCancel} 
            onSubmit={this.modalOnSubmit}
            selectedItem={this.state.selectedItem}/>
        }

        <TreeComponent 
          in={this.props.in} 
          onTreeClose={this.props.onTreeClose}
          onItemDeleteClick={this.onItemDeleteClick}
          content={this.state.content}
        />
      </div>
    )
  }

}

export default Tree;