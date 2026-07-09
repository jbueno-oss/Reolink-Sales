import { useState, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import logo from './assets/Logo Reolink.svg';
import placeholderPdf from './assets/58.03.001.0983-Go PT Pus-QSG-EN-澳规-2025-0925.pdf';
import PdfViewerModal from './components/PdfViewerModal';
import { getAccordionData } from './data/accordionData';
import type { AccordionItem, SpecSection } from './data/accordionData';

/* ─── Types ─── */
export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  has2Pack?: boolean;
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
  return [
    {
      type: 'image',
      media: product.image,
      title: `Meet the ${product.name}`,
      description: `${product.has2Pack ? 'Available in Single and 2-Pack options. ' : ''}A powerful security solution designed for every corner of your home or business. Enjoy peace of mind with crystal-clear monitoring.`,
    },
    {
      type: 'video',
      media: '/images/slide-night-vision.png',
      title: 'Advanced Night Vision',
      description: 'See vivid detail even in complete darkness. Advanced sensors provide clear night visibility without any ambient light.',
    },
    {
      type: 'image',
      media: '/images/slide-weatherproof.png',
      title: 'Built to Endure',
      description: 'Weatherproof design means rain, snow, or heat — your Reolink camera keeps watching without missing a beat.',
    },
    {
      type: 'video',
      media: '/images/slide-smart-app.png',
      title: 'Smart Alerts & App Control',
      description: 'Get instant push notifications for motion detection. View live feeds and playback from anywhere with the Reolink App.',
    },
    {
      type: 'image',
      media: '/images/slide-wide-angle.png',
      title: 'Wide Angle Coverage',
      description: 'Cover every angle with advanced lens technology. Never miss a detail of what matters most in your property.',
    }
  ];
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
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
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
  items: AccordionItem[] | SpecSection[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const isSpecSection = (items: AccordionItem[] | SpecSection[]): items is SpecSection[] => {
    return items.length > 0 && 'category' in items[0];
  };

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
          {isSpecSection(items) ? (
            items.map((section, idx) => (
              <div key={idx} className="accordion__section">
                <h4 className="accordion__section-title">{section.category}</h4>
                {section.items.map((item, i) => (
                  <div key={i} className="accordion__item">
                    <p className="accordion__item-label">{item.label}</p>
                    <p className="accordion__item-value">{item.value}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            (items as AccordionItem[]).map((item, i) => (
              <div key={i} className="accordion__item">
                <p className="accordion__item-label">{item.label}</p>
                <p className="accordion__item-value">{item.value}</p>
              </div>
            ))
          )}
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

        {/* Accordion Section */}
        <div className="accordion-section" ref={specsRef}>
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
