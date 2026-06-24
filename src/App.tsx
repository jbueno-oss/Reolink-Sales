import { useEffect, useRef, useState, useCallback } from 'react';
import './index.css';
import ProductDetail from './ProductDetail';
import type { Product } from './ProductDetail';
import ProductFinder from './ProductFinder';
import logo from './assets/Logo Reolink.svg';

/* ─── Data ─── */
const categories = ['All', 'Doorbells', 'Bundles', 'Accessories', 'Outdoor', 'Indoor'];

const products: Product[] = [
  { id: 1, name: 'Argus 4 Pro',        image: '/images/argus4pro.png',       category: 'Outdoor'     },
  { id: 2, name: 'Go Ranger PT',       image: '/images/go-ranger-pt.png',    category: 'Outdoor'     },
  { id: 3, name: 'OMVI 3i PoE',        image: '/images/omvi3i-poe.png',      category: 'Bundles'     },
  { id: 4, name: 'Reolink E1 Pro',     image: '/images/reolink-e1-pro.png',  category: 'Indoor'      },
  { id: 5, name: 'Reolink Duo 3 PoE',  image: '/images/reolink-duo3-poe.png',category: 'Outdoor'     },
  { id: 6, name: 'Reolink E1 Pro',     image: '/images/argus4pro.png',       category: 'Accessories' },
];

/* ─── Intersection-Observer Hook ─── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Home Components ─── */

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Reolink"
        className="header__logo"
      />
    </header>
  );
}

function ProductFinderCard({ onStart }: { onStart: () => void }) {
  return (
    <section className="product-finder-card">
      <div className="product-finder-card__image-wrapper">
        <img
          src="/images/product-finder-hero.png"
          alt="Reolink security cameras showcase"
          className="product-finder-card__image"
        />
      </div>

      <div className="product-finder-card__text">
        <h2 className="product-finder-card__title">Product Finder</h2>
        <p className="product-finder-card__subtitle">
          Answer a few questions to find the right product
        </p>
      </div>

      <button type="button" className="product-finder-card__btn" onClick={onStart}>
        Find Your Product
        <span className="product-finder-card__btn-arrow">›</span>
      </button>
    </section>
  );
}

function CategoryFilters({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (cat: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="category-filters" ref={scrollRef}>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`category-chip ${
            active === cat ? 'category-chip--active' : 'category-chip--inactive'
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (p: Product) => void;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      className="product-card reveal"
      ref={ref}
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(product); }}
    >
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
      </div>
      <p className="product-card__name">{product.name}</p>
    </div>
  );
}

function CatalogSection({ onSelectProduct }: { onSelectProduct: (p: Product) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="catalog">
      <h2 className="catalog__title">Catalog</h2>

      <CategoryFilters active={activeCategory} onSelect={setActiveCategory} />

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard
            key={`${product.id}-${activeCategory}`}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── App with Client-Side Routing ─── */

type View = { page: 'home' } | { page: 'detail'; product: Product } | { page: 'finder' };

function App() {
  const [view, setView] = useState<View>({ page: 'home' });

  const goToDetail = useCallback((product: Product) => {
    setView({ page: 'detail', product });
    window.scrollTo({ top: 0 });
  }, []);

  const goHome = useCallback(() => {
    setView({ page: 'home' });
    window.scrollTo({ top: 0 });
  }, []);

  const goFinder = useCallback(() => {
    setView({ page: 'finder' });
    window.scrollTo({ top: 0 });
  }, []);

  if (view.page === 'detail') {
    return <ProductDetail product={view.product} onHome={goHome} />;
  }

  if (view.page === 'finder') {
    return <ProductFinder onBack={goHome} />;
  }

  return (
    <>
      <Header />
      <main className="main-content">
        <ProductFinderCard onStart={goFinder} />
        <CatalogSection onSelectProduct={goToDetail} />
      </main>
    </>
  );
}

export default App;
