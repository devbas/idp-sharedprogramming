import React from 'react';

const Modal = ({ body, title, onClose }) => (
	<div>
		<div className="modal-background" onClick={onClose}></div>
		<div className="modal-box">
			<div className="modal-box-header">
				<div className="modal-box-title">{title}</div>
				<div className="modal-box-close" onClick={onClose}></div>
			</div>
			<div className="modal-box-content">
                {body}
			</div>
		</div>
	</div>
)

export default Modal;