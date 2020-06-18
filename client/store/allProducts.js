import axios from 'axios'

//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'

//Initial state
const initialState = []

//Action creators
const getProducts = products => ({type: GET_PRODUCTS, products})

//Thunk creator
export const fetchProducts = () => async dispatch => {
  const {data} = await axios.get('api/products')
  console.log('data', data)
  dispatch(getProducts(data))
}

//All Products Reducer
export default function productsReducer(state = initialState, action) {
  console.log('action', action)
  switch (action.type) {
    case GET_PRODUCTS:
      return [...state, ...action.products]

    default:
      return state
  }
}
