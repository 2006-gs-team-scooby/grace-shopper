import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {displayName === 'Sign Up' ? (
          <div className="name">
            <div>
              <label htmlFor="firstName">
                <small className="smallText">First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small className="smallText">Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="information">
          <div>
            <label htmlFor="email">
              <small className="smallText">Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small className="smallText">Password</small>
            </label>
            <input name="password" type="password" />
          </div>
        </div>
        <div className="loginBtnPosition">
          <button className="loginBtn" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div className="googleSignup">
        <button className="googleButton">
          <a className="googleButton" href="/auth/google">
            {displayName} with Google
          </a>
        </button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      // console.log(evt.target.name, '@@@')
      if (evt.target.name === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        // console.log(firstName, lastName, formName, email, password, '@@@')
        dispatch(auth(email, password, formName, firstName, lastName))
      } else if (evt.target.name === 'login') {
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        console.log('logged in')
        dispatch(auth(email, password, formName))
      }
      // const firstName = evt.target.firstName.value
      // const lastName = evt.target.lastName.value
      // const formName = evt.target.name
      // const email = evt.target.email.value
      // const password = evt.target.password.value
      // dispatch(auth(firstName, lastName, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
