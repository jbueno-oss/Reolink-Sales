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
  const isAnimating = useRef(false);

  // 1-based index (0 is clone of last, length+1 is clone of first)
  const [internalIndex, setInternalIndex] = useState(currentIndex + 1);
  const [withTransition, setWithTransition] = useState(true);

  // Sync with parent (pagination dots)
  useEffect(() => {
    if (!isAnimating.current) {
      setWithTransition(true);
      setInternalIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isAnimating.current) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    deltaX.current = 0;
    isDragging.current = true;
    isHorizontalSwipe.current = null;
    setWithTransition(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
      }
      return;
    }

    if (!isHorizontalSwipe.current) return;
    e.preventDefault();
    deltaX.current = dx;

    if (trackRef.current) {
      const offset = -internalIndex * 100 + (dx / window.innerWidth) * 100;
      trackRef.current.style.transform = `translateX(${offset}%)`;
    }
  }, [internalIndex]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    isHorizontalSwipe.current = null;
    setWithTransition(true);

    const threshold = 50;
    if (deltaX.current < -threshold) {
      isAnimating.current = true;
      setInternalIndex(prev => prev + 1);
    } else if (deltaX.current > threshold) {
      isAnimating.current = true;
      setInternalIndex(prev => prev - 1);
    } else {
      setInternalIndex(internalIndex);
    }
    
    // clear inline style so React state takes over
    if (trackRef.current) {
      trackRef.current.style.transform = '';
    }
    deltaX.current = 0;
  }, [internalIndex]);

  const handleTransitionEnd = () => {
    isAnimating.current = false;
    if (internalIndex === 0) {
      setWithTransition(false);
      setInternalIndex(slides.length);
      onIndexChange(slides.length - 1);
    } else if (internalIndex === slides.length + 1) {
      setWithTransition(false);
      setInternalIndex(1);
      onIndexChange(0);
    } else {
      onIndexChange(internalIndex - 1);
    }
  };

  const renderedSlides = [
    slides[slides.length - 1], // Clone last
    ...slides,
    slides[0], // Clone first
  ];

  return (
    <div
      className="swiper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="swiper__track" 
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${internalIndex * 100}%)`,
          transition: withTransition ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
        }}
      >
        {renderedSlides.map((slide, i) => (
          <div 
            className={`swiper__slide ${i === internalIndex ? 'swiper__slide--active' : ''}`} 
            key={i}
          >
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
        ))}
      </div>
    </div>
  );
}

/* ─── Accordion Data Per Product ─── */
interface AccordionItem {
  label: string;
  value: string;
}

interface AccordionData {
  specs: AccordionItem[];
  packContent: AccordionItem[];
  installation: AccordionItem[];
}

function getAccordionData(product: Product): AccordionData {
  const data: Record<number, AccordionData> = {
    1: { // Argus 4 Pro
      specs: [
        { label: 'Resolution', value: '4K 8MP (3840 × 2160)' },
        { label: 'Image Sensor', value: '1/3" CMOS Sensor' },
        { label: 'Night Vision', value: 'Color Night Vision up to 33ft' },
        { label: 'Connectivity', value: 'Dual-Band Wi-Fi (2.4/5 GHz)' },
        { label: 'Storage', value: 'MicroSD (up to 128GB)' },
        { label: 'Battery', value: 'Rechargeable 6500mAh' },
        { label: 'Weather Rating', value: 'IP65 Weatherproof' },
      ],
      packContent: [
        { label: 'Camera', value: '1 × Argus 4 Pro Camera' },
        { label: 'Mounting Kit', value: 'Wall mount + screw pack' },
        { label: 'Power Cable', value: 'USB-C charging cable (2m)' },
        { label: 'Quick Start Guide', value: 'Setup instructions & QR code' },
        { label: 'Surveillance Sticker', value: '1 × Security sign sticker' },
      ],
      installation: [
        { label: 'Step 1', value: 'Download the Reolink App and create an account' },
        { label: 'Step 2', value: 'Scan the QR code on the camera to pair' },
        { label: 'Step 3', value: 'Choose a mounting location and attach the bracket' },
        { label: 'Step 4', value: 'Snap the camera onto the mount and adjust angle' },
      ],
    },
    2: { // Go Ranger PT
      specs: [
        { label: 'Resolution', value: '4K 8MP (3840 × 2160)' },
        { label: 'Pan & Tilt', value: '355° Pan / 140° Tilt' },
        { label: 'Connectivity', value: '4G LTE (SIM card required)' },
        { label: 'Night Vision', value: 'Starlight Color Night Vision' },
        { label: 'Battery', value: 'Rechargeable 10400mAh' },
        { label: 'Storage', value: 'MicroSD (up to 128GB)' },
        { label: 'Smart Detection', value: 'Person / Vehicle / Animal' },
      ],
      packContent: [
        { label: 'Camera', value: '1 × Go Ranger PT Camera' },
        { label: 'Antenna', value: '1 × 4G LTE Antenna' },
        { label: 'Mounting Kit', value: 'Wall mount + screw pack' },
        { label: 'Power Cable', value: 'USB-C charging cable' },
        { label: 'Quick Start Guide', value: 'Setup instructions & QR code' },
      ],
      installation: [
        { label: 'Step 1', value: 'Insert a nano SIM card with a data plan' },
        { label: 'Step 2', value: 'Download the Reolink App and scan the QR code' },
        { label: 'Step 3', value: 'Mount the camera on a wall or pole' },
        { label: 'Step 4', value: 'Attach the antenna and power on' },
      ],
    },
    3: { // OMVI 3i PoE
      specs: [
        { label: 'Resolution', value: '4K 8MP (3840 × 2160)' },
        { label: 'Connection', value: 'PoE (IEEE 802.3af)' },
        { label: 'Night Vision', value: 'IR Night Vision up to 30m' },
        { label: 'Detection', value: 'AI Person / Vehicle Detection' },
        { label: 'Vandal Proof', value: 'IK10 Impact Resistant' },
        { label: 'Weather Rating', value: 'IP66 Weatherproof' },
        { label: 'Storage', value: 'MicroSD / NVR / FTP' },
      ],
      packContent: [
        { label: 'Camera', value: '1 × OMVI 3i PoE Dome Camera' },
        { label: 'Ethernet Cable', value: '1 × 1m Cat5e cable' },
        { label: 'Mounting Kit', value: 'Ceiling/Wall mount + screws' },
        { label: 'Waterproof Cap', value: '1 × RJ45 waterproof connector' },
        { label: 'Quick Start Guide', value: 'Setup instructions' },
      ],
      installation: [
        { label: 'Step 1', value: 'Connect Ethernet cable from PoE switch to camera' },
        { label: 'Step 2', value: 'Download Reolink App and add device by scanning' },
        { label: 'Step 3', value: 'Mount the dome camera on ceiling or wall' },
        { label: 'Step 4', value: 'Adjust the lens angle and tighten the housing' },
      ],
    },
  };

  return data[product.id] || data[1];
}

/* ─── Accordion Icons ─── */
function SpecsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function PackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function InstallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

/* ─── Arrow SVG ─── */
function ArrowDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`accordion__arrow ${open ? 'accordion__arrow--open' : ''}`}
      viewBox="0 0 15 10"
      fill="none"
    >
      <path d="M1 1L7.5 8L14 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Accordion Component ─── */
function Accordion({
  icon,
  title,
  items,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  items: AccordionItem[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      <button
        className="accordion__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="accordion__icon">{icon}</div>
        <span className="accordion__title">{title}</span>
        <ArrowDown open={open} />
      </button>
      <div className={`accordion__content ${open ? 'accordion__content--open' : ''}`}>
        <div className="accordion__body">
          {items.map((item, i) => (
            <div key={i} className="accordion__item">
              <p className="accordion__item-label">{item.label}</p>
              <p className="accordion__item-value">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
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
  const accordionData = getAccordionData(product);

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

        {/* Accordion Section */}
        <div className="accordion-section">
          <Accordion
            icon={<SpecsIcon />}
            title="Specs"
            items={accordionData.specs}
            defaultOpen={false}
          />
          <Accordion
            icon={<PackIcon />}
            title="Pack Content"
            items={accordionData.packContent}
          />
          <Accordion
            icon={<InstallIcon />}
            title="Installation"
            items={accordionData.installation}
          />
        </div>
      </div>
    </div>
  );
}
