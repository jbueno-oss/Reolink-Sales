import { useState, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import logo from './assets/Logo Reolink.svg';
import argus3ProKitPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/01 - Argus 3 Pro 4x Kit + Hub.pdf';
import argus4ProPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/02 - Argus 4 Pro Panoramic.pdf';
import argusPtUltraPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/03 - Argus PT Ultra.pdf';
import argus3ProStandalonePdf from './assets/Reolink_QSG_15_Products_Vercel_Names/04 - Argus 3 Pro Standalone.pdf';
import argusMagiCamPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/05 - Argus MagiCam Magnetic.pdf';
import argusSolarPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/06 - Argus Solar.pdf';
import smartVideoDoorbellPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/07 - Smart Video Doorbell.pdf';
import e1ZoomPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/08 - E1 Zoom Indoor 4K.pdf';
import eSeriesE321Pdf from './assets/Reolink_QSG_15_Products_Vercel_Names/09 - E Series E321 Indoor.pdf';
import eliteFloodlightPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/10 - Elite Floodlight WiFi.pdf';
import goPtPlusPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/11 - Go PT Plus 4G LTE.pdf';
import nvs88mb4Pdf from './assets/Reolink_QSG_15_Products_Vercel_Names/12 - NVS8 PoE Kit 8MB4.pdf';
import nvs88md4Pdf from './assets/Reolink_QSG_15_Products_Vercel_Names/13 - NVS8 PoE Kit 8MD4.pdf';
import nvs812md6Pdf from './assets/Reolink_QSG_15_Products_Vercel_Names/14 - NVS8 PoE Kit 12MD6.pdf';
import solarFloodlightPdf from './assets/Reolink_QSG_15_Products_Vercel_Names/15 - Solar Floodlight Cam F310B.pdf';
import argus3ProSlide1 from './assets/products/argus-3-pro/slide-1.png';
import argus3ProSlide2 from './assets/products/argus-3-pro/slide-2.png';
import argus3ProSlide3 from './assets/products/argus-3-pro/slide-3.png';
import argus3ProSlide4 from './assets/products/argus-3-pro/slide-4.png';
import argus3ProSlide5 from './assets/products/argus-3-pro/slide-5.png';
import homeHubMiniArgus3ProSlide1 from './assets/products/home-hub-mini-4x-argus-3-pro-solar-panel-lite/slide-1.png';
import homeHubMiniArgus3ProSlide2 from './assets/products/home-hub-mini-4x-argus-3-pro-solar-panel-lite/slide-2.png';
import homeHubMiniArgus3ProSlide3 from './assets/products/home-hub-mini-4x-argus-3-pro-solar-panel-lite/slide-3.png';
import homeHubMiniArgus3ProSlide4 from './assets/products/home-hub-mini-4x-argus-3-pro-solar-panel-lite/slide-4.png';
import homeHubMiniArgus3ProSlide5 from './assets/products/home-hub-mini-4x-argus-3-pro-solar-panel-lite/slide-5.png';
import argus4ProSlide1 from './assets/products/argus-4-pro-reolink-solar-panel-2/slide-1.png';
import argus4ProSlide2 from './assets/products/argus-4-pro-reolink-solar-panel-2/slide-2.png';
import argus4ProSlide3 from './assets/products/argus-4-pro-reolink-solar-panel-2/slide-3.png';
import argus4ProSlide4 from './assets/products/argus-4-pro-reolink-solar-panel-2/slide-4.png';
import argus4ProSlide5 from './assets/products/argus-4-pro-reolink-solar-panel-2/slide-5.png';
import argusPtUltraSlide1 from './assets/products/argus-pt-ultra-solar-panel/slide-1.png';
import argusPtUltraSlide2 from './assets/products/argus-pt-ultra-solar-panel/slide-2.png';
import argusPtUltraSlide3 from './assets/products/argus-pt-ultra-solar-panel/slide-3.png';
import argusPtUltraSlide4 from './assets/products/argus-pt-ultra-solar-panel/slide-4.png';
import argusPtUltraSlide5 from './assets/products/argus-pt-ultra-solar-panel/slide-5.png';
import argusSolarSlide1 from './assets/products/argus-solar/slide-1.png';
import argusSolarSlide2 from './assets/products/argus-solar/slide-2.png';
import argusSolarSlide3 from './assets/products/argus-solar/slide-3.png';
import argusSolarSlide4 from './assets/products/argus-solar/slide-4.png';
import argusSolarSlide5 from './assets/products/argus-solar/slide-5.png';
import argusMagiCamSlide1 from './assets/products/argus-magicam-magnetic/slide-1.png';
import argusMagiCamSlide2 from './assets/products/argus-magicam-magnetic/slide-2.png';
import argusMagiCamSlide3 from './assets/products/argus-magicam-magnetic/slide-3.png';
import argusMagiCamSlide4 from './assets/products/argus-magicam-magnetic/slide-4.png';
import argusMagiCamSlide5 from './assets/products/argus-magicam-magnetic/slide-5.png';
import smartVideoDoorbellSlide1 from './assets/products/smart-video-doorbell/slide-1.png';
import smartVideoDoorbellSlide2 from './assets/products/smart-video-doorbell/slide-2.png';
import smartVideoDoorbellSlide3 from './assets/products/smart-video-doorbell/slide-3.png';
import smartVideoDoorbellSlide4 from './assets/products/smart-video-doorbell/slide-4.png';
import smartVideoDoorbellSlide5 from './assets/products/smart-video-doorbell/slide-5.png';
import solarFloodlightCamSlide1 from './assets/products/solar-floodlight-cam-f310b/slide-1.png';
import solarFloodlightCamSlide2 from './assets/products/solar-floodlight-cam-f310b/slide-2.png';
import solarFloodlightCamSlide3 from './assets/products/solar-floodlight-cam-f310b/slide-3.png';
import solarFloodlightCamSlide4 from './assets/products/solar-floodlight-cam-f310b/slide-4.png';
import solarFloodlightCamSlide5 from './assets/products/solar-floodlight-cam-f310b/slide-5.png';
import e1ZoomSlide1 from './assets/products/e1-zoom-indoor-4k/slide-1.png';
import e1ZoomSlide2 from './assets/products/e1-zoom-indoor-4k/slide-2.png';
import e1ZoomSlide3 from './assets/products/e1-zoom-indoor-4k/slide-3.png';
import e1ZoomSlide4 from './assets/products/e1-zoom-indoor-4k/slide-4.png';
import e1ZoomSlide5 from './assets/products/e1-zoom-indoor-4k/slide-5.png';
import eliteFloodlightSlide1 from './assets/products/elite-floodlight-wifi/slide-1.png';
import eliteFloodlightSlide2 from './assets/products/elite-floodlight-wifi/slide-2.png';
import eliteFloodlightSlide3 from './assets/products/elite-floodlight-wifi/slide-3.png';
import eliteFloodlightSlide4 from './assets/products/elite-floodlight-wifi/slide-4.png';
import eliteFloodlightSlide5 from './assets/products/elite-floodlight-wifi/slide-5.png';
import goPtPlusSlide1 from './assets/products/go-pt-plus-4g-lte/slide-1.png';
import goPtPlusSlide2 from './assets/products/go-pt-plus-4g-lte/slide-2.png';
import goPtPlusSlide3 from './assets/products/go-pt-plus-4g-lte/slide-3.png';
import goPtPlusSlide4 from './assets/products/go-pt-plus-4g-lte/slide-4.png';
import goPtPlusSlide5 from './assets/products/go-pt-plus-4g-lte/slide-5.png';
import eSeriesE321Slide1 from './assets/products/e-series-e321/slide-1.png';
import eSeriesE321Slide2 from './assets/products/e-series-e321/slide-2.png';
import eSeriesE321Slide3 from './assets/products/e-series-e321/slide-3.png';
import eSeriesE321Slide4 from './assets/products/e-series-e321/slide-4.png';
import eSeriesE321Slide5 from './assets/products/e-series-e321/slide-5.png';
import nvs88mb4Slide1 from './assets/products/nvs8-8mb4/slide-1.png';
import nvs88mb4Slide2 from './assets/products/nvs8-8mb4/slide-2.png';
import nvs88mb4Slide3 from './assets/products/nvs8-8mb4/slide-3.png';
import nvs88mb4Slide4 from './assets/products/nvs8-8mb4/slide-4.png';
import nvs88mb4Slide5 from './assets/products/nvs8-8mb4/slide-5.png';
import nvs88md4Slide1 from './assets/products/nvs8-8md4/slide-1.png';
import nvs88md4Slide2 from './assets/products/nvs8-8md4/slide-2.png';
import nvs88md4Slide3 from './assets/products/nvs8-8md4/slide-3.png';
import nvs88md4Slide4 from './assets/products/nvs8-8md4/slide-4.png';
import nvs88md4Slide5 from './assets/products/nvs8-8md4/slide-5.png';
import nvs812md6Slide1 from './assets/products/nvs8-12md6/slide-1.png';
import nvs812md6Slide2 from './assets/products/nvs8-12md6/slide-2.png';
import nvs812md6Slide3 from './assets/products/nvs8-12md6/slide-3.png';
import nvs812md6Slide4 from './assets/products/nvs8-12md6/slide-4.png';
import nvs812md6Slide5 from './assets/products/nvs8-12md6/slide-5.png';
import PdfViewerModal from './components/PdfViewerModal';
import { getAccordionData } from './data/accordionData';
import type { AccordionItem, SpecSection, PackContentItem, InstallationStep } from './data/accordionData';

/* ─── Types ─── */
export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  has2Pack?: boolean;
  isKit?: boolean;
}

