import axios from 'axios'
import productsReducer from './allProducts'
import {use} from 'chai'
import {func} from 'prop-types'
import {act} from 'react-test-renderer'

const GET_CARTED_PRODUCT = 'GET_CARTED_PRODUCT'
const ADD_CARTED_PRODUCT = 'ADD_CARTED_PRODUCT'
const DELETE_CARTED_PRODUCT = 'DELETE_CARTED_PRODUCT'
/**
 * INITIAL STATE
 */
const defaultCartedProduct = []

/**
 * ACTION CREATORS
 */
const getCartedProduct = cartedProduct => ({
  type: GET_CARTED_PRODUCT,
  cartedProduct
})

const addCartedProduct = product => ({
  type: ADD_CARTED_PRODUCT,
  product
})

const deleteCartedProduct = productId => ({
  type: DELETE_CARTED_PRODUCT,
  productId
})
/**
 * THUNK CREATORS
 */
export const fetchCartedProduct = cartId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/cartedproducts/${cartId}`)
      dispatch(getCartedProduct(data))
    } catch (err) {
      window.location = '/404'
    }
  }
}

export const postCartedProduct = (cartId, productId) => {
  return async function(dispatch) {
    try {
      const {data} = await axios.post('/api/cartedproducts', {
        cartId,
        productId
      })
      dispatch(addCartedProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteProduct = (productId, cartId) => {
  return async function(dispatch) {
    try {
      console.log('PRODUCT CART', productId, cartId)
      await axios.delete(`/api/cartedproducts/${cartId}/${productId}`)

      dispatch(deleteCartedProduct(productId))
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCartedProduct, action) {
  switch (action.type) {
    case GET_CARTED_PRODUCT:
      return [...action.cartedProduct]
    case ADD_CARTED_PRODUCT:
      return [...state, action.product]
    case DELETE_CARTED_PRODUCT:
      return [...state.filter(product => product.id !== action.productId)]
    default:
      return state
  }
}
