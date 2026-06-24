import { useState, useRef, useCallback, useEffect } from 'react';
import logo from './assets/Logo Reolink.svg';

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
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const isDragging = useRef(false);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    deltaX.current = 0;
    isDragging.current = true;
    isHorizontalSwipe.current = null;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;

      const dx = e.touches[0].clientX - startX.current;
      const dy = e.touches[0].clientY - startY.current;

      // Determine swipe direction on first significant move
      if (isHorizontalSwipe.current === null) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
        }
        return;
      }

      // If vertical swipe, let the page scroll
      if (!isHorizontalSwipe.current) return;

      e.preventDefault();
      deltaX.current = dx;

      if (trackRef.current) {
        const offset = -currentIndex * 100 + (dx / window.innerWidth) * 100;
        trackRef.current.style.transform = `translateX(${offset}%)`;
      }
    },
    [currentIndex]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    isHorizontalSwipe.current = null;

    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    }

    const threshold = 50;
    if (deltaX.current < -threshold && currentIndex < slides.length - 1) {
      onIndexChange(currentIndex + 1);
    } else if (deltaX.current > threshold && currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else {
      // snap back
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }
    deltaX.current = 0;
  }, [currentIndex, slides.length, onIndexChange]);

  // Update transform when currentIndex changes
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div
      className="swiper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="swiper__track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div className="swiper__slide" key={i}>
            <div className="slide-media">
              {slide.type === 'video' ? (
                <VideoPlaceholder src={slide.media} alt={slide.title} />
              ) : (
                <img
                  src={slide.media}
                  alt={slide.title}
                  className="slide-image"
                />
              )}
            </div>
            <div className="slide-content">
              <h2 className="slide-content__title">{slide.title}</h2>
              <p className="slide-content__description">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main ProductDetail Component ─── */
export default function ProductDetail({
  product,
  onBack,
}: {
  product: Product;
  onBack: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = getSlidesForProduct(product);

  return (
    <div className="product-detail">
      {/* Header */}
      <header className="detail-header">
        <img src={logo} alt="Reolink" className="header__logo" />
        <button
          type="button"
          className="detail-header__home-btn"
          onClick={onBack}
          aria-label="Go to home"
        >
          <img src="/images/home-icon.svg" alt="Home" className="detail-header__home-icon" />
        </button>
      </header>

      {/* Slider area */}
      <div className="detail-body">
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
          <p className="pagination__hint">Swipe to explore features →</p>
        </div>
      </div>
    </div>
  );
}
