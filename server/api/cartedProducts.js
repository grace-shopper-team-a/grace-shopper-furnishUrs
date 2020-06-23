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

  currentCart.addProducts(await Product.findByPk(req.body.productId))
})
