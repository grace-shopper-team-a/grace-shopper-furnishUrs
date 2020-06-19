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
      phoneNumber: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkoutUpdate = this.checkoutUpdate.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  checkoutUpdate() {
    this.props.updateCheckout()
    // alert('thank you')
  }

  // async componentDidMount() {
  //   this.props.updateCheckout();
  // }

  render() {
    return (
      <div id="checkout">
        <h1>Complete your order</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              value={this.state.address}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              onChange={this.handleChange}
              value={this.state.phoneNumber}
            />
          </label>
          <button
            id="checkout-button"
            type="submit"
            onClick={this.checkoutUpdate}
          >
            Checkout Cart
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapState', state)
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateCheckout: () => dispatch(updateCheckout())
  }
}

export default connect(mapState, mapDispatch)(CheckoutForm)
