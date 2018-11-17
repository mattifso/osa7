import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'

class User extends React.Component {
  componentDidMount() {
    this.props.initUsers()
  }

  static propTypes = {
    userId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId
    }
  }

  render() {
    const user = this.props.users.find(u => u.id === this.props.userId);
    const blogs = user ? user.blogs : []
    return (
      <div>
        <h2>{user ? user.name : ''}</h2>
        <h3>Added blogs</h3>
        <ul>
          {blogs.map(b => <li>{b.title}</li>)}
        </ul>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = {
  initUsers
}

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)

export default ConnectedUser