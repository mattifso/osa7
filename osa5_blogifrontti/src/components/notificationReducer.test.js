import deepFreeze from 'deep-freeze'
import notificationReducer from '../reducers/notificationReducer'

describe('notificationReducer', () => {
  it('returns new state with action NOTIFICATION', () => {
    const state = []
    const action = {
      type: 'NOTIFICATION',
      data: {
        isError: false,
        message: 'success'
      }
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual(action.data)
  })

  it('clears state with action CLEAR_NOTIFICATION', () => {
    const state = [{ isError: false, message: 'hello' }]
    const action = {
      type: 'CLEAR_NOTIFICATION',
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual(null)
  })

})