interface Slide {
  /** 'image' renders a static image; 'video' renders a looping ken-burns animation as a video placeholder */
  type: 'image' | 'video';
  media: string;
  title: string;
  description: string;
  objectPosition?: string;
}

const productPdfById: Record<number, string> = {
  1: argus3ProKitPdf,
  2: argus4ProPdf,
  4: argusPtUltraPdf,
  5: argus3ProStandalonePdf,
  6: argusMagiCamPdf,
  8: argusSolarPdf,
  9: smartVideoDoorbellPdf,
  10: e1ZoomPdf,
  11: eSeriesE321Pdf,
  12: eliteFloodlightPdf,
  13: goPtPlusPdf,
  14: nvs88mb4Pdf,
  15: nvs88md4Pdf,
  16: nvs812md6Pdf,
  17: solarFloodlightPdf,
};

function getPdfForProduct(product: Product): string {
  const pdf = productPdfById[product.id];
  if (!pdf) {
    throw new Error(`Missing specs PDF for product: ${product.name}`);
  }
  return pdf;
}

const argus3ProSlides: Slide[] = [
  {
    type: 'image',
    media: argus3ProSlide1,
    title: 'Complete Wire-Free Security',
    description: 'Install within Wi-Fi range, back up to HomeHub, and store recordings locally to prevent data loss.',
  },
  {
    type: 'image',
    media: argus3ProSlide2,
    title: 'Spotlight & Two-Way Audio',
    description: 'Protect day and night with a motion spotlight, two-way audio, and siren. Greet guests or deter intruders in full colour.',
  },
  {
    type: 'image',
    media: argus3ProSlide3,
    title: '5MP Super HD Resolution',
    description: 'Delivers exceptionally clear images and videos in 5MP Super HD, offering over 2.5X the clarity of 1080p HD in live streaming and playback.',
  },
  {
    type: 'image',
    media: argus3ProSlide4,
    title: 'Accurate Smart Security',
    description: 'Advanced algorithms accurately detect and alert you to human, vehicle and animal movement, while minimizing false alarms.',
  },
  {
    type: 'image',
    media: argus3ProSlide5,
    title: 'Real-Time Communication',
    description: 'Hear and talk with built-in two-way audio to communicate with your family or visitors.',
  },
];

