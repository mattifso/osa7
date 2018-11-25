import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup style={{ width: '25em' }}>
          <div>
            <ControlLabel>username</ControlLabel>
          <FormControl
              name="username"
              type="text"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            <ControlLabel>password</ControlLabel>
          <FormControl
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <Button bsStyle="success" type="submit">kirjaudu</Button>
        </FormGroup>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm