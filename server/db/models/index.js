const User = require('./user')
const Cart = require('./cart')
const Product = require('./products')
const CartedProduct = require('./cartedproducts')

Cart.belongsTo(User)

Cart.belongsToMany(Product, {through: CartedProduct})
Product.belongsToMany(Cart, {through: CartedProduct})

/*
+----------------+
| CartedProducts |
+----------------+
  id:
  cartId:
  productId:
  quantity:

*/
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Product
}