const homeHubMiniArgus3ProSlides: Slide[] = [
  {
    type: 'image',
    media: homeHubMiniArgus3ProSlide1,
    title: 'Mount It Your Way',
    description: "The camera's battery power and integrated bracket enable truly wire-free, effortless installation, allowing you to secure it virtually anywhere using the Wall, Ceiling, or Strap Mounts.",
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: homeHubMiniArgus3ProSlide2,
    title: '5MP Super HD Resolution',
    description: 'Delivers exceptionally clear images and videos in 5MP Super HD, offering over 2.5X the clarity of 1080p HD in live streaming and playback.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: homeHubMiniArgus3ProSlide3,
    title: 'Focus only on what matters',
    description: 'This camera intelligently recognizes people, vehicles, and animals, sending you instant alerts for true threats while actively minimizing false alarms and unwanted notifications.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: homeHubMiniArgus3ProSlide4,
    title: 'Spotlight & Two-Way Audio',
    description: 'Protect day and night with a motion spotlight, two-way audio, and siren. Greet guests or deter intruders in full colour.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: homeHubMiniArgus3ProSlide5,
    title: 'Home Hub Local Protection',
    description: 'Install within Wi-Fi range for automatic recording to the Home Hub. Footage is secured separately from the camera - safe from theft or damage at the source.',
    objectPosition: 'top center',
  },
];

