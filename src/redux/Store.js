import { createStore } from 'redux'
import RootReducer from '../redux/Reducers'

const store = createStore(RootReducer)

export default store