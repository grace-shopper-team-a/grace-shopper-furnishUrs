const router = require('express').Router()
const {CartedProduct, Cart} = require('../db/models')
module.exports = router

router.post('/', async (req, res) => {
  const currentCart = await Cart.findOne({
    where: {
      userId: req.body.id,
      checkedOut: false
    }
  })
  await CartedProduct.create({
    cartId: currentCart.id,
    productId: req.body.productId,
    quantity: req.body.quantity
  })
})

router.get('/:cartId', async (req, res) => {
  const cart = await CartedProduct.findAll({
    where: {
      cartId: req.params.cartId
    }
  })
  res.send(cart)
})
