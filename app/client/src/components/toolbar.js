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
  onToolbarToggleClick, 
  isPaused, 
  onMouseLeave, 
  isToolbarActive
}) => (
  <span>
    {!isToolbarActive && !isRecording &&
      <div className="arrow arrow-top" onClick={onToolbarToggleClick}></div>
    }

    {!isToolbarActive && isRecording &&
      <div className="toolbar-tooltip" onClick={onToolbarToggleClick}>
        <div className="label">recording</div>
        <div className="recording"></div>
        <div className="arrow"></div>
      </div>
    }

    {isToolbarActive &&
      <div className="toolbar">
        <div className="toolbar-box animated slideInDown" onMouseLeave={onMouseLeave}>

          {isRecording &&
            <div className="left record-icon" onClick={onRecordClick}></div>
          }

          {!isRecording &&
            <div className="left recording-icon" onClick={onRecordClick}></div>
          }

          {isPaused && isRecording && 
            <div className="left play-icon" onClick={onPauseToggle}></div>    
          }
          
          {!isPaused && isRecording &&
            <div className="left pause-icon" onClick={onPauseToggle}></div>      
          }

          {!isRecording && 
            <div className="left play-icon inactive-icon"></div>      
          }

          {isPaused &&
            <div className="left save-icon" onClick={onSaveClick}></div>
          }

          {!isPaused &&
            <div className="left save-icon inactive-icon"></div>
          }

          <div className="left close-icon" onClick={onToolbarToggleClick}></div> 
          

        </div>
      </div>
    }
  </span>
)

//      <div className="left settings-icon" onClick={onSettingsClick}></div> 
//<div className="left help-icon" onClick={onHelpClick}></div> 

export default Toolbar;