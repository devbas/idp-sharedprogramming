import createReducer from '../lib/createReducer'; 
import * as types from '../actions/types';

export const isRecordingActive = createReducer(false, {
  [types.TOGGLE_RECORDING](state, action) {
    let newState = !action.isRecordingActive
    
    return newState
  }
})

export const isPauseActive = createReducer(false, {
  [types.TOGGLE_PAUSE](state, action) {
    let newState = !action.isPauseActive
    
    return newState
  }
})

export const currentIdentifier = createReducer(false, {
  [types.SET_IDENTIFIER](state, action) {
    let newState = action.identifier

    return newState
  }
})