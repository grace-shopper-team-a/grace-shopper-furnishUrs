import React from 'react'
import axios from 'axios'
import {updateCheckout} from '../store/checkout'
import {connect} from 'react-redux'

export class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      address: '',
      mobile: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateCheckout(this.props.user.id)
    this.props.history.push('/confirmation')
  }

  render() {
    return (
      <div id="checkout">
        <h1>Complete your order</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="input-label">
            Name:
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              required
            />
          </label>
          <label className="input-label">
            Email:
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
          </label>
          <label className="input-label">
            Address:
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              value={this.state.address}
              required
            />
          </label>
          <label className="input-label">
            Mobile #:
            <input
              type="text"
              name="mobile"
              onChange={this.handleChange}
              value={this.state.mobile}
              required
            />
          </label>
          <div>
            <button
              id="checkout-button"
              type="submit"
              onClick={this.updateCheckout}
            >
              Checkout Cart
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateCheckout: id => dispatch(updateCheckout(id))
  }
}

export default connect(mapState, mapDispatch)(CheckoutForm)
