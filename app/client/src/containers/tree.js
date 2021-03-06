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
      selectedItem: {}, 
      itemPlaying: false
    }

    this.onItemDeleteClick = this.onItemDeleteClick.bind(this);
    this.modalOnCancel = this.modalOnCancel.bind(this);
    this.modalOnSubmit = this.modalOnSubmit.bind(this);
    this.onItemPlayClick = this.onItemPlayClick.bind(this);
    this.onMovieCloseClick = this.onMovieCloseClick.bind(this);

  }

  componentDidMount() {
    let self = this;
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
       self.setState({ itemPlaying: false })
      }
    };
  }

  onItemDeleteClick(key) {
  
    let selectedItem = _.find(this.state.content, { key: key});
    console.log('selectedItem: ', selectedItem, key)

    this.setState({
      deleteModalIsOpen: !this.state.deleteModalIsOpen, 
      selectedItem: selectedItem
    })
  }

  onItemPlayClick(key) {
    console.log('lets play the thing');
    this.setState({
      itemPlaying: true 
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

  onMovieCloseClick() {
    this.setState((prevState) => ({
      itemPlaying: !prevState.itemPlaying
    }))
  }

  render() {
    return(
      <div>

        {this.state.itemPlaying &&
          <div className="movie-fullscreen">
            <div className="movie-close" onClick={this.onMovieCloseClick}></div>
            <iframe src="https://player.vimeo.com/video/239532213" style={{height: '100vh', width: '100%'}}>
            </iframe>
          </div>
        }

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
          onItemPlayClick={this.onItemPlayClick}
          content={this.state.content}
        />
      </div>
    )
  }

}

export default Tree;