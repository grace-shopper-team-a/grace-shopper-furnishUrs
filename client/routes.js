import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  withRouter,
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  ConnectedAllProducts,
  DisplayByCatagory,
  Cart
} from './components'
import {me} from './store'
import ConnectedSingleProduct from './components/single-product'
import NotFound from './components/not-found'
import ConnectedCheckoutForm from './components/checkoutForm'
import {fetchCart} from './store/carts'
import {fetchCartedProduct} from './store/cartedProducts'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    console.log('CART', this.props.cart)

    if (!this.props.isLoggedIn) {
      console.log('IF STATEMENT')
      if (!window.localStorage.getItem('guest-cart')) {
        window.localStorage.setItem(
          'guest-cart',
          JSON.stringify({products: [], totalPrice: 0})
        )
      }
    } else if (isLoggedIn && !this.props.cart.id) {
      console.log('ELSE IF STATEMENT')
      this.props.getCart(this.props.userId)
    }

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ConnectedAllProducts} />
        <Route path="/home" component={ConnectedAllProducts} />
        <Route path="/chair" component={DisplayByCatagory} />
        <Route path="/table" component={DisplayByCatagory} />
        <Route path="/couch" component={DisplayByCatagory} />
        <Route path="/bed" component={DisplayByCatagory} />
        <Route path="/drawers" component={DisplayByCatagory} />
        <Route exact path="/" component={ConnectedAllProducts} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/products" component={ConnectedAllProducts} />
        <Route
          exact
          path="/products/:productId"
          component={ConnectedSingleProduct}
        />
        <Route path="/checkout" component={ConnectedCheckoutForm} />
        {/* <Route path="/404" component={NotFound} /> */}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/home" component={UserHome} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={ConnectedAllProducts} />
            <Route path="/chair" component={DisplayByCatagory} />
            <Route path="/table" component={DisplayByCatagory} />
            <Route path="/couch" component={DisplayByCatagory} />
            <Route path="/bed" component={DisplayByCatagory} />
            <Route path="/drawers" component={DisplayByCatagory} />
            <Route path="/home" component={UserHome} />

            <Route
              exact
              path="/products/:productId"
              component={ConnectedSingleProduct}
            />
            <Route path="/404" component={NotFound} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getCart: userId => dispatch(fetchCart(userId))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