const argus4ProSlides: Slide[] = [
  {
    type: 'image',
    media: argus4ProSlide1,
    title: '4K UHD 180º Panoramic View',
    description: 'Seamlessly stitches two views into one, double field of view with one camera.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argus4ProSlide2,
    title: 'ColorX True Color Night Vision',
    description: "The F1.0 aperture and 1/1.8'' sensor capture vivid, full-color night vision without IR lights. ColorX technology boosts standby time by 30%, improves concealment, and reduces light pollution.",
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argus4ProSlide3,
    title: 'Turbocharge with Wi-Fi 6',
    description: 'Enjoy lightning-fast, stable, and secure Wi-Fi. Say goodbye to buffering and lag with dual-band support and WPA3 security.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argus4ProSlide4,
    title: 'All Inclusive Smart Detection',
    description: 'Maximize alert accuracy with dual PIR and AI Detects humans, vehicles, and pets while minimizing false alarms. No monthly fees.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argus4ProSlide5,
    title: 'Solar Powered',
    description: 'Eco-friendly and cost-effective solution for areas without electricity access.',
    objectPosition: 'top center',
  },
];

const argusPtUltraSlides: Slide[] = [
  {
    type: 'image',
    media: argusPtUltraSlide1,
    title: 'Pan/Tilt with Spotlights and Audio',
    description: 'A powerful wire-free security camera with 4K resolution, color night vision, and smart detection - designed for every corner of your home.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusPtUltraSlide2,
    title: 'Smart Detection & Tracking',
    description: 'Detects events that matter and alert you. Tracks moving objects to keep them in view, minimizing false alarms and notifications.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusPtUltraSlide3,
    title: 'Accurate Smart Security',
    description: 'Advanced algorithms accurately detect and alert you to human, vehicle and animal movement, while minimizing false alarms.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusPtUltraSlide4,
    title: '4K Colour Night Vision',
    description: 'Powerful motion-triggered spotlights to turn night into day, capturing vivid details in 4K Ultra HD at night.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusPtUltraSlide5,
    title: 'Flexible Solar Power',
    description: 'Mount the panel directly on the camera or separately using the extension cable to maximize sunlight exposure.',
    objectPosition: 'top center',
  },
];

const argusSolarSlides: Slide[] = [
  {
    type: 'image',
    media: argusSolarSlide1,
    title: 'Non-Stop Solar Power',
    description: 'Drop the constant charging cycle. High-efficiency SolarEase tech keeps your camera continuously powered even on cloudy or shaded days.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusSolarSlide2,
    title: 'Vibrant 3K Super HD',
    description: 'Never miss a critical detail. Sharp 5MP resolution captures flawless clarity across your entire yard, ensuring absolute visual certainty day or night.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusSolarSlide3,
    title: 'Active Deterrence',
    description: 'Stop intruders before they enter. Motion-activated spotlights and a powerful siren instantly trigger to protect your property and warn uninvited guests.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusSolarSlide4,
    title: 'Accurate Smart Detection',
    description: 'Eliminate annoying false alerts. Advanced intelligence instantly differentiates between people, vehicle, and animal so you only get notifications that matter.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusSolarSlide5,
    title: 'No Monthly Storage Fees',
    description: 'Keep your videos private and free. Secure local storage options deliver premium, intelligent security right out of the box with zero mandatory subscriptions.',
    objectPosition: 'top center',
  },
];

