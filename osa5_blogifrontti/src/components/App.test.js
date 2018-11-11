import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './Blog'
import LoginForm from './LoginForm'

describe('<App />', () => {
  let app
  beforeAll(() => {
    localStorage.clear()
    app = mount(<App />)
  })

  it('renders login form and nothing else when user is not yet logged in', () => {
    app.update()
    expect(app.find(Blog).length).toEqual(0)
    expect(app.find(LoginForm).length).toEqual(1)
  })
})