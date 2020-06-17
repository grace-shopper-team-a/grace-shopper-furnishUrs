const User = require('./user')
const Cart = require('./cart')
const Product = require('./products')

Cart.belongsTo(User)
User.belongsTo(Cart)

Cart.hasMany(Product)
Product.hasMany(Cart)

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
