import React from 'react'
import {connect} from 'react-redux'

function DisplayProduct(props) {
  const {product} = props
  const {userId} = props
  return (
    <div id="all-products">
      <div
        style={{
          textAlign: 'center',
          border: '1px black solid',
          width: '50%',
          paddingBottom: '10px'
        }}
      >
        <h2>{product.name}</h2>
        <img src={product.imageUrl} rel="product-image" />
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button
          id="single-product-button"
          onClick={() => addToCart(product, userId)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export const addToCart = function addToCart(product, userId) {
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
        title: product.name,
        imageUrl: product.imageUrl,
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
