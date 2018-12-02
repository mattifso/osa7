import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import App from './App'
import Blog from './Blog'
import LoginForm from './LoginForm'
import store from '../store'

describe('<App />', () => {
  let app
  beforeAll(() => {
    localStorage.clear()
    app = mount(
      <Provider store={store}>
        <App />
      </Provider>)
  })

  it('renders login form and nothing else when user is not yet logged in', () => {
    app.update()
    expect(app.find(Blog).length).toEqual(0)
    expect(app.find(LoginForm).length).toEqual(1)
  })
})