const argusMagiCamSlides: Slide[] = [
  {
    type: 'image',
    media: argusMagiCamSlide1,
    title: 'Magnetic Wire-Free Freedom',
    description: 'Installs instantly to fences, fridges, or RVs. Enjoy faster, more stable streaming thanks to Dual-Band 2.4/5GHz Wi-Fi. Connect directly to power for 24/7 recording.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusMagiCamSlide2,
    title: 'The Battery Cam That Goes the Distance',
    description: 'Stop the constant charging cycle. Powered by an ultra-efficient Qualcomm chip, this security camera is built for endurance, not downtime.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusMagiCamSlide3,
    title: 'Accurate Smart Security',
    description: 'Advanced algorithms accurately detect and alert you to human movement, while minimising false alarms.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusMagiCamSlide4,
    title: 'Real-Time Communication',
    description: 'Hear and talk with built-in two-way audio to communicate with your kids or pets.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: argusMagiCamSlide5,
    title: 'Wired Option',
    description: 'Camera can be connected directly to power for 24/7 recording with included USB-C cable.',
    objectPosition: 'top center',
  },
];

const smartVideoDoorbellSlides: Slide[] = [
  {
    type: 'image',
    media: smartVideoDoorbellSlide1,
    title: 'Head-to-Toe Doorstep Coverage',
    description: 'See the whole picture. An expanded 1:1 aspect ratio captures a top-to-bottom view, keeping both visitors\' faces and packages on the mat in full view.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: smartVideoDoorbellSlide2,
    title: 'Long-Lasting Wire-Free Power',
    description: 'Enjoy effortless security with up to 150 days of battery life on a single charge. Easy, wire-free setup installs anywhere on your porch in minutes.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: smartVideoDoorbellSlide3,
    title: 'Smart Person & Package Detection',
    description: 'Stop chasing false alarms. On-camera AI accurately identifies people, vehicles, and packages, notifying you only when actual activity happens at your door.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: smartVideoDoorbellSlide4,
    title: 'Instant Doorstep Communication',
    description: 'Answer your door from anywhere. Receive instant video calls, talk in real time with two-way audio, or send quick preset replies when your hands are full.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: smartVideoDoorbellSlide5,
    title: 'Zero Monthly Storage Fees',
    description: 'Store footage locally so your videos remain secure even if your network is down. Secure your data your way - Reolink Home Hub, NVR, FTP, or microSD card (up to 512GB), all with no monthly fees.',
    objectPosition: 'top center',
  },
];

const solarFloodlightSlides: Slide[] = [
  {
    type: 'image',
    media: solarFloodlightCamSlide1,
    title: 'Endless Solar Energy',
    description: 'Drop the constant battery charging cycle. High-efficiency solar power keeps your floodlight camera continuously powered through every season.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: solarFloodlightCamSlide2,
    title: '150° Ultra-Wide Coverage',
    description: 'See your entire yard on one screen. An ultra-wide 150° view captures expansive outdoor spaces, completely wiping out dark blind spots.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: solarFloodlightCamSlide3,
    title: 'Ultra-Bright 1000 Lumens',
    description: 'Drench dark corners in day-like light. Powerful motion-activated floodlights deliver 1000 lumens of brightness to expose and deter suspicious activity instantly.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: solarFloodlightCamSlide4,
    title: 'AI-Based Adaptive Floodlight Modes',
    description: 'Customise your response to flash for people/ vehicles but remain off for animals, providing intelligent, event-based maximum brightness.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: solarFloodlightCamSlide5,
    title: 'No Monthly Storage Fees',
    description: 'Take control of your data and your wallet. Choose between microSD card (Max. 512GB), NVR or Hub storage.',
    objectPosition: 'top center',
  },
];

