const router = require('express').Router()
const {CartedProduct, Cart, Product} = require('../db/models')
module.exports = router

router.post('/', async (req, res) => {
  const currentCart = await Cart.findOne({
    where: {
      id: req.body.cartId,
      checkedOut: false
    }
  })

  // console.log(await currentCart.__proto__)//eslint-disable-line

  if (!await currentCart.hasProduct(req.body.productId)) {
    await currentCart.addProducts(req.body.productId) //adds product to CartedProduct Table
    await CartedProduct.update(
      {quantity: 1},
      {where: {productId: req.body.productId}}
    ) //updates Quantity Field for the product
  } else {
    await CartedProduct.findOne({where: {productId: req.body.productId}}).then(
      async product => {
        await product.update({quantity: product.quantity + 1})
      }
    ) //increments products quantity if it already exists
  }
  res.send(currentCart)
})
