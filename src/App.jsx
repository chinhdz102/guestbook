import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="page hero-body">
          <span className="eyebrow hero-eyebrow">GROW YOUR HAPPY PLACE</span>
          <h1>Paradise Nursery<br/><em>Grow a greener home.</em></h1>
          <p>Explore the beauty of indoor plants and find something wonderful for your space.</p>
          <Link to="/plants" className="button primary">Get Started ↗</Link>
        </div>
      </section>
      <div className="strip"><div className="page">✳ BEAUTIFUL PLANTS &nbsp; • &nbsp; EVERYDAY JOY &nbsp; • &nbsp; MADE FOR YOUR HOME ✳</div></div>
      <AboutUs />
      <section className="page cta">
        <span className="eyebrow">READY TO GROW?</span>
        <h2>Meet your new <em>plant companion.</em></h2>
        <Link to="/plants" className="button primary">Shop all plants ↗</Link>
      </section>
    </>
  );
}

export default function App() {
  return (
    <div className="shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="*" element={<div className="page not-found"><h1>Page not found</h1><Link to="/">Go Home</Link></div>} />
        </Routes>
      </main>
      <footer className="footer"><div className="page">✳ paradise nursery <span>Grow your happy place. © Paradise Nursery</span></div></footer>
    </div>
  );
}
