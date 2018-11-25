import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

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
        <FormGroup style={{ width: '25em' }}>
          <p>
            <ControlLabel>title</ControlLabel>
            <FormControl
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleAddBlogFieldChange}
            />
          </p>
          <p>
            <ControlLabel>author</ControlLabel>
            <FormControl
              name="author"
              type="text"
              value={this.state.author}
              onChange={this.handleAddBlogFieldChange}
            />
          </p>
          <p>
            <ControlLabel>url</ControlLabel>
            <FormControl
              name="url"
              type="text"
              value={this.state.url}
              onChange={this.handleAddBlogFieldChange}
            />
            <Button bsStyle="success" onClick={this.createBlogEntry()}>create</Button>
          </p>
        </FormGroup>
      </form>
    </div >)
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