import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import AddBlogForm from './AddBlogForm'
import LoginForm from './LoginForm'
import UserList from './UserList'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      userData: null,
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON)
      this.setState({
        userData: userData,
        user: userData.token  // koska tehtävänannossa käskettiin laittaa token useriin
      })
      blogService.setToken(userData.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', userData: user, user: user.token }) // koska tehtävänannossa käskettiin laittaa token useriin
    } catch (exception) {
      this.setState({
        error: 'invalid username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ userData: null, user: null })
  }

  addToBlogList = (newBlog) => {
    this.setState({ blogs: this.state.blogs.concat(newBlog) })
  }

  render() {
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }

    const userInfo = () => (
      <div>
        <h2>blogs</h2>
        <p>
          {this.state.userData.name} logged in <button onClick={this.logoutHandler}>logout</button>
        </p>
      </div>
    )

    const blogList = () => (
      <div>
        <AddBlogForm addToBlogList={this.addToBlogList} />
        {this.state.blogs.map(blog => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    )

    return (
      <Router>
        <div>
          {this.state.user ? userInfo() : loginForm()}
          <Route path="/users" render={() => <div>
            <UserList />
          </div>} />
          <Route exact path="/" render={() => {
            return this.state.user ? blogList() : ''
          }} />
        </div>
      </Router>
    )
  }
}

export default App
