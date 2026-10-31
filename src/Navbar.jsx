import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from './CartSlice';

export default function Navbar() {
  const count = useSelector(selectCartCount);
  return (
    <header className="header">
      <nav className="nav page" aria-label="Main navigation">
        <NavLink className="brand" to="/" end aria-label="Paradise Nursery home">✳ <span>paradise<br/><b>nursery</b></span></NavLink>
        <div className="nav-links">
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/plants" className={({isActive}) => isActive ? 'active' : ''}>Plants</NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? 'cart-nav active' : 'cart-nav'} aria-label={'Cart with ' + count + ' items'}>
            <span aria-hidden="true">🛒</span> Cart <span className="cart-badge">{count}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
