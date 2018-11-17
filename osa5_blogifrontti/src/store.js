import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducer from './reducers/usersReducer'
import blogsReducer from './reducers/blogsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  users: usersReducer,
  blogs: blogsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store