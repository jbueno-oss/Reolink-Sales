import { useEffect, useRef, useState, useCallback } from 'react';
import './index.css';
import ProductDetail from './ProductDetail';
import type { Product } from './ProductDetail';
import ProductFinder from './ProductFinder';
import CompareScreen from './CompareScreen';
import logo from './assets/Logo Reolink.svg';

import imgArgus3ProKit from './assets/SVG and images/IMG/Argus 3 Pro 4x Kit + Hub.jpg';
import imgArgus4Pro from './assets/SVG and images/IMG/Argus 4 Pro Panoramic.jpg';
import imgArgusPTUltraSingle from './assets/SVG and images/IMG/Argus PT Ultra.jpg';
import imgArgus3ProStandalone from './assets/SVG and images/IMG/Argus 3 Pro Standalone.jpg';
import imgArgusMagiCam from './assets/SVG and images/IMG/Argus MagiCam Magnetic.jpg';
import imgArgusSolarSingle from './assets/SVG and images/IMG/Argus Solar.jpg';
import imgSmartVideoDoorbell from './assets/SVG and images/IMG/Battery Video Doorbell.jpg';
import imgE1Zoom from './assets/SVG and images/IMG/E1 Zoom.jpg';
import imgE321Indoor from './assets/SVG and images/IMG/E Series E321.jpg';
import imgEliteFloodlight from './assets/SVG and images/IMG/Elite Floodlight WiFi.jpg';
import imgGoPTPlus from './assets/SVG and images/IMG/Go PT Plus 4G LTE.jpg';
import imgNVSPoE8MB4 from './assets/SVG and images/IMG/NVS8-8MB4.jpg';
import imgNVSPoE8MD4 from './assets/SVG and images/IMG/NVS8-8MD4.jpg';
import imgNVSPoE12MD6 from './assets/SVG and images/IMG/NVS8-12MD6.jpg';
import imgSolarFloodlight from './assets/SVG and images/IMG/Solar Floodlight Cam F310B.jpg';
import imgProductSearch from './assets/Hero Images SKUs- Reolink/Product Search.png';

/* ─── Data ─── */
const categories = ['All', 'Battery', 'Wi-Fi', '4G', 'PoE', 'Floodlight', 'Kits'];

