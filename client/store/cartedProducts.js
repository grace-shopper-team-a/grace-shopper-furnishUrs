import axios from 'axios'
import productsReducer from './allProducts'
import {use} from 'chai'
import {func} from 'prop-types'

const GET_CARTED_PRODUCT = 'GET_CARTED_PRODUCT'
const ADD_CARTED_PRODUCT = 'ADD_CARTED_PRODUCT'
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

/**
 * REDUCER
 */
export default function(state = defaultCartedProduct, action) {
  switch (action.type) {
    case GET_CARTED_PRODUCT:
      return [...action.cartedProduct]
    case ADD_CARTED_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
