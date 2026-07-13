import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerModalProps {
  pdfUrl: string;
  onClose: () => void;
}

function getDistance(touches: TouchList): number {
  const [t1, t2] = [touches[0], touches[1]];
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

function getMidpoint(touches: TouchList) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  };
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 4;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function PdfViewerModal({ pdfUrl, onClose }: PdfViewerModalProps) {
  const [numPages, setNumPages] = useState<number>();
  // committedScale: the scale used to render the PDF pages (only updated on pinch end)
  const [committedScale, setCommittedScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [containerWidth, setContainerWidth] = useState<number>();

  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Live pinch state stored in refs — no re-renders during gesture
  const pinch = useRef<{
    startDist: number;
    startScale: number;
    liveScale: number;
  } | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Measure container width for page rendering
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerWidth(el.getBoundingClientRect().width);
    });
    ro.observe(el);
    setContainerWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Pinch-to-zoom — CSS transform during gesture, re-render on end
  useEffect(() => {
    const el = bodyRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        pinch.current = {
          startDist: getDistance(e.touches),
          startScale: committedScale,
          liveScale: committedScale,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinch.current) {
        e.preventDefault();
        const dist = getDistance(e.touches);
        const ratio = dist / pinch.current.startDist;
        const newScale = clamp(pinch.current.startScale * ratio, MIN_SCALE, MAX_SCALE);
        pinch.current.liveScale = newScale;

        // Apply CSS transform instantly — no React re-render
        inner.style.transform = `scale(${newScale})`;
        inner.style.transformOrigin = 'top center';

        // Adjust scroll so the pinch midpoint stays in view
        const mid = getMidpoint(e.touches);
        const rect = el.getBoundingClientRect();
        const relX = mid.x - rect.left + el.scrollLeft;
        const relY = mid.y - rect.top + el.scrollTop;
        const scaleDelta = newScale / (pinch.current.liveScale || newScale);
        el.scrollLeft = relX * scaleDelta - (mid.x - rect.left);
        el.scrollTop = relY * scaleDelta - (mid.y - rect.top);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2 && pinch.current) {
        const finalScale = pinch.current.liveScale;
        pinch.current = null;

        // Reset CSS transform and let React re-render with new scale prop
        inner.style.transform = '';
        inner.style.transformOrigin = '';
        setCommittedScale(finalScale);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [committedScale]);

  const handleZoomIn = () => setCommittedScale((p) => clamp(p + 0.25, MIN_SCALE, MAX_SCALE));
  const handleZoomOut = () => setCommittedScale((p) => clamp(p - 0.25, MIN_SCALE, MAX_SCALE));
  const handleRotate = () => setRotation((p) => (p + 90) % 360);

  // Base width for rendering each page (unscaled — CSS transform handles live zoom)
  const pageWidth = containerWidth ? Math.min(containerWidth - 40, 800) : undefined;

  return (
    <div className="pdf-modal">
      <div className="pdf-modal__header">
        <h3 className="pdf-modal__title">Full Specifications</h3>
        <div className="pdf-modal__actions">
          {/* Zoom Out */}
          <button className="pdf-modal__btn" onClick={handleZoomOut} aria-label="Zoom Out">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          {/* Zoom In */}
          <button className="pdf-modal__btn" onClick={handleZoomIn} aria-label="Zoom In">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          {/* Rotate */}
          <button className="pdf-modal__btn" onClick={handleRotate} aria-label="Rotate">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
            </svg>
          </button>

          {/* Download */}
          <a href={pdfUrl} download="Reolink_Specs.pdf" className="pdf-modal__btn pdf-modal__download" aria-label="Download PDF">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          {/* Close */}
          <button className="pdf-modal__btn pdf-modal__close" onClick={onClose} aria-label="Close PDF">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable viewport — pan in all directions when zoomed */}
      <div
        className="pdf-modal__body"
        ref={bodyRef}
        style={{ touchAction: 'pan-x pan-y' }}
      >
        {/* Inner wrapper — CSS transform applied here during pinch gesture */}
        <div ref={innerRef} className="pdf-modal__inner">
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="pdf-document">
            {Array.from(new Array(numPages || 0), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={committedScale}
                width={pageWidth}
                rotate={rotation}
                className="pdf-page"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
