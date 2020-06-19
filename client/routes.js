import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  withRouter,
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AllProducts} from './components'
// import { allProducts } from './components/allProducts.js'
import {me} from './store'
import ConnectedSingleProduct from './components/single-product'
import NotFound from './components/not-found'
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
    // console.log("PROPS",this.props)

    console.log('USER ID', this.props.userId)
    console.log('LOGGED IN', this.props.isLoggedIn)

    if (!this.props.isLoggedIn) {
      console.log('IF STATEMENT')
      if (!window.localStorage.getItem('guest-cart')) {
        window.localStorage.setItem(
          'guest-cart',
          JSON.stringify({products: [], totalPrice: 0})
        )
      }
    } else {
      console.log('ELSE STATEMENT')
      const cart = this.props.getCart(this.props.userId)
      if (cart) {
        console.log('CART', cart)
        this.props.getCartedProduct(1)
        console.log('CARTED PRODUCT', this.props.cartedProduct)
      }
    }

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route
          exact
          path="/products/:productId"
          component={ConnectedSingleProduct}
        />
        <Route path="/404" component={NotFound} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
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
    cartedProduct: state.cartedProduct
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getCart: userId => dispatch(fetchCart(userId)),
    getCartedProduct: cartId => dispatch(fetchCartedProduct(cartId))
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
