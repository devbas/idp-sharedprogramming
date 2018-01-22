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
  isPaused, 
  onMouseLeave, 
  onWipeClick, 
  isDrawingActive
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
        <div className="left pause-icon inactive-icon" onClick={onPauseToggle}></div>      
      }

      {isPaused &&
        <div className="left save-icon" onClick={onSaveClick}></div>
      }

      {!isPaused &&
        <div className="left save-icon inactive-icon" onClick={onSaveClick}></div>
      }

      <div className="left toolbar-divider"></div>

      {isDrawingActive &&
        <div className="left edit-icon edit-icon-active" onClick={onEditClick}></div>
      }

      {!isDrawingActive &&
        <div className="left edit-icon" onClick={onEditClick}></div>
      }
      
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
          <div className="color-menu">
            <div className="item left background-grey" onClick={() => onColorClick('C4C4C4')}></div>
            <div className="item left background-red" onClick={() => onColorClick('D14F4F')}></div>
            <div className="item left background-orange" onClick={() => onColorClick('F2994A')}></div>
            <div className="item left background-green" onClick={() => onColorClick('27AE60')}></div>
            <div className="item left background-blue" onClick={() => onColorClick('56CCF2')}></div>
            <div className="item left background-darkgray" onClick={() => onColorClick('333333')}></div>
            <div className="item left background-purple" onClick={() => onColorClick('BB6BD9')}></div>
            <div className="item left background-white" onClick={() => onColorClick('ffffff')}></div>
          </div>
        }
      </div>
      <div className="left delete-icon" onClick={onWipeClick}></div>

      <div className="left toolbar-divider"></div>

      <div className="left close-icon" onClick={onCloseClick}></div> 

    </div>
  </div>
)

//      <div className="left settings-icon" onClick={onSettingsClick}></div> 
//<div className="left help-icon" onClick={onHelpClick}></div> 

export default Toolbar;