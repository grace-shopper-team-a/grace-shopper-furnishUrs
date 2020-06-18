import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    console.log('products', products)
    return (
      <div id="all-products">
        <h1> All Products : Chairs </h1>

        {products.map(product => (
          <div key={product.id} id="single-product">
            <Link to={`/products/${product.id}`}>
              <h1> {product.name} </h1>
              <img src={product.imageUrl} />
            </Link>
            <p> Description : {product.description}</p>
            <h3> Price : ${product.price} </h3>
            <button id="single-product-button"> Add To Cart </button>
          </div>
        ))}
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
export default connect(mapState, mapDispatch)(AllProducts)
