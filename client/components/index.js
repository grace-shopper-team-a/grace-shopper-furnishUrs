// import AllProducts  from './all-products'

/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as ConnectedAllProducts} from './allProducts'
export {Login, Signup} from './auth-form'
export {default as DisplayByCatagory} from './display-by-catagory.js'
export {default as Cart} from './cart'
