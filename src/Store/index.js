import {createStore, applyMiddleware} from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from '../Reducer'

const middleWares = applyMiddleware(thunk, logger);

export default createStore(reducer, middleWares)
