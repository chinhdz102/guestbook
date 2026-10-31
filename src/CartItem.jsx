import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decrementItem, incrementItem, removeItem, selectCartItems, selectCartCount, selectCartTotal } from './CartSlice';
import { plantById, formatPrice } from './data/plants';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [checkout, setCheckout] = useState(false);

  return (
    <div className="page cart-page">
      <header className="page-heading"><span className="eyebrow">YOUR GREEN CORNER</span><h1>Your <em>shopping cart.</em></h1><p>{count} {count === 1 ? 'plant' : 'plants'} in your cart</p></header>
      {items.length === 0 ? (
        <div className="empty-cart"><div className="empty-icon">✳</div><h2>Your cart is still growing.</h2><p>Explore the nursery to discover your first plant companion.</p><Link to="/plants" className="button primary">Continue Shopping ↗</Link></div>
      ) : (
        <div className="cart-layout">
          <section aria-label="Cart items" className="cart-items">
            <h2>Your plants</h2>
            {items.map(({id, quantity}) => {
              const plant = plantById[id];
              if (!plant) return null;
              return <article className="cart-item" key={id}>
                <img src={plant.image} alt={plant.name + ' potted houseplant'}/>
                <div className="cart-detail">
                  <h3>{plant.name}</h3>
                  <p>Unit price: {formatPrice(plant.price)}</p>
                  <button type="button" className="remove" onClick={() => dispatch(removeItem(id))}>Remove</button>
                </div>
                <div className="cart-controls">
                  <strong>{formatPrice(plant.price * quantity)}</strong>
                  <div className="quantity">
                    <button aria-label={'Decrease ' + plant.name} onClick={() => dispatch(decrementItem(id))}>−</button>
                    <span>{quantity}</span>
                    <button aria-label={'Increase ' + plant.name} disabled={quantity >= 99} onClick={() => dispatch(incrementItem(id))}>+</button>
                  </div>
                </div>
              </article>;
            })}
            <Link to="/plants" className="continue">← Continue Shopping</Link>
          </section>
          <aside className="summary" aria-label="Order summary">
            <span className="eyebrow">ALMOST THERE</span><h2>Order summary</h2>
            <p className="summary-line">Items ({count}) <strong>{formatPrice(total)}</strong></p>
            <p className="summary-line">Shipping <span>Calculated later</span></p>
            <p className="summary-total">Total cart amount <strong>{formatPrice(total)}</strong></p>
            <button className="button primary" type="button" onClick={() => setCheckout(true)}>Checkout ↗</button>
            {checkout && <p className="checkout-notice" role="status">Coming Soon! Checkout is not available yet.</p>}
          </aside>
        </div>
      )}
    </div>
  );
}
