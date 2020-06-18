import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = productId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getSingleProduct(data))
    } catch (err) {
      window.location = '/404'
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
