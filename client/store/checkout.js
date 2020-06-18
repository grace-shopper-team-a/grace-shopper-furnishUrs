import axios from 'axios'

//action type
const CHECKOUT = 'CHECKOUT'

//initial state
const initialState = []

//action creator
const getCheckout = product => ({type: CHECKOUT, product})

//thunk creator
export const updateCheckout = () => async dispatch => {
  const res = await axios.put('/api/', {checkedOut: true})
  console.log('RES:', res)
  dispatch(getCheckout(res))
}

//checkout reducer
export default function checkoutReducer(state = initialState, action) {
  console.log('action', action)
  switch (action.type) {
    case CHECKOUT:
      return [...state, action.user]
    default:
      return state
  }
}
