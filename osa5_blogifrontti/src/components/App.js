import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import LoginForm from './LoginForm'
import UserList from './UserList'
import UserDetails from './UserDetails'
import BlogDetails from './BlogDetails'
import Notification from './Notification'
import { initBlogs } from '../reducers/blogsReducer'
import { logIn, logOut, loadUserFromLocalStorage } from '../reducers/loggedInUserReducer'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.initBlogs()
    this.props.loadUserFromLocalStorage()
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    this.props.logIn({ username: this.state.username, password: this.state.password })
  }

  render() {
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={() => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }

    const userInfo = () => (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              blog app
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/">
              <NavItem>
                blogs
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/users">
              <NavItem>
                users
              </NavItem>
            </LinkContainer>
            <NavItem>
              <i>{this.props.loggedInUser.name} logged in</i>
            </NavItem>
            <NavItem>
              <button onClick={this.props.logOut}>logout</button>
            </NavItem>
          </Nav>
        </Navbar>
      </div >
    )

    const blogList = () => (
      <div>
        <AddBlogForm />
        {this.props.blogs.map(blog => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    )

    return (
      <Router>
        <div className="container">
          <Notification />
          {!this.props.loggedInUser && loginForm()}
          {this.props.loggedInUser && userInfo()}
          <Route exact path="/users" render={() =>
            <div>
              <UserList />
            </div>} />
          <Route exact path="/users/:id" render={({ match }) => <UserDetails userId={match.params.id} />} />
          <Route exact path="/blogs/:id" render={({ match }) => <BlogDetails blogId={match.params.id} />} />
          <Route exact path="/" render={() => (this.props.loggedInUser && blogList())} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  initBlogs,
  loadUserFromLocalStorage,
  logIn,
  logOut
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
