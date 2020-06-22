import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

// window.localStorage.setItem('guest-cart', JSON.stringify(guestCart))

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

  deleteItem(productId) {
    const deletedproductCart = this.state.guestCart.filter(product => {
      return product.productId !== productId
    })
    this.setState(state => {
      return {guestCart: deletedproductCart}
    })
    let total = 0
    deletedproductCart.forEach(product => {
      total += product.price * product.quantity
    })
    this.setState(state => {
      return {totalPrice: total}
    })
  }

  updateTotalPrice() {
    console.log('update price', this.state)

    let total = 0
    this.state.guestCart.forEach(product => {
      console.log('product!')
      total += product.price * product.quantity
    })
    this.setState(state => {
      return {totalPrice: total}
    })
  }

  quantityIncrease(productId) {
    this.state.guestCart.forEach(product => {
      if (product.productId === productId) product.quantity++
    })
    this.updateTotalPrice()
  }

  quantityDecrease(productId) {
    this.state.guestCart.forEach(product => {
      if (product.productId === productId)
        if (product.quantity > 0) product.quantity--
    })
    this.updateTotalPrice()
  }

  render() {
    console.log('rendering state', this.state)
    return (
      <div>
        <div id="shopping-cart">
          <h1> Shopping Cart </h1>
          {this.state.guestCart.map(product => {
            console.log('Each Product', product)
            return (
              <div key={product.productId} id="checkout-item">
                <div id="checkout-img">
                  <img src={product.imageUrl} rel="product-image" />
                </div>
                <div>
                  <h1>{product.title}</h1>
                </div>
                <div id="quantity">
                  <div>
                    <p>Price : {product.price}</p>
                    <br />
                  </div>
                  <div>Quantity : {product.quantity}</div>
                  <div>
                    <button
                      onClick={() => this.quantityDecrease(product.productId)}
                    >
                      {' '}
                      -{' '}
                    </button>
                    <button
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
            <h1>Total : $ {this.state.totalPrice}. 00</h1>

            <Link to="/checkout">
              <button id="single-product-button">BUY NOW</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapState', state)
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
