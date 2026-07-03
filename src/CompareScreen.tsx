import logo from './assets/Logo Reolink.svg';
import type { Product } from './ProductDetail';
import { specsData } from './data/specs';

interface CompareScreenProps {
  products: Product[];
  onBack: () => void;
  onHome: () => void;
}

export default function CompareScreen({ products, onBack, onHome }: CompareScreenProps) {
  const specKeys = Object.keys(specsData[1] || {});

  const renderValue = (value: string | boolean | undefined) => {
    if (value === undefined) return <span className="compare-no">-</span>;
    if (typeof value === 'boolean') {
      return value ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0050e2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      );
    }
    return value;
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

      <div className="compare-table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="compare-table__feature-header">Feature</th>
              {products.map((prod) => (
                <th key={prod.id} className="compare-table__product-header">
                  <div className="compare-table__product-thumb">
                    <img src={prod.image} alt={prod.name} />
                  </div>
                  <span>{prod.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specKeys.map((key) => (
              <tr key={key}>
                <td className="compare-table__label">{key}</td>
                {products.map((prod) => (
                  <td key={prod.id}>{renderValue(specsData[prod.id]?.[key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
