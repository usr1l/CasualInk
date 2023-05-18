import React, { useState } from 'react';
import "./ShoppingCart.css";
import PageSplit from '../PageSplit';
import BottomNav from '../BottomNav';

const ShoppingCart = () => {

  const [ cartItems, setCartItems ] = useState([
    { id: 1, name: "Product 1", price: 100, quantity: 1 },
    { id: 2, name: "Product 2", price: 200, quantity: 1 },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <>
        <PageSplit>
          <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartItems.map(({ id, name, price, quantity }) => (
              <div key={id} className="cart-item">
                <img src="product_image_url_here" alt={name} />
                <div className="item-details">
                  <h3>{name}</h3>
                  <p>${price}</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(id, quantity > 1 ? quantity - 1 : 1)}>-</button>
                  <p>{quantity}</p>
                  <button onClick={() => updateQuantity(id, quantity + 1)}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(id)}>Remove</button>
              </div>
            ))}
            <h2>Total: ${total}</h2>
          </div>
        </PageSplit>
        <PageSplit>

        </PageSplit>
      </>
      <BottomNav></BottomNav>
    </>
  );
};

export default ShoppingCart;
