import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const category = this.props.location.pathname.slice(1)
    const products = this.props.products
    console.log('products', products)
    return (
      <div id="shopping-cart">
        <h1> Shopping Cart </h1>
        {products.map(product => {
          return (
            <div key={product.id} id="checkout-item">
              <div id="checkout-img">
                <img src={product.imageUrl} rel="product-image" />
              </div>
              <div>
                <h1>{product.name}</h1>
              </div>
              <div id="quantity">
                <div>
                  <p>Price : {product.price}</p>
                  <br />
                </div>
                <div>
                  <h4>
                    Quantity
                    <button> - </button>
                    1
                    <button> + </button>
                  </h4>
                </div>
              </div>
            </div>
          )
        })}
        <div>
          <h1>Total : $ 1599.80</h1>
          <button id="single-product-button">BUY NOW</button>
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
