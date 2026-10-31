import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice';
import { categories, plants, formatPrice } from './data/plants';

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const alreadyAdded = new Set(cartItems.map((item) => item.id));
  const query = search.trim().toLowerCase();

  return (
    <div className="shop">
      <div className="page page-heading">
        <span className="eyebrow">THE PLANT SHOP</span>
        <h1>Find your <em>green thing.</em></h1>
        <p>Explore 18 beautiful indoor plants across three collections.</p>
      </div>
      <div className="filters"><div className="page filter-content">
        <div className="category-links">
          {categories.map((group) => <a href={'#' + group.id} key={group.id}>{group.title}</a>)}
        </div>
        <label className="search"><span className="visually-hidden">Search plants</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search plants..." type="search"/>
        </label>
      </div></div>
      <p className="visually-hidden" aria-live="polite" role="status">{message}</p>
      <div className="page shop-body">
        {categories.map((group, i) => {
          const products = plants.filter((plant) => plant.category === group.id &&
            (plant.name.toLowerCase().includes(query) || plant.description.toLowerCase().includes(query)));
          if (!products.length) return null;
          return (
            <section className="plant-category" id={group.id} key={group.id}>
              <div className="category-heading">
                <div><span className="eyebrow">COLLECTION / 0{i+1}</span><h2>{group.title}</h2><p>{group.description}</p></div>
                <span className="category-count">{products.length} PLANTS</span>
              </div>
              <div className="product-grid">
                {products.map((plant) => {
                  const added = alreadyAdded.has(plant.id);
                  return <article className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name + ' potted houseplant'} loading="lazy"/>
                    <div className="product-info">
                      <div className="product-title"><h3>{plant.name}</h3><strong>{formatPrice(plant.price)}</strong></div>
                      <p>{plant.description}</p>
                      <button type="button" className="add-button" disabled={added} onClick={() => {
                        dispatch(addItem(plant.id));
                        setMessage(plant.name + ' added to cart');
                      }}>{added ? '✓ Added to Cart' : '+ Add to Cart'}</button>
                    </div>
                  </article>;
                })}
              </div>
            </section>
          );
        })}
        {plants.every((plant) => !plant.name.toLowerCase().includes(query) && !plant.description.toLowerCase().includes(query)) &&
          <div className="no-results"><h2>No matching plants</h2><button className="button outline" onClick={() => setSearch('')}>Clear search</button></div>}
        <p className="after-shop">Ready to check out? <Link to="/cart">View your cart →</Link></p>
      </div>
    </div>
  );
}
