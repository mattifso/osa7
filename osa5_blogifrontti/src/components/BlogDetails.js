import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initBlogs, addComment } from '../reducers/blogsReducer'

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
      userId: props.userId,
      comment: ''
    }
  }

  addComment = (event) => {
    this.props.addComment(this.props.blogId, this.state.comment)
    this.setState({ comment: '' })
  }

  handleCommentChange = (event) => {
    event.preventDefault()
    this.setState({ comment: event.target.value })
  }

  findBlog = () => (this.props.blogs.find(b => b._id === this.props.blogId))

  render() {
    const blog = this.findBlog()
    return (
      blog ?
        <div>
          <h2>{blog.title}</h2>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>likes: {blog.likes}</div>
          <div>added by {blog.user.name}</div>
          <div>
            Comments:
            <div>
              <form onSubmit={this.addComment}>
                <div><input value={this.state.comment} onChange={this.handleCommentChange} /></div>
                <button>add comment</button>
              </form>
            </div>
            <ul>
              {blog.comments.map((c, index) => {
                return (<li key={index}>{c}</li>)
              })}
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
  initBlogs,
  addComment
}

const ConnectedBlogDetails = connect(mapStateToProps, mapDispatchToProps)(BlogDetails)

export default ConnectedBlogDetails