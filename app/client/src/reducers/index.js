import { persistCombineReducers } from 'redux-persist'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import * as paint from './paint'
import * as record from './record'
import storage from 'redux-persist/lib/storage'

const config = {
  key: 'primary', 
  storage
}

export default persistCombineReducers(config, Object.assign(paint, record, { routing: routerReducer }));