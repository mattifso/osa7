import React from 'react'
import { shallow } from 'enzyme'
import { Notification } from './Notification'

describe('<Notification />', () => {
  let notificationComponent
  beforeEach(() => {
    localStorage.clear()
    notificationComponent = shallow(<Notification />)
  })

  it('renders with success style for ok messages', () => {
    notificationComponent.setProps({ notification: { isError: false, message: 'hello' } })
    const successMessage = notificationComponent.find('.successMessage')
    expect(successMessage.text()).toContain('hello')
  })

  it('renders with error style for error messages', () => {
    notificationComponent.setProps({ notification: { isError: true, message: 'error' } })
    const errorMessage = notificationComponent.find('.errorMessage')
    expect(errorMessage.text()).toContain('error')
  })
})