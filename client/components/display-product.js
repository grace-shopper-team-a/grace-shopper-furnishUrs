import React from 'react'

function DisplayProduct(props) {
  const {product} = props
  const {userId} = props
  return (
    <div
      style={{
        textAlign: 'center',
        border: '1px black solid',
        width: '50%',
        paddingBottom: '10px'
      }}
    >
      <h3>{product.name}</h3>
      <img src={product.imageUrl} rel="product-image" />
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product, userId)}>Add to Cart</button>
    </div>
  )
}

function addToCart(product, userId) {
  if (!userId) {
    const productExists = {status: false, idx: null}
    const guestCart = JSON.parse(window.localStorage.getItem('guest-cart'))

    guestCart.products.forEach((cartProduct, idx) => {
      if (cartProduct.productId === product.id) {
        productExists.status = true
        productExists.idx = idx
      }
    })

    if (productExists.status) {
      guestCart.products[productExists.idx].quantity++
      guestCart.totalPrice += product.price
    } else {
      guestCart.products.push({
        productId: product.id,
        price: product.price,
        quantity: 1
      })
      guestCart.totalPrice +=
        guestCart.products[guestCart.products.length - 1].price
    }

    window.localStorage.setItem('guest-cart', JSON.stringify(guestCart))
  }
}

export default DisplayProduct
