import { useState, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import logo from './assets/Logo Reolink.svg';
import placeholderPdf from './assets/58.03.001.0983-Go PT Pus-QSG-EN-澳规-2025-0925.pdf';
import PdfViewerModal from './components/PdfViewerModal';

/* ─── Types ─── */
export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
}

interface Slide {
  /** 'image' renders a static image; 'video' renders a looping ken-burns animation as a video placeholder */
  type: 'image' | 'video';
  media: string;
  title: string;
  description: string;
}

/* ─── Slide Data Per Product ─── */
function getSlidesForProduct(product: Product): Slide[] {
  const base: Record<number, Slide[]> = {
    1: [ // Argus 4 Pro
      {
        type: 'image',
        media: product.image,
        title: 'Meet the Argus 4 Pro',
        description: 'A powerful wire-free security camera with 4K resolution, color night vision, and smart detection — designed for every corner of your home.',
      },
      {
        type: 'video',
        media: '/images/slide-night-vision.png',
        title: '4K Color Night Vision',
        description: 'See vivid color detail even in complete darkness. Advanced infrared LEDs provide up to 33ft of clear night visibility without any ambient light.',
      },
      {
        type: 'image',
        media: '/images/slide-solar-power.png',
        title: 'Solar-Powered Freedom',
        description: 'Pair with the Reolink Solar Panel for non-stop power. Zero wires, zero electricity bills — just reliable 24/7 surveillance.',
      },
      {
        type: 'video',
        media: '/images/slide-smart-app.png',
        title: 'Smart Alerts & App Control',
        description: 'Get instant push notifications for person, vehicle, and pet detection. View live feeds and playback from anywhere with the Reolink App.',
      },
      {
        type: 'image',
        media: '/images/slide-weatherproof.png',
        title: 'Built to Endure',
        description: 'IP65 weatherproof rating means rain, snow, or heat — the Argus 4 Pro keeps watching. Operates flawlessly from -10°C to 55°C.',
      },
    ],
    2: [ // Go Ranger PT
      {
        type: 'image',
        media: product.image,
        title: 'Meet the Go Ranger PT',
        description: 'A rugged 4G LTE pan-tilt camera built for off-grid locations. No Wi-Fi needed — perfect for farms, cabins, and remote properties.',
      },
      {
        type: 'video',
        media: '/images/slide-wide-angle.png',
        title: '355° Pan & 140° Tilt',
        description: 'Cover every angle with motorized pan-tilt controls. Remotely adjust the camera view from your phone to follow activity in real time.',
      },
      {
        type: 'image',
        media: '/images/slide-solar-power.png',
        title: '4G LTE Connectivity',
        description: 'Works anywhere with cellular coverage. Insert a SIM card and get reliable video streaming without Wi-Fi infrastructure.',
      },
      {
        type: 'video',
        media: '/images/slide-night-vision.png',
        title: 'Starlight Night Vision',
        description: 'Advanced starlight sensor captures full-color footage in low light conditions. See faces, license plates, and details after dark.',
      },
      {
        type: 'image',
        media: '/images/slide-weatherproof.png',
        title: 'Rechargeable Battery',
        description: 'Built-in 10400mAh battery lasts weeks on a single charge. Pair with solar panel for unlimited runtime in any location.',
      },
    ],
    3: [ // OMVI 3i PoE
      {
        type: 'image',
        media: product.image,
        title: 'Meet the OMVI 3i PoE',
        description: 'A compact PoE dome camera with 8MP resolution and AI-powered analytics. Plug in one cable for both power and data.',
      },
      {
        type: 'video',
        media: '/images/slide-smart-app.png',
        title: 'AI-Powered Detection',
        description: 'Smart algorithms distinguish between people, vehicles, and animals. Reduce false alarms by up to 95% with precision motion zones.',
      },
      {
        type: 'image',
        media: '/images/slide-wide-angle.png',
        title: '8MP Super HD',
        description: 'Capture razor-sharp 3840×2160 footage. Zoom in on details like faces and license plates without losing clarity.',
      },
      {
        type: 'video',
        media: '/images/slide-night-vision.png',
        title: 'IR Night Vision',
        description: 'Powerful infrared LEDs illuminate up to 30 meters in total darkness. See clearly 24/7 without any external lighting.',
      },
      {
        type: 'image',
        media: '/images/slide-weatherproof.png',
        title: 'Easy PoE Install',
        description: 'Single ethernet cable provides power and data. No separate power adapter needed — clean installation in minutes.',
      },
    ],
    4: [ // Reolink E1 Pro
      {
        type: 'image',
        media: product.image,
        title: 'Meet the Reolink E1 Pro',
        description: 'A smart indoor pan-tilt camera with 4MP Super HD. Monitor your home, pets, and family with crystal-clear two-way audio.',
      },
      {
        type: 'video',
        media: '/images/slide-wide-angle.png',
        title: '360° Coverage',
        description: 'Pan 355° and tilt 50° to monitor every corner of the room. Set up to 8 preset positions for one-tap viewing.',
      },
      {
        type: 'image',
        media: '/images/slide-smart-app.png',
        title: 'Two-Way Audio',
        description: 'Built-in microphone and speaker let you talk to family, calm your pet, or warn intruders — all from the Reolink App.',
      },
      {
        type: 'video',
        media: '/images/slide-night-vision.png',
        title: 'Smart Tracking',
        description: 'Auto-tracking follows moving objects across the room. Never miss a moment with intelligent motion-following technology.',
      },
      {
        type: 'image',
        media: '/images/slide-solar-power.png',
        title: 'Privacy Mode',
        description: 'One tap to physically hide the lens behind the camera body. Ensure your privacy whenever you\'re home — no software tricks.',
      },
    ],
    5: [ // Reolink Duo 3 PoE
      {
        type: 'image',
        media: product.image,
        title: 'Meet the Reolink Duo 3 PoE',
        description: 'Dual-lens panoramic camera with 16MP resolution. Two lenses stitch together for an ultra-wide 180° field of view.',
      },
      {
        type: 'video',
        media: '/images/slide-wide-angle.png',
        title: '180° Panoramic View',
        description: 'Two lenses work in tandem to eliminate blind spots. Cover an entire driveway, yard, or storefront with a single camera.',
      },
      {
        type: 'image',
        media: '/images/slide-night-vision.png',
        title: '16MP Ultra HD',
        description: 'Industry-leading dual 8MP sensors deliver 4920×1920 panoramic footage. Every pixel counts when security matters most.',
      },
      {
        type: 'video',
        media: '/images/slide-smart-app.png',
        title: 'Smart Detection Zones',
        description: 'Draw custom detection zones across the wide view. Get alerts only for the areas that matter — ignore trees, traffic, and shadows.',
      },
      {
        type: 'image',
        media: '/images/slide-weatherproof.png',
        title: 'Color Night Vision',
        description: 'Dual spotlights activate on motion for full-color recording at night. See exactly who\'s there in vivid detail, day or night.',
      },
    ],
    6: [ // Reolink E1 Pro (second)
      {
        type: 'image',
        media: '/images/argus4pro.png',
        title: 'Reolink E1 Pro',
        description: 'The perfect indoor companion — compact, quiet, and always watching. Set it on a shelf or mount it on the ceiling.',
      },
      {
        type: 'video',
        media: '/images/slide-smart-app.png',
        title: 'Baby & Pet Monitor',
        description: 'Use as a dedicated baby or pet cam. Get motion and sound alerts, watch live feeds, and speak through the built-in speaker.',
      },
      {
        type: 'image',
        media: '/images/slide-wide-angle.png',
        title: 'Dual-Band Wi-Fi',
        description: 'Connects on both 2.4GHz and 5GHz bands for reliable, lag-free streaming. Enjoy smooth 4MP live view from anywhere.',
      },
      {
        type: 'video',
        media: '/images/slide-night-vision.png',
        title: 'Night Vision',
        description: 'Infrared LEDs provide clear vision up to 12 meters in the dark. Monitor bedrooms and nurseries without disturbing anyone.',
      },
      {
        type: 'image',
        media: '/images/slide-solar-power.png',
        title: 'MicroSD & Cloud Storage',
        description: 'Record locally to a microSD card (up to 128GB) or use Reolink Cloud for secure off-site backup. Your footage, your choice.',
      },
    ],
  };

  return base[product.id] || base[1];
}

