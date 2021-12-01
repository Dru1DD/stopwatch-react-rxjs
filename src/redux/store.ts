import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { postReducer, initialState } from './reducer/post'

const store = createStore(
    postReducer,
    initialState,
    composeWithDevTools()
)

export default store