const products: Product[] = [
  { id: 1, name: 'Argus 3 Pro 4x Kit + Hub',     image: imgArgus3ProKit, category: 'Battery', isKit: true },
  { id: 2, name: 'Argus 4 Pro',                  image: imgArgus4Pro, category: 'Battery' },
  { id: 4, name: 'Argus PT Ultra',               image: imgArgusPTUltraSingle, category: 'Battery', has2Pack: true, isKit: true },
  { id: 5, name: 'Argus 3 Pro',                  image: imgArgus3ProStandalone, category: 'Battery' },
  { id: 6, name: 'Argus MagiCam',                image: imgArgusMagiCam, category: 'Battery' },
  { id: 8, name: 'Argus Solar',                  image: imgArgusSolarSingle, category: 'Battery', has2Pack: true, isKit: true },
  { id: 9, name: 'Reolink Video Doorbell',       image: imgSmartVideoDoorbell, category: 'Battery' },
  { id: 10, name: 'E1 Zoom',                     image: imgE1Zoom, category: 'Wi-Fi' },
  { id: 11, name: 'E Series E321',               image: imgE321Indoor, category: 'Wi-Fi' },
  { id: 12, name: 'Elite Floodlight WiFi',       image: imgEliteFloodlight, category: 'Floodlight' },
  { id: 13, name: 'Reolink Go PT Plus',          image: imgGoPTPlus, category: '4G' },
  { id: 14, name: 'NVS8-8MB4',                   image: imgNVSPoE8MB4, category: 'PoE', isKit: true },
  { id: 15, name: 'NVS8-8MD4',                   image: imgNVSPoE8MD4, category: 'PoE', isKit: true },
  { id: 16, name: 'NVS8-12MD6',                  image: imgNVSPoE12MD6, category: 'PoE', isKit: true },
  { id: 17, name: 'Solar Floodlight Cam',        image: imgSolarFloodlight, category: 'Floodlight' },
];

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
          src={imgProductSearch}
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
  isCompareMode,
  compareIndex,
}: {
  product: Product;
  onSelect: (p: Product) => void;
  isCompareMode?: boolean;
  compareIndex?: number | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRevealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (hasRevealed.current) {
      el.classList.add('visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          hasRevealed.current = true;
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });

  const isSelected = compareIndex !== null && compareIndex !== undefined;

  return (
    <div
      className={`product-card reveal${isSelected ? ' product-card--selected' : ''}`}
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
        {isCompareMode && (
          <div className={`product-card__checkbox${isSelected ? ' product-card__checkbox--checked' : ''}`}>
            {isSelected && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
        )}
      </div>
      <div className="product-card__content" style={{ marginTop: '12px' }}>
        <p className="product-card__name" style={{ margin: 0 }}>{product.name}</p>
        {product.has2Pack && (
          <span className="product-card__badge" style={{ fontSize: '12px', color: '#666', display: 'block', marginTop: '4px' }}>
            Available in Single & 2-Pack
          </span>
        )}
      </div>
    </div>
  );
}

function CatalogSection({ onSelectProduct, onCompare }: { onSelectProduct: (p: Product) => void, onCompare: (products: Product[]) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState<Product[]>([]);

  const filtered =
    activeCategory === 'All'
      ? products
      : activeCategory === 'Kits'
      ? products.filter((p) => p.isKit)
      : products.filter((p) => p.category === activeCategory);

  const handleProductSelect = (product: Product) => {
    if (isCompareMode) {
      setCompareSelection(prev => {
        const isSelected = prev.find(p => p.id === product.id);
        if (isSelected) {
          return prev.filter(p => p.id !== product.id);
        } else if (prev.length < 3) {
          return [...prev, product];
        }
        return prev;
      });
    } else {
      onSelectProduct(product);
    }
  };

  const toggleCompareMode = () => {
    setIsCompareMode(!isCompareMode);
    if (isCompareMode) {
      setCompareSelection([]);
    }
  };

  return (
    <>
      <section className="catalog">
        <div className="catalog__header">
          <h2 className="catalog__title">Catalog</h2>
          <div className="catalog__compare-toggle">
            <span className="toggle-label">Compare Products</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={isCompareMode} onChange={toggleCompareMode} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <CategoryFilters active={activeCategory} onSelect={setActiveCategory} />

        <div className={`product-grid${isCompareMode ? ' product-grid--compare-padded' : ''}`}>
          {filtered.map((product) => {
            const selIndex = compareSelection.findIndex(p => p.id === product.id);
            const compareIndex = selIndex !== -1 ? selIndex + 1 : null;
            return (
              <ProductCard
                key={`${product.id}-${activeCategory}`}
                product={product}
                onSelect={handleProductSelect}
                isCompareMode={isCompareMode}
                compareIndex={compareIndex}
              />
            );
          })}
        </div>
      </section>

      {isCompareMode && (
        <div className="compare-footer">
          <button
            className="compare-footer__btn"
            disabled={compareSelection.length === 0}
            onClick={() => onCompare(compareSelection)}
          >
            Compare Products
          </button>
          <p className="compare-footer__hint">Select up to 3 products</p>
        </div>
      )}
    </>
  );
}

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2300);
    const remove = setTimeout(onFinish, 3000);
    return () => { clearTimeout(timer); clearTimeout(remove); };
  }, [onFinish]);

  return (
    <div className={`splash${fadeOut ? ' splash--fade-out' : ''}`}>
      <div className="splash__blob splash__blob--1" />
      <div className="splash__blob splash__blob--2" />
      <div className="splash__blob splash__blob--3" />
      <div className="splash__logo">
        <img src={logo} alt="Reolink" className="splash__logo-img" />
      </div>
    </div>
  );
}

/* ─── App with Client-Side Routing ─── */

type View = { page: 'home' } | { page: 'detail'; product: Product } | { page: 'finder' } | { page: 'compare'; products: Product[] };

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<View>({ page: 'home' });

  const goToDetail = useCallback((product: Product) => {
    setView({ page: 'detail', product });
    document.getElementById('root')?.scrollTo({ top: 0 });
  }, []);

  const goHome = useCallback(() => {
    setView({ page: 'home' });
    document.getElementById('root')?.scrollTo({ top: 0 });
  }, []);

  const goFinder = useCallback(() => {
    setView({ page: 'finder' });
    document.getElementById('root')?.scrollTo({ top: 0 });
  }, []);

  const goCompare = useCallback((products: Product[]) => {
    setView({ page: 'compare', products });
    document.getElementById('root')?.scrollTo({ top: 0 });
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (view.page === 'detail') {
    return <ProductDetail product={view.product} onHome={goHome} />;
  }

  if (view.page === 'finder') {
    return <ProductFinder onBack={goHome} />;
  }

  if (view.page === 'compare') {
    return <CompareScreen products={view.products} onBack={goHome} onHome={goHome} />;
  }

  return (
    <>
      <Header />
      <main className="main-content">
        <ProductFinderCard onStart={goFinder} />
        <CatalogSection onSelectProduct={goToDetail} onCompare={goCompare} />
      </main>
    </>
  );
}

export default App;
