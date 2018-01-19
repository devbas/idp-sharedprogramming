import React from 'react';

const Toolbar = ({ 
  colorMenuActive,
  onRecordClick, 
  onPauseToggle, 
  onSaveClick,
  onEditClick, 
  onStrokeClick, 
  onColorClick,
  onSettingsClick, 
  onHelpClick,
  isStrokeActive, 
  isColorActive, 
  strokeValue, 
  isRecording, 
  onCloseClick, 
  isPaused
}) => (
  <div className="toolbar">
    <div className="toolbar-box animated slideInDown">

      {isRecording &&
        <div className="left recording-icon" onClick={onRecordClick}></div>
      }

      {!isRecording &&
        <div className="left record-icon" onClick={onRecordClick}></div>
      }

      {isPaused &&
        <div className="left play-icon" onClick={onPauseToggle}></div>    
      }
      
      {!isPaused && isRecording &&
        <div className="left pause-icon" onClick={onPauseToggle}></div>      
      }

      {!isPaused && !isRecording &&
        <div className="left pause-icon inactive-icon" onClick={onPauseToggle}></div>      
      }

      {isPaused &&
        <div className="left save-icon" onClick={onSaveClick}></div>
      }

      {!isPaused &&
        <div className="left save-icon inactive-icon" onClick={onSaveClick}></div>
      }

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
            <div className="item left background-grey"></div>
            <div className="item left background-red"></div>
            <div className="item left background-orange"></div>
            <div className="item left background-green"></div>
            <div className="item left background-blue"></div>
            <div className="item left background-darkgray"></div>
            <div className="item left background-purple"></div>
            <div className="item left background-white"></div>
          </div>
        }
      </div>

      <div className="left toolbar-divider"></div>

      <div className="left close-icon" onClick={onCloseClick}></div> 

    </div>
  </div>
)

//      <div className="left settings-icon" onClick={onSettingsClick}></div> 
//<div className="left help-icon" onClick={onHelpClick}></div> 

export default Toolbar;