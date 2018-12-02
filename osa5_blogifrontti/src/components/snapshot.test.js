import React from 'react'
import { Notification } from './Notification'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Notification snapshot tests', () => {
  let notificationComponent
  beforeAll(() => {
    notificationComponent = shallow(<Notification />)
  })
  it('success renders correctly', () => {
    notificationComponent.setProps({ notification: { isError: false, message: 'hello' } })
    const tree = renderer
      .create(notificationComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('error renders correctly', () => {
    notificationComponent.setProps({ notification: { isError: true, message: 'error' } })
    const tree = renderer
      .create(notificationComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})