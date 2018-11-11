import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

class AddBlogForm extends React.Component {
  static propTypes = {
    addToBlogList: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      url: '',
      addToBlogList: props.addToBlogList
    }
  }

  createBlogEntry = () => {
    return async (event) => {
      event.preventDefault()
      const result = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      console.log('created with result ', result)
      this.state.addToBlogList(result)
      return result
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

export default AddBlogForm