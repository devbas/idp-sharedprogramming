import React from 'react';
import Canvas from '../containers/canvas';

const DrawOptions = ({
    mainOnClick, 
    mainIsActive, 
    strokeOnClick,
    strokeIsActive,
    colorOnClick, 
    colorIsActive, 
    onStrokeClick, 
    deleteOnClick, 
    activeDrawingColor, 
    activeDrawingWidth
}) => (
    <span>

      {mainIsActive &&
        <span>
          <div class="fixed-action-btn">

            <ul>
              <li>
                <a className="btn-secondary btn-floating white btn-stroke-delete" onClick={deleteOnClick}></a>
              </li>
              <li>
                <a className="btn-secondary btn-floating white btn-width" onClick={strokeOnClick}>
                  <div className="btn-stroke-width" style={{'height': activeDrawingWidth + 'px', 'background-color': '#' + activeDrawingColor}}></div>
                </a>

                {strokeIsActive &&
                  <div className="stroke-menu">
                    <div className="item ultralarge" onClick={() => strokeOnClick(30)}></div>
                    <div className="item large" onClick={() => strokeOnClick(20)}></div>
                    <div className="item medium" onClick={() => strokeOnClick(10)}></div>
                    <div className="item small" onClick={() => strokeOnClick(5)}></div>
                  </div>
                }

              </li>
              <li>
                <a className="btn-secondary btn-floating white btn-color" onClick={colorOnClick}>
                  <div className="btn-stroke-color" style={{'background-color': '#' + activeDrawingColor}}></div>
                </a>

                {colorIsActive &&
                  <div className="color-menu">
                    <div className="item left background-grey" onClick={() => colorOnClick('C4C4C4')}></div>
                    <div className="item left background-red" onClick={() => colorOnClick('D14F4F')}></div>
                    <div className="item left background-orange" onClick={() => colorOnClick('F2994A')}></div>
                    <div className="item left background-green" onClick={() => colorOnClick('27AE60')}></div>
                    <div className="item left background-blue" onClick={() => colorOnClick('56CCF2')}></div>
                    <div className="item left background-darkgray" onClick={() => colorOnClick('333333')}></div>
                    <div className="item left background-purple" onClick={() => colorOnClick('BB6BD9')}></div>
                    <div className="item left background-white" onClick={() => colorOnClick('ffffff')}></div>
                  </div>
                }

              </li>
            </ul>

            <a id="btn-main" className="btn-primary btn-floating btn-large red active" onClick={mainOnClick}></a>
          
          </div>
          <Canvas/>
        </span>
      }

      {!mainIsActive &&
        <div class="fixed-action-btn">
          <a id="btn-main" className="btn-primary btn-floating btn-large red reverse-animation" onClick={mainOnClick}></a>
        </div>
      }
      
    </span>
)

/*       <ul>
        <li>
          <a className="btn-secondary btn-floating red">♕</a>
        </li>
        <li>
          <a className="btn-secondary btn-floating yellow">♜</a>
        </li>
        <li>
          <a className="btn-secondary btn-floating green"><i>♞</i></a>
        </li>
        <li>
          <a className="btn-secondary btn-floating blue">♚</a>
        </li>
      </ul>*/

export default DrawOptions;