const e1ZoomSlides: Slide[] = [
  {
    type: 'image',
    media: e1ZoomSlide1,
    title: 'Auto-Tracking Pan & Tilt',
    description: 'Eliminate blind spots completely. The camera automatically tracks motion around the room, keeping active kids or pets perfectly in frame as they move.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: e1ZoomSlide2,
    title: 'True 3x Optical Zoom',
    description: 'Magnify details without losing clarity. Bring distant objects up close with a powerful optical zoom that maintains pristine 4K resolution.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: e1ZoomSlide3,
    title: 'Next-Gen Wi-Fi 6 Speed',
    description: 'Experience lag-free viewing. Wi-Fi 6 connection delivers an ultra-stable, secure, and lightning-fast live feed with maximum indoor range.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: e1ZoomSlide4,
    title: 'Smart Family & Pet Detection',
    description: 'Receive alerts that actually matter. Advanced AI recognises people, pets, and baby cries, filtering out background noise to prevent false notifications.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: e1ZoomSlide5,
    title: 'No Monthly Storage Fees',
    description: 'Keep your videos private and free. Secure local storage options deliver premium, intelligent security right out of the box with zero mandatory subscriptions.',
    objectPosition: 'top center',
  },
];

const goPtPlusSlides: Slide[] = [
  {
    type: 'image',
    media: goPtPlusSlide1,
    title: 'True Off-Grid 4G LTE Freedom',
    description: 'Protect remote properties without Wi-Fi. Built-in 4G cellular connectivity lets you monitor job sites, cabins, or rural acreage anywhere with cell coverage.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: goPtPlusSlide2,
    title: '360° Coverage & Auto-Tracking',
    description: 'Never lose sight of a target. Smooth pan and tilt motorized control combines with intelligent auto-tracking to automatically follow movement across your land.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: goPtPlusSlide3,
    title: 'Smart AI Detection',
    description: 'Eliminate annoying false alerts. Advanced intelligence instantly differentiates between people, vehicle, and animal so you only get notifications that matter.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: goPtPlusSlide4,
    title: 'Never Lose Sight',
    description: 'Powerful motion-triggered spotlights to turn night into day, capturing vivid details in 3K Super HD at night.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: goPtPlusSlide5,
    title: 'Flexible Solar Power',
    description: 'Mount the panel directly on the camera or separately using the extension cable to maximize sunlight exposure.',
    objectPosition: 'top center',
  },
];

const eliteFloodlightSlides: Slide[] = [
  {
    type: 'image',
    media: eliteFloodlightSlide1,
    title: 'Seamless 180° Panoramic 4K View',
    description: 'Capture your entire property on one screen. Dual lenses merge into a sweeping 180° view in razor-sharp 4K Ultra HD, completely eliminating traditional blind spots.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eliteFloodlightSlide2,
    title: '3000-Lumen Dimmable Lighting',
    description: 'Customise your outdoor illumination. Enjoy ultra-bright 3,000-lumen security with smooth dimming and adjustable colour temperatures to switch instantly from ambient lighting to high-intensity deterrence.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eliteFloodlightSlide3,
    title: 'Smart AI Video Search',
    description: 'Find key moments in seconds. Intelligent AI video search lets you pinpoint specific people, vehicles, or events instantly without scrubbing through hours of continuous footage.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eliteFloodlightSlide4,
    title: 'Proactive Perimeter Protection',
    description: 'Stop threats before they reach your door. Custom perimeter zones watch critical boundaries, automatically triggering spotlights and sirens the second a line is crossed.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eliteFloodlightSlide5,
    title: 'No Monthly Storage Fees',
    description: 'Keep your data private and free. All advanced AI features and continuous 24/7 recording run fully on local hardware. Store footage effortlessly with flexible options, all with no monthly fees.',
    objectPosition: 'top center',
  },
];

const eSeriesE321Slides: Slide[] = [
  {
    type: 'image',
    media: eSeriesE321Slide1,
    title: 'Auto-Tracking Pan & Tilt',
    description: 'Eliminate blind spots completely. The camera smoothly tracks movement across the room, keeping active kids or pets perfectly in frame at all times.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eSeriesE321Slide2,
    title: 'AI Smart Detection',
    description: 'Stop chasing false alarms. Advanced on-camera AI instantly distinguishes between people, pets, and background motion to send alerts that actually matter.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eSeriesE321Slide3,
    title: 'Baby Cry Detection & Two-Way Audio',
    description: 'Stay connected to your nursery. Smart sensors detect baby cries and alert you instantly, letting you comfort your child using real-time two-way audio.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eSeriesE321Slide4,
    title: 'Instant Privacy Mode',
    description: 'Instantly disable recording and lens activity, giving you control when you need it.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: eSeriesE321Slide5,
    title: 'No Monthly Storage Fees',
    description: 'Keep your videos private and free. Secure local storage options deliver premium, intelligent security right out of the box with zero mandatory subscriptions.',
    objectPosition: 'top center',
  },
];

