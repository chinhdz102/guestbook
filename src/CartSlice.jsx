import { createSlice } from '@reduxjs/toolkit';
import { plantById } from './data/plants';

const initialState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const product = plantById[action.payload];
      if (!product || state.items.some((item) => item.id === product.id)) return;
      state.items.push({ id: product.id, quantity: 1 });
    },
    incrementItem(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < 99) item.quantity += 1;
    },
    decrementItem(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item) return;
      if (item.quantity === 1) {
        state.items = state.items.filter((entry) => entry.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  }
});

export const { addItem, incrementItem, decrementItem, removeItem } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) =>
  total + (plantById[item.id]?.price || 0) * item.quantity, 0);
export default cartSlice.reducer;
