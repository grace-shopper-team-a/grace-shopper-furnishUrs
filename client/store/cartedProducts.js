import axios from 'axios'

const GET_CARTED_PRODUCT = 'GET_CARTED_PRODUCT'

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

/**
 * REDUCER
 */
export default function(state = defaultCartedProduct, action) {
  switch (action.type) {
    case GET_CARTED_PRODUCT:
      return [...action.cartedProduct]
    default:
      return state
  }
}
