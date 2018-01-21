import * as types from './types'; 

export function setActiveColor({ color }) {
  return {
    type: types.SET_ACTIVE_COLOR, 
    color
  }
}

export function setActiveWidth({ width }) {
  return  {
    type: types.SET_ACTIVE_WIDTH, 
    width
  }
}

export function toggleDrawing({ isDrawingActive }) {
  return {
    type: types.TOGGLE_DRAWING, 
    isDrawingActive
  }
}

export function setLines({ lines }) {
  return {
    type: types.SET_LINES, 
    lines
  }
}

/*export function parseLayers(layer, location) {
  return (dispatch, getState) => {
    dispatch(setLayers({ layer: layer, location: location }))
  }
} */

export function boundToggleDrawing() {
  return (dispatch, getState) => {
    dispatch(toggleDrawing({ isDrawingActive: getState().isDrawingActive }))
  }
}

export function boundActiveColor(color) {
  return (dispatch, getState) => {
    dispatch(setActiveColor({ color: color }))
  }
}

export function boundActiveWidth(width) {
  return (dispatch, getState) => {
    dispatch(setActiveWidth({ width: width }))
  }
}

export function boundSetLines(lines, ) {
  return (dispatch, getState) => {
    dispatch(setLines({ lines: lines }))
  }
}