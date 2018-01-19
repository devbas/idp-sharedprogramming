import * as types from './types'; 

export function setLayers({ layer, location }) {
  return {
    type: types.SET_LAYERS,
    layer, 
    location
  }
}

export function parseLayers(layer, location) {
  return (dispatch, getState) => {
    dispatch(setLayers({ layer: layer, location: location }))
  }
}