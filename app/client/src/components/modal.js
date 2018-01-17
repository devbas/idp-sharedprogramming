import React from 'react';

const Modal = ({ props }) => (
  <div>
    <div className="modal-background" onClick={props.onCancel}></div>
	<div className="modal-box">
	  <div className="modal-box-header">

		{props.type === 'delete' &&
		  <div className="modal-box-title">{props.title} {props.selectedItem.date}</div>
		}

		{props.type === 'save' &&
		  <div className="modal-box-title">{props.title}</div>
		}
		
	  </div>
	  <div className="modal-box-content">
		
		{props.type === 'delete' &&
		  <div className="left">

			<div className="body-text">Are you sure you want to delete this session?</div>

		    <div className="modal-box-delete right" onClick={() => props.onSubmit(props.selectedItem.key)}>Delete</div>
			<div className="modal-box-cancel right" onClick={props.onCancel}>Cancel</div>
		  </div>
		}

		{props.type === 'save' &&
		  <div className="left full-width">
		  
		    <label className="save-recording-label">Description of content</label>
			<textarea className="save-recording"></textarea>

		  </div>
		}

	  </div>
	</div>
  </div>
)

export default Modal;