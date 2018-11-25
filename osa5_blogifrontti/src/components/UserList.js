import React from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

class UserList extends React.Component {

  componentDidMount() {
    this.props.initUsers()
  }

  getLink(user) {
    return '/users/' + user.id
  }

  render() {
    return (
      <div>
        <Table>
          <tbody>
            <tr>
              <th></th>
              <th>Blogs added</th>
            </tr>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <td><a href={this.getLink(user)}>{user.name}</a></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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