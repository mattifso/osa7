import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

class AddBlogForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  createBlogEntry = () => {
    return async (event) => {
      event.preventDefault()
      this.props.addBlog({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
    }
  }

  handleAddBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (<div>
      <h2>create new</h2>
      <form onSubmit={this.createBlogEntry}>
        <p>
          title
        <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleAddBlogFieldChange}
          />
        </p>
        <p>
          author
        <input
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleAddBlogFieldChange}
          />
        </p>
        <p>
          url
        <input
            name="url"
            type="text"
            value={this.state.url}
            onChange={this.handleAddBlogFieldChange}
          />
          <button onClick={this.createBlogEntry()}>create</button>
        </p>
      </form>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addBlog
}

const ConnectedAddBlogForm = connect(mapStateToProps, mapDispatchToProps)(AddBlogForm)

export default ConnectedAddBlogForm