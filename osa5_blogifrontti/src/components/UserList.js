import React from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'

class UserList extends React.Component {

  componentDidMount() {
    this.props.initUsers()
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Blogs added</th>
            </tr>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.reduce((sum, b) => (1 + sum), 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initUsers
}

const ConnectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList)

export default ConnectedUserList