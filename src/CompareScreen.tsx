import logo from './assets/Logo Reolink.svg';
import type { Product } from './ProductDetail';
import { specsData } from './data/specs';

interface CompareScreenProps {
  products: Product[];
  onBack: () => void;
  onHome: () => void;
}

/* Group spec keys into categories for better readability */
const specCategories: { title: string; keys: string[] }[] = [
  {
    title: 'Video & Image',
    keys: ['Video Resolution', 'Frame Rate', 'Lens', 'Field of View'],
  },
  {
    title: 'Night Vision',
    keys: ['Infrared Night Vision', 'Color Night Vision', 'ColorX'],
  },
  {
    title: 'Audio & Alerts',
    keys: ['Two-way Audio & Siren', 'Smart Alarm'],
  },
  {
    title: 'Power',
    keys: ['Battery', 'Solar Panel'],
  },
  {
    title: 'Storage & Connection',
    keys: ['Local Storage', 'Wireless Connection'],
  },
  {
    title: 'Smart Features',
    keys: ['Controllable Pan & Tilt', 'Auto Tracking', 'Optical Zoom', 'Perimeter Protection', 'AI Video Search', 'Adaptive AI Lighting', 'Privacy Mode', 'Time Lapse', 'Auto Reply'],
  },
  {
    title: 'Other',
    keys: ['Type', 'Weather Resistance'],
  },
];

export default function CompareScreen({ products, onBack, onHome }: CompareScreenProps) {

  const renderValue = (value: string | boolean | undefined) => {
    if (value === undefined) return <span className="compare-val--empty">—</span>;
    if (typeof value === 'boolean') {
      return value ? (
        <span className="compare-val--yes">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0050e2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
      ) : (
        <span className="compare-val--no">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
      );
    }
    return <span className="compare-val--text">{value}</span>;
  };

  // Check if all values are identical for a given spec
  const allSame = (key: string) => {
    const vals = products.map(p => {
      const v = specsData[p.id]?.[key];
      return v === undefined ? '___UNDEF___' : String(v);
    });
    return vals.every(v => v === vals[0]);
  };

  return (
    <div className="compare-screen">
      <header className="results-header">
        <button className="chat-back-btn" onClick={onBack} aria-label="Back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <img src={logo} alt="Reolink" className="header__logo" />
        <button className="results-header__home-btn" onClick={onHome} aria-label="Go to home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
      </header>

      <div className="compare-intro">
        <h1 className="compare-intro__title">Compare Products</h1>
        <p className="compare-intro__subtitle">See how your selections stack up</p>
      </div>

      {/* Sticky product header */}
      <div className="compare-card__header">
        <div className={`compare-card__products compare-card__products--${products.length}`}>
          {products.map((prod) => (
            <div key={prod.id} className="compare-card__product">
              <div className="compare-card__thumb">
                <img src={prod.image} alt={prod.name} />
              </div>
              <span className="compare-card__name">{prod.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spec sections grouped by category */}
      <div className="compare-card__sections">
        {specCategories.map((cat) => (
          <div key={cat.title} className="compare-section">
            <div className="compare-section__title">{cat.title}</div>
            <div className="compare-section__rows">
              {cat.keys.map((key, i) => (
                <div key={key} className={`compare-card__row${i % 2 === 0 ? '' : ' compare-card__row--alt'}${!allSame(key) ? ' compare-card__row--diff' : ''}`}>
                  <div className="compare-card__label">{key}</div>
                  <div className={`compare-card__values compare-card__values--${products.length}`}>
                    {products.map((prod) => (
                      <div key={prod.id} className="compare-card__value">
                        {renderValue(specsData[prod.id]?.[key])}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