const nvs88mb4Slides: Slide[] = [
  {
    type: 'image',
    media: nvs88mb4Slide1,
    title: 'Razor-Sharp 4K Ultra HD',
    description: 'See every critical detail clearly. High-performance 8MP resolution delivers crisp, high-definition video, allowing you to identify license plates or faces with complete confidence.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88mb4Slide2,
    title: 'Accurate Smart Detection',
    description: 'Eliminate annoying false alerts. Advanced intelligence instantly differentiates between people, vehicle, and animal so you only get notifications that matter.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88mb4Slide3,
    title: 'Active Deterrence Spotlights & Siren',
    description: 'Warn away intruders automatically when motion is detected with booming Siren and bright Spotlight. Or activate manually from your app.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88mb4Slide4,
    title: 'Real-Time Communication',
    description: "With two-way audio, you can HEAR what's in view, and TALK to people (or pets) via Reolink app - even when you're away!",
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88mb4Slide5,
    title: '24/7 Recording, Zero Monthly Fees',
    description: 'Keep footage private and free. A pre-installed 2TB hard drive delivers round-the-clock local recording right out of the box with no mandatory subscriptions.',
    objectPosition: 'top center',
  },
];

const nvs88md4Slides: Slide[] = [
  {
    type: 'image',
    media: nvs88md4Slide1,
    title: 'Razor-Sharp 4K Ultra HD',
    description: 'See every critical detail clearly. High-performance 8MP resolution delivers crisp, high-definition video, allowing you to identify license plates or faces with complete confidence.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88md4Slide2,
    title: 'Accurate Smart Detection',
    description: 'Eliminate annoying false alerts. Advanced intelligence instantly differentiates between people, vehicle, and animal so you only get notifications that matter.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88md4Slide3,
    title: 'Active Deterrence Spotlights & Siren',
    description: 'Warn away intruders automatically when motion is detected with booming Siren and bright Spotlight. Or activate manually from your app.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88md4Slide4,
    title: 'Real-Time Communication',
    description: "With two-way audio, you can HEAR what's in view, and TALK to people (or pets) via Reolink app - even when you're away!",
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs88md4Slide5,
    title: '24/7 Recording, Zero Monthly Fees',
    description: 'Keep footage private and free. A pre-installed 2TB hard drive delivers round-the-clock local recording right out of the box with no mandatory subscriptions.',
    objectPosition: 'top center',
  },
];

const nvs812md6Slides: Slide[] = [
  {
    type: 'image',
    media: nvs812md6Slide1,
    title: 'Next-Level 12MP Precision',
    description: 'See what standard 4K misses. Unmatched 12MP Ultra HD resolution captures microscopic details, allowing you to zoom in on faces and license plates with complete confidence.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs812md6Slide2,
    title: 'Accurate Smart Detection',
    description: 'Eliminate annoying false alerts. Advanced intelligence instantly differentiates between people, vehicle, and animal so you only get notifications that matter.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs812md6Slide3,
    title: 'Proactive Perimeter Protection',
    description: 'Stop intruders before they reach your door. Smart perimeter tracking watches critical boundaries, triggering active spotlights and sirens the second a zone is crossed.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs812md6Slide4,
    title: "Be There When You're Not",
    description: 'Protect your property day and night with a motion-activated spotlight, two-way audio and siren.',
    objectPosition: 'top center',
  },
  {
    type: 'image',
    media: nvs812md6Slide5,
    title: '24/7 Recording, Zero Monthly Fees',
    description: 'Keep footage private and free. A pre-installed hard drive delivers round-the-clock local recording right out of the box with no mandatory subscriptions.',
    objectPosition: 'top center',
  },
];

