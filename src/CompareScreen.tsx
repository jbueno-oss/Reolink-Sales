import logo from './assets/Logo Reolink.svg';
import type { Product } from './ProductDetail';

interface CompareScreenProps {
  products: Product[];
  onBack: () => void;
  onHome: () => void;
}

export default function CompareScreen({ products, onBack, onHome }: CompareScreenProps) {
  // Mock features based on product index to simulate comparison
  const mockFeatures = {
    resolution: ['4K 8MP', '2K 4MP', '1080P'],
    nightVision: ['Color (33ft)', 'Starlight', 'IR (30m)'],
    connectivity: ['Wi-Fi', '4G LTE', 'PoE'],
    panTilt: [false, true, false],
    solar: [true, true, false],
    smartDetection: [true, true, true],
    dualLens: [true, false, false],
    vandalProof: [false, false, true],
    weather: ['IP65', 'IP65', 'IP66'],
    storage: ['MicroSD', 'MicroSD', 'MicroSD / NVR'],
  };

  const getFeature = (featureArray: any[], index: number) => {
    return featureArray[index % featureArray.length];
  };

  const renderCheck = (value: boolean) => {
    return value ? <span className="compare-yes">✓</span> : <span className="compare-no">✗</span>;
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
            <tr>
              <td className="compare-table__label">Resolution</td>
              {products.map((_, idx) => <td key={idx}>{getFeature(mockFeatures.resolution, idx)}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Night Vision</td>
              {products.map((_, idx) => <td key={idx}>{getFeature(mockFeatures.nightVision, idx)}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Connectivity</td>
              {products.map((_, idx) => <td key={idx}>{getFeature(mockFeatures.connectivity, idx)}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Pan & Tilt</td>
              {products.map((_, idx) => <td key={idx}>{renderCheck(getFeature(mockFeatures.panTilt, idx))}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Solar Power</td>
              {products.map((_, idx) => <td key={idx}>{renderCheck(getFeature(mockFeatures.solar, idx))}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Smart Detection</td>
              {products.map((_, idx) => <td key={idx}>{renderCheck(getFeature(mockFeatures.smartDetection, idx))}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Dual-Lens</td>
              {products.map((_, idx) => <td key={idx}>{renderCheck(getFeature(mockFeatures.dualLens, idx))}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Vandal Proof</td>
              {products.map((_, idx) => <td key={idx}>{renderCheck(getFeature(mockFeatures.vandalProof, idx))}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Weather Rating</td>
              {products.map((_, idx) => <td key={idx}>{getFeature(mockFeatures.weather, idx)}</td>)}
            </tr>
            <tr>
              <td className="compare-table__label">Storage</td>
              {products.map((_, idx) => <td key={idx}>{getFeature(mockFeatures.storage, idx)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
