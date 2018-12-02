import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'John Smith',
      likes: 42
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    const likesDiv = blogComponent.find('.likes')

    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})