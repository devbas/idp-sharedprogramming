import React from 'react';

const Toolbar = ({ 
  colorMenuActive,
  onRecordClick, 
  onPauseClick, 
  onSaveClick,
  onEditClick, 
  onStrokeClick, 
  onColorClick,
  onSettingsClick, 
  onHelpClick,
  isStrokeActive, 
  isColorActive, 
  strokeValue, 
  isRecording }) => (
  <div className="toolbar">
    <div className="toolbar-box">

      {isRecording &&
        <div className="left recording-icon" onClick={onRecordClick}></div>
      }

      {!isRecording &&
        <div className="left record-icon" onClick={onRecordClick}></div>
      }
      
      <div className="left pause-icon" onClick={onPauseClick}></div>
      <div className="left save-icon" onClick={onSaveClick}></div>

      <div className="left toolbar-divider"></div>

      <div className="left edit-icon" onClick={onEditClick}></div>
      <div className="left stroke-menu-box">
        <div className="left stroke-icon" onClick={onStrokeClick}></div>
        {isStrokeActive &&
          <div className="stroke-menu">
            <div className="item ultralarge" onClick={() => onStrokeClick(30)}></div>
            <div className="item large" onClick={() => onStrokeClick(20)}></div>
            <div className="item medium" onClick={() => onStrokeClick(10)}></div>
            <div className="item small" onClick={() => onStrokeClick(5)}></div>
          </div>
        }
      </div>
      <div className="left color-menu-box">
        <div className="color-icon" onClick={onColorClick}></div> 
        {isColorActive &&
          <div className="color-menu" onClick={onColorClick}>
            <p>Color menu;-)</p>
          </div>
        }
      </div>

      <div className="left toolbar-divider"></div>

      <div className="left settings-icon" onClick={onSettingsClick}></div> 
      <div className="left help-icon" onClick={onHelpClick}></div> 

    </div>
  </div>
)

export default Toolbar;