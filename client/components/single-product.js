import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import DisplayProduct from './display-product'
import NotFound from './not-found'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    const {product} = this.props
    console.log(product)

    return <DisplayProduct product={product} userId={this.props.userId} />
  }
}

const mapToState = state => {
  return {
    product: state.singleProduct,
    userId: state.user.id
  }
}

const mapToDispatch = dispatch => ({
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId))
})

export default connect(mapToState, mapToDispatch)(SingleProduct)
