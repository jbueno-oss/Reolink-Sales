import { useState, useCallback, useRef, useEffect } from 'react';
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

export default function PdfViewerModal({ pdfUrl, onClose }: PdfViewerModalProps) {
  const [numPages, setNumPages] = useState<number>();
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [containerWidth, setContainerWidth] = useState<number>();

  const bodyRef = useRef<HTMLDivElement>(null);
  const pinchRef = useRef<{ startDist: number; startScale: number } | null>(null);

  const onWrapperRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainerWidth(node.getBoundingClientRect().width);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const clampScale = (s: number) => Math.min(Math.max(s, 0.5), 3);

  const handleZoomIn = () => setScale((prev) => clampScale(prev + 0.2));
  const handleZoomOut = () => setScale((prev) => clampScale(prev - 0.2));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Pinch-to-zoom touch handlers
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        pinchRef.current = {
          startDist: getDistance(e.touches),
          startScale: scale,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        const currentDist = getDistance(e.touches);
        const ratio = currentDist / pinchRef.current.startDist;
        const newScale = clampScale(pinchRef.current.startScale * ratio);
        setScale(newScale);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        pinchRef.current = null;
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [scale]);

  return (
    <div className="pdf-modal">
      <div className="pdf-modal__header">
        <h3 className="pdf-modal__title">Full Specifications</h3>
        <div className="pdf-modal__actions">
          {/* Zoom Out */}
          <button className="pdf-modal__btn" onClick={handleZoomOut} aria-label="Zoom Out">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>

          {/* Zoom In */}
          <button className="pdf-modal__btn" onClick={handleZoomIn} aria-label="Zoom In">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>

          {/* Rotate */}
          <button className="pdf-modal__btn" onClick={handleRotate} aria-label="Rotate">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </button>

          {/* Download */}
          <a href={pdfUrl} download="Reolink_Specs.pdf" className="pdf-modal__btn pdf-modal__download" aria-label="Download PDF">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>

          {/* Close */}
          <button className="pdf-modal__btn pdf-modal__close" onClick={onClose} aria-label="Close PDF">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <div
        className="pdf-modal__body"
        ref={(node) => { bodyRef.current = node; onWrapperRef(node); }}
        style={{ touchAction: 'pan-x pan-y' }}
      >
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="pdf-document">
          {Array.from(new Array(numPages || 0), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              width={containerWidth ? Math.min(containerWidth - 40, 800) : undefined}
              rotate={rotation}
              className="pdf-page"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
