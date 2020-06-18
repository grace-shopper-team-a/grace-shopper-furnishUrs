const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/:relatedUserId', async (req, res) => {
  try {
    const requestedCart = await Cart.findOne({
      where: {
        userId: req.params.relatedUserId
      }
    })
    res.json(requestedCart)
  } catch (err) {
    console.log(err)
  }
})

router.put('/', async (req, res, next) => {
  console.log('here')
  try {
    const id = req.body.userId
    const currentCart = await Cart.findOne({
      where: {
        userId: id,
        checkedOut: false
      }
    })
    if (currentCart.checkedOut === false) {
      currentCart.checkedOut = true
      await currentCart.save()
    }
    res.json(currentCart)
  } catch (error) {
    next(error)
  }
})
