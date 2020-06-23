import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'
import CheckoutForm from './checkoutForm'

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
              onClick={() => addToCart(product)}
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

function addToCart(product, userId) {
  if (!userId) {
    console.log('add a product to local stroage')
    const productExists = {status: false, idx: null}
    const guestCart = JSON.parse(window.localStorage.getItem('guest-cart'))

    guestCart.products.forEach((cartProduct, idx) => {
      if (cartProduct.productId === product.id) {
        productExists.status = true
        productExists.idx = idx
      }
    })

    if (productExists.status) {
      guestCart.products[productExists.idx].quantity++
      guestCart.totalPrice += product.price
    } else {
      guestCart.products.push({
        productId: product.id,
        title: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1
      })
      guestCart.totalPrice +=
        guestCart.products[guestCart.products.length - 1].price
    }

    window.localStorage.setItem('guest-cart', JSON.stringify(guestCart))
  }
}

// export default AllProducts
export default connect(mapState, mapDispatch)(AllProducts)
