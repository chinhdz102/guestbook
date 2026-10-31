import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import { plantById } from './data/plants';

const KEY = 'paradise-nursery-cart-v1';
function restoreCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!Array.isArray(saved)) return { items: [] };
    const seen = new Set();
    const items = saved.filter((item) => {
      if (!item || !plantById[item.id] || seen.has(item.id) ||
          !Number.isInteger(item.quantity) || item.quantity < 1) return false;
      seen.add(item.id);
      return true;
    }).map((item) => ({ id: item.id, quantity: Math.min(item.quantity, 99) }));
    return { items };
  } catch {
    return { items: [] };
  }
}

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: { cart: restoreCart() }
});
store.subscribe(() => {
  try { localStorage.setItem(KEY, JSON.stringify(store.getState().cart.items)); }
  catch { /* Storage might be disabled; the cart still works in memory. */ }
});
