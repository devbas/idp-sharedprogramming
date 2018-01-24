import React from 'react';

const Toolbar = ({ 
  colorMenuActive,
  onRecordClick, 
  onPauseToggle, 
  onSaveClick,
  onSettingsClick, 
  onHelpClick,
  strokeValue, 
  isRecording, 
  onCloseClick, 
  isPaused, 
  onMouseLeave, 
  closeVisible
}) => (
  <div className="toolbar">
    <div className="toolbar-box animated slideInDown" onMouseLeave={onMouseLeave}>

      {isRecording &&
        <div className="left record-icon" onClick={onRecordClick}></div>
      }

      {!isRecording &&
        <div className="left recording-icon" onClick={onRecordClick}></div>
      }

      {isPaused &&
        <div className="left play-icon" onClick={onPauseToggle}></div>    
      }
      
      {!isPaused && isRecording &&
        <div className="left pause-icon" onClick={onPauseToggle}></div>      
      }

      {!isPaused && !isRecording &&
        <div className="left play-icon inactive-icon"></div>      
      }

      {isPaused &&
        <div className="left save-icon" onClick={onSaveClick}></div>
      }

      {!isPaused &&
        <div className="left save-icon inactive-icon" onClick={onSaveClick}></div>
      }

      {closeVisible &&
        <span>
          <div className="left toolbar-divider"></div>

          <div className="left close-icon" onClick={onCloseClick}></div> 
        </span>
      }
      

    </div>
  </div>
)

//      <div className="left settings-icon" onClick={onSettingsClick}></div> 
//<div className="left help-icon" onClick={onHelpClick}></div> 

export default Toolbar;