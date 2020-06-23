import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  constructor() {
    super()
    let cart = JSON.parse(localStorage.getItem('guest-cart'))
    this.state = {
      guestCart: cart.products,
      totalPrice: cart.totalPrice
    }
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  quantityIncrease(productId) {
    this.state.guestCart.forEach(product => {
      if (product.productId === productId) product.quantity++
    })
    this.updateTotalPrice()
    this.updatelocalStorage()
  }

  quantityDecrease(productId) {
    this.state.guestCart.forEach(product => {
      if (product.productId === productId)
        if (product.quantity > 0) product.quantity--
    })
    this.updateTotalPrice()
    this.updatelocalStorage()
  }

  deleteItem(productId) {
    this.state.guestCart.forEach((product, index) => {
      if (product.productId === productId) {
        this.state.guestCart.splice(index, 1)
      }
    })
    this.updateTotalPrice()
    this.updatelocalStorage()
  }

  findtotal() {
    let total = 0
    this.state.guestCart.forEach(product => {
      total += product.price * product.quantity
    })
    return total
  }

  updateTotalPrice() {
    this.setState(state => {
      return {totalPrice: this.findtotal()}
    })
  }

  updatelocalStorage() {
    const updatedCart = {
      products: this.state.guestCart,
      totalPrice: this.findtotal()
    }
    localStorage.setItem('guest-cart', JSON.stringify(updatedCart))
  }

  render() {
    return (
      <div>
        <div id="shopping-cart">
          <h1> Shopping Cart </h1>
          {this.state.guestCart.map(product => {
            return (
              <div key={product.productId} id="checkout-item">
                <div id="checkout-img">
                  <img
                    id="checkout-img"
                    src={product.imageUrl}
                    rel="product-image"
                  />
                </div>
                <div>
                  <h2>{product.title}</h2>
                </div>

                <div id="quantity-container">
                  <p>Price : {product.price}</p>
                  <br />
                  Quantity : {product.quantity}
                  <div>
                    <button
                      id="add-delete-button"
                      onClick={() => this.quantityDecrease(product.productId)}
                    >
                      {' '}
                      -{' '}
                    </button>
                    <button
                      id="add-delete-button"
                      onClick={() => this.quantityIncrease(product.productId)}
                    >
                      {' '}
                      +{' '}
                    </button>
                    <button
                      id="delete-me"
                      onClick={() => this.deleteItem(product.productId)}
                    >
                      {' '}
                      Delete{' '}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          <div>
            <h1>Total : $ {this.state.totalPrice}.00</h1>

            <Link to="/checkout">
              <button
                id="single-product-button"
                onClick={() => clearLocalStorage()}
              >
                BUY NOW
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const clearLocalStorage = () => {
  localStorage.clear()
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

// export default AllProducts
export default connect(mapState, mapDispatch)(Cart)