/* ─── Slide Data Per Product ─── */
function getSlidesForProduct(product: Product): Slide[] {
  if (product.id === 1) {
    return homeHubMiniArgus3ProSlides;
  }

  if (product.id === 2) {
    return argus4ProSlides;
  }

  if (product.id === 4) {
    return argusPtUltraSlides;
  }

  if (product.id === 5) {
    return argus3ProSlides;
  }

  if (product.id === 6) {
    return argusMagiCamSlides;
  }

  if (product.id === 8) {
    return argusSolarSlides;
  }

  if (product.id === 9) {
    return smartVideoDoorbellSlides;
  }

  if (product.id === 10) {
    return e1ZoomSlides;
  }

  if (product.id === 11) {
    return eSeriesE321Slides;
  }

  if (product.id === 12) {
    return eliteFloodlightSlides;
  }

  if (product.id === 13) {
    return goPtPlusSlides;
  }

  if (product.id === 14) {
    return nvs88mb4Slides;
  }

  if (product.id === 15) {
    return nvs88md4Slides;
  }

  if (product.id === 16) {
    return nvs812md6Slides;
  }

  if (product.id === 17) {
    return solarFloodlightSlides;
  }

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
                  <img
                    src={slide.media}
                    alt={slide.title}
                    className="slide-image"
                    style={slide.objectPosition ? { objectPosition: slide.objectPosition } : undefined}
                  />
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

/* ─── Pack Content Accordion (Figma grid layout) ─── */
function PackContentAccordion({
  items,
}: {
  items: PackContentItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        className="accordion__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="accordion__icon"><PackIcon /></div>
        <span className="accordion__title">Pack Content</span>
        <ArrowDown open={open} />
      </button>
      <div className={`accordion__content ${open ? 'accordion__content--open' : ''}`}>
        <div className="pack-content-body">
          <div className="pack-content-grid">
            {items.map((item, i) => (
              <div key={i} className="pack-content-card">
                <div className="pack-content-card__image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="pack-content-card__placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#b0bec5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="pack-content-card__name">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Installation Accordion (Figma step layout) ─── */
function InstallationAccordion({
  items,
  note
}: {
  items: InstallationStep[];
  note?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        className="accordion__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="accordion__icon"><InstallIcon /></div>
        <span className="accordion__title">Installation</span>
        <ArrowDown open={open} />
      </button>
      <div className={`accordion__content ${open ? 'accordion__content--open' : ''}`}>
        <div className="installation-body">
          {items.map((step, i) => (
            <div key={i} className={`installation-step${i < items.length - 1 ? ' installation-step--border' : ''}`}>
              <ol className="installation-step__number" start={i + 1}>
                <li><span>{step.title}</span></li>
              </ol>
              <p className="installation-step__description">{step.description}</p>
              {step.image && (
                <div className="installation-step__image">
                  <img src={step.image} alt={step.title} />
                </div>
              )}
            </div>
          ))}
          {note && (
            <div className="installation-note">
              <div className="installation-note__icon">!</div>
              <p className="installation-note__text">
                <span className="installation-note__title">NOTE:</span>
                {note}
              </p>
            </div>
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
  const specsPdf = getPdfForProduct(product);

  const [showFooter, setShowFooter] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.getElementById('root');
    const specs = specsRef.current;
    if (!root || !specs) return;

    let frame = 0;
    let isVisible = false;

    const updateFooterVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const accordionScrollStart = specs.offsetTop - root.clientHeight;
        const showAt = Math.max(112, accordionScrollStart + 112);
        const hideAt = Math.max(56, accordionScrollStart + 56);
        const shouldShow = isVisible
          ? root.scrollTop > hideAt
          : root.scrollTop > showAt;

        if (shouldShow !== isVisible) {
          isVisible = shouldShow;
          setShowFooter(shouldShow);
        }
      });
    };

    updateFooterVisibility();
    root.addEventListener('scroll', updateFooterVisibility, { passive: true });
    window.addEventListener('resize', updateFooterVisibility);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('scroll', updateFooterVisibility);
      window.removeEventListener('resize', updateFooterVisibility);
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
          <PackContentAccordion
            items={accordionData.packContent}
          />
          <InstallationAccordion
            items={accordionData.installation}
            note={accordionData.installationNote}
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
        <PdfViewerModal pdfUrl={specsPdf} onClose={() => setShowPdf(false)} />
      )}
    </div>
  );
}