/* ─── Video Placeholder Component ─── */
function VideoPlaceholder({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="slide-video-wrapper">
      <img src={src} alt={alt} className="slide-video-placeholder" />
      <div className="slide-video-play-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
        <span>Auto-playing</span>
      </div>
    </div>
  );
}

/* ─── Swiper Component ─── */
function Swiper({
  slides,
  currentIndex,
  onIndexChange,
}: {
  slides: Slide[];
  currentIndex: number;
  onIndexChange: (i: number) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      onIndexChange(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onIndexChange]);

  useEffect(() => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== currentIndex) {
      emblaApi.scrollTo(currentIndex);
    }
  }, [emblaApi, currentIndex]);

  return (
    <div className="swiper" ref={emblaRef}>
      <div className="swiper__track">
        {slides.map((slide, i) => (
          <div className="swiper__slide" key={i}>
            <div className={`swiper__slide-inner ${i === currentIndex ? 'swiper__slide-inner--active' : ''}`}>
              <div className="slide-media">
                {slide.type === 'video' ? (
                  <VideoPlaceholder src={slide.media} alt={slide.title} />
                ) : (
                  <img src={slide.media} alt={slide.title} className="slide-image" />
                )}
              </div>
              <div className="slide-content">
                <h2 className="slide-content__title">{slide.title}</h2>
                <p className="slide-content__description">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Specs Table Component ─── */
import { specsData } from './data/specs';

function SpecsTable({ product }: { product: Product }) {
  const specs = specsData[product.id];
  
  if (!specs) {
    return (
      <div className="specs-table-container">
        <p className="specs-empty">Specifications not available for this product.</p>
      </div>
    );
  }

  return (
    <div className="specs-table-container">
      <h3 className="specs-table-title">Technical Specifications</h3>
      <table className="specs-table">
        <tbody>
          {Object.entries(specs).map(([key, value]) => {
            return (
              <tr key={key}>
                <td className="specs-table__label">{key}</td>
                <td className="specs-table__value">
                  {typeof value === 'boolean' ? (
                    value ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0050e2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    )
                  ) : (
                    value
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main ProductDetail Component ─── */
export default function ProductDetail({
  product,
  onBack,
  onHome,
}: {
  product: Product;
  onBack?: () => void;
  onHome?: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = getSlidesForProduct(product);

  const [showFooter, setShowFooter] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowFooter(true);
        } else {
          setShowFooter(false);
        }
      },
      { threshold: 0.1 }
    );
    
    if (specsRef.current) {
      observer.observe(specsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="product-detail">
      {/* Header */}
      <header className="detail-header">
        {onBack && (
          <button
            type="button"
            className="detail-header__back-btn"
            onClick={onBack}
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        )}
        <img src={logo} alt="Reolink" className="header__logo" />
        <button
          type="button"
          className="detail-header__home-btn"
          onClick={onHome || onBack}
          aria-label="Go to home"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
      </header>

      {/* Slider area */}
      <div className="detail-body">
        <div className="detail-slider-area">
          <Swiper
            slides={slides}
            currentIndex={currentSlide}
            onIndexChange={setCurrentSlide}
          />

          {/* Pagination dots */}
          <div className="pagination">
            <div className="pagination__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pagination__dot ${i === currentSlide ? 'pagination__dot--active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <p className="pagination__hint">Scroll to see more info</p>
          </div>
        </div>

        {/* Specs Table Section */}
        <div className="specs-section" ref={specsRef}>
          <SpecsTable product={product} />
        </div>
      </div>

      {/* Slide-up Footer */}
      <div className={`detail-footer ${showFooter ? 'detail-footer--visible' : ''}`}>
        <button className="detail-footer__btn" onClick={() => setShowPdf(true)}>
          View Full Specs PDF
        </button>
      </div>

      {/* PDF Viewer Modal */}
      {showPdf && (
        <PdfViewerModal pdfUrl={placeholderPdf} onClose={() => setShowPdf(false)} />
      )}
    </div>
  );
}
