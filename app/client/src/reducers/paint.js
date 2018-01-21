import createReducer from '../lib/createReducer'; 
import * as types from '../actions/types';
const { List } = require('immutable');

export const activeDrawingColor = createReducer('800000', {
  [types.SET_ACTIVE_COLOR](state, action) {
    let newState = action.color
    
    return newState
  }
})

export const activeDrawingWidth = createReducer(3, {
  [types.SET_ACTIVE_WIDTH](state, action) {
    let newState = action.width

    return newState
  }
})

export const isDrawingActive = createReducer(false, {
  [types.TOGGLE_DRAWING](state, action) {
    console.log('reduceerrrr');
    let newState = !action.isDrawingActive

    return newState
  }
})

export const drawingLines = createReducer(new List(), {
  [types.SET_LINES](state, action) {
    let newState = action.lines

    return newState
  }
})