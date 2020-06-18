const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/:relatedUserId', async (req, res) => {
  try {
    const requestedCart = await Cart.findOne({
      where: {
        userId: req.params.relatedUserId,
        checkedOut: false
      }
    })
    res.json(requestedCart)
  } catch (err) {
    console.log(err)
  }
})
