import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'
import CheckoutForm from './checkoutForm'
import {addToCart} from './display-product'
import {postCartedProduct} from '../store/cartedProducts'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      showCheckout: false
    }
    this.displayCheckout = this.displayCheckout.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  displayCheckout() {
    this.setState({
      showCheckout: true
    })
  }

  addToCart = product => {
    this.props.addProductToCart(this.props.cart.id, product.id)
  }

  render() {
    const products = this.props.products

    return (
      <div id="all-products">
        <Link to="/checkout">
          <button
            type="submit"
            id="checkout-button"
            onClick={this.displayCheckout}
          >
            Checkout
          </button>
          {this.state.showCheckout ? <CheckoutForm /> : null}
        </Link>

        <h1> Welcome to FurnishUrs! </h1>
        {products.map(product => (
          <div key={product.id} id="single-product">
            <Link to={`/products/${product.id}`}>
              <h1> {product.name} </h1>
              <p>{product.category}</p>
              <img src={product.imageUrl} />
            </Link>
            <p> Description : {product.description}</p>
            <h3> Price : ${product.price} </h3>
            <button
              type="submit"
              id="single-product-button"
              onClick={() => this.addToCart(product)}
            >
              {' '}
              Add To Cart{' '}
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  // console.log('mapState', state)
  return {
    products: state.allProducts,
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addProductToCart: (cartId, productId) =>
      dispatch(postCartedProduct(cartId, productId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
