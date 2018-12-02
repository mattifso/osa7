import React from 'react'
import { connect } from 'react-redux'

export class Notification extends React.Component {
  render() {
    const notification = this.props.notification
    return (
      notification ?
        notification.isError ?
          <div className="errorMessage" style={{ border: 1, borderStyle: 'solid', borderColor: 'red', padding: 15, width: '25em' }}>
            {notification.message}
          </div> :
          <div className="successMessage" style={{ border: 1, borderStyle: 'solid', borderColor: 'green', padding: 15, width: '25em' }}>
            {notification.message}
          </div>
        : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

export default ConnectedNotification