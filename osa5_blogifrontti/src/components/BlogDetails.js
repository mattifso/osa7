import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initBlogs } from '../reducers/blogsReducer'

class BlogDetails extends React.Component {
  componentDidMount() {
    this.props.initBlogs()
  }

  static propTypes = {
    blogId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId
    }
  }

  render() {
    const blog = this.props.blogs.find(b => b._id === this.props.blogId)
    return (
      blog ?
        <div>
          <h2>{blog.title}</h2>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>likes: {blog.likes}</div>
          <div>added by {blog.user.name}</div>
          <div>
            Comments:
          <ul>
            {blog.comments.map(c => <li>{c}</li>)}
          </ul>
          </div>
        </div>
        : ''
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  initBlogs
}

const ConnectedBlogDetails = connect(mapStateToProps, mapDispatchToProps)(BlogDetails)

export default ConnectedBlogDetails