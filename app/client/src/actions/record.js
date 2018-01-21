import * as types from './types'

export function toggleRecording({ isRecordingActive }) {
  return {
    type: types.TOGGLE_RECORDING, 
    isRecordingActive
  }
}

export function togglePause({ isPauseActive }) {
  return {
    type: types.TOGGLE_PAUSE, 
    isPauseActive  
  }
}

export function boundToggleRecording() {
  return (dispatch, getState) => {
    dispatch(toggleRecording({ isRecordingActive: getState().isRecordingActive }))
  }
}

export function boundTogglePause() {
  return (dispatch, getState) => {
    dispatch(togglePause({ isPauseActive: getState().isPauseActive }))
  }
}

export function boundSetPause(status) {
  return (dispatch, getState) => {
    dispatch(togglePause({ isPauseActive: status }))
  }
}