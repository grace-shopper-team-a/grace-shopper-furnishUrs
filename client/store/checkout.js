import axios from 'axios'

//action type
const UPDATE = 'UPDATE'

//initial state
const initialState = []

//action creator
const update = product => ({type: UPDATE, product})

//thunk creator
export const updateCheckout = userId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/carts/`, {
      checkedOut: true,
      id: userId
    })
    dispatch(update(data))
  } catch (error) {
    window.location = '/404'
  }
}

//checkout reducer
export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return [...state, action.userId]
    default:
      return state
  }
}
