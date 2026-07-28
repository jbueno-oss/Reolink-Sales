import type { Product } from '../ProductDetail';

import svgCamera from '../assets/SVG and images/Camera.svg';
import svgMountingTemplate from '../assets/SVG and images/Morintain Template.svg';
import svgMountingBracket from '../assets/SVG and images/Mounting Bracket.svg';
import svgOperationalInstruction from '../assets/SVG and images/Operational Instruction.svg';
import svgPackOfScrews from '../assets/SVG and images/Pack of Screws.svg';
import svgSurveillanceSticker from '../assets/SVG and images/Surveillance Sticker.svg';
import svgUSBCable from '../assets/SVG and images/USB-C Cable.svg';
import svgStep1 from '../assets/SVG and images/Step 1 Instalation.svg';
import svgStep2 from '../assets/SVG and images/Step 2 Instalation.svg';
import svgStep3 from '../assets/SVG and images/Step 3 Instalation.svg';

export interface AccordionItem {
  label: string;
  value: string;
}

export interface PackContentItem {
  name: string;
  quantity: number;
  image?: string;
}

export interface InstallationStep {
  title: string;
  description: string;
  image?: string;
}

export interface SpecSection {
  category: string;
  items: AccordionItem[];
}

export interface AccordionData {
  specs: SpecSection[];
  packContent: PackContentItem[];
  installation: InstallationStep[];
  installationNote?: string;
}

const defaultPackContent: PackContentItem[] = [
  { name: 'Camera', quantity: 1 },
  { name: 'Mounting Kit', quantity: 1 },
  { name: 'Power Cable', quantity: 1 },
  { name: 'Quick Start Guide', quantity: 1 },
  { name: 'Surveillance Sign', quantity: 1 },
];

const argus3ProPackContent: PackContentItem[] = [
  { name: 'Argus 3 Pro Camera', quantity: 1, image: svgCamera },
  { name: 'Mounting Template', quantity: 1, image: svgMountingTemplate },
  { name: 'Mounting Bracket', quantity: 1, image: svgMountingBracket },
  { name: 'Operational Instruction', quantity: 1, image: svgOperationalInstruction },
  { name: 'Pack of Screws', quantity: 1, image: svgPackOfScrews },
  { name: 'Surveillance Sticker', quantity: 1, image: svgSurveillanceSticker },
  { name: 'USB-C Cable', quantity: 1, image: svgUSBCable },
];

const defaultInstallation: InstallationStep[] = [
  { title: 'Download the Reolink App', description: 'Download the Reolink App and create an account to get started.' },
  { title: 'Scan QR Code', description: 'Scan the QR code on the camera or device to pair it with the app.' },
  { title: 'Configure Connection', description: 'Follow in-app prompts to configure Wi-Fi or network connection.' },
  { title: 'Install Device', description: 'Install the device in its final location and adjust the viewing angle.' },
];

const argus3ProInstallation: InstallationStep[] = [
  { 
    title: 'Download the Reolink App', 
    description: 'Scan to download the Reolink App from the App Store or Google Play store.',
    image: svgStep1
  },
  { 
    title: 'Power on the Camera', 
    description: 'Turn on the power switch to power on the camera.',
    image: svgStep2
  },
  { 
    title: 'Launch App & Scan', 
    description: 'Launch the Reolink App, click the "+" button in the top right corner to add the camera. Scan the QR code on the device and follow the onscreen instructions to finish initial setup.',
    image: svgStep3
  },
  { 
    title: 'Configure Wi-Fi Connection', 
    description: 'In the "Add Device" page, configure the Wi-Fi connection by enabling Bluetooth on your phone and follow the onscreen instructions to finish the initial setup.'
  },
];

export function getAccordionData(product: Product): AccordionData {
  const data: Record<number, AccordionData> = {
    // 1: Argus 3 Pro 4x Kit + Hub -> PDF 10 (Argus 3 Pro) + PDF 15 (Hub)
    1: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '5MP (2880 x 1616) @15fps' },
            { label: 'Lens', value: 'f=4mm, F/1.6 mm' },
            { label: 'Viewing Angle', value: 'Horizontal 90°, Vertical 47°, Diagonal 110°' },
            { label: 'Pan/Tilt Angle', value: '355° pan, 140° tilt' },
            { label: 'Auto Tracking', value: 'Yes' },
            { label: 'Infrared Night Vision', value: 'Up to 10m' },
            { label: 'Colour Night Vision', value: 'Yes' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m; horizontal 120°' },
            { label: 'Record Mode', value: 'Motion-triggered recording' },
            { label: 'Frequency Bands', value: '3G/4G^' },
            { label: 'Works with', value: 'Google Assistant, Alexa' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Spotlight', value: '2pcs/2.4W/6500K (cool white)' },
            { label: 'Rechargeable Battery', value: 'Lithium-ion battery (6000mAh)' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card)' },
            { label: 'Operating Temp.', value: '-10oC ~ 55oC' },
            { label: 'Weatherproof', value: 'Indoor/Outdoor' },
            { label: 'Dimensions', value: 'Φ 100 x 129 mm' },
            { label: 'Weight', value: '500g' },
          ]
        },
      ],
      packContent: [
        { name: 'Argus 3 Pro Camera', quantity: 4, image: svgCamera },
        ...argus3ProPackContent.slice(1)
      ],
      installation: argus3ProInstallation,
      installationNote: 'This device supports 2.4 GHz and 5 GHz Wi-Fi networks. It is recommended to connect the device to 5 GHz Wi-Fi for a better network experience.',
    },
    // 2: Argus 4 Pro Panoramic -> PDF 11
    2: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '2MP (1920 X 1080) @15fps(Battery)/ @20fps (Power-on)' },
            { label: 'Lens', value: 'f=2.3mm, F/2.2' },
            { label: 'Viewing Angle', value: 'H: 113°; V: 63°; D: 132o IR Night Vision Up to 8m' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/motion detection' },
            { label: 'Record Mode', value: 'Motion Recording; schedule recording (24/7 recording when plugged in to power)' },
            { label: 'Works with', value: 'Alexa, Google Assistant' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Power', value: '2x AA batteries or 5V/1A Direct Power Mode' },
            { label: 'Wi-Fi Bands', value: '2.4/5GHz' },
            { label: 'Storage', value: 'microSD card slot (Max. 256GB)' },
            { label: 'Operating Temp.', value: '-10oC ~ 55oC' },
            { label: 'Weatherproof', value: 'IP67' },
            { label: 'Dimensions', value: '68 x 68 x 29 mm' },
            { label: 'Weight', value: '108 g (without batties)' },
          ]
        },
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 3: Argus PT Ultra 2-Pack -> PDF 4
    3: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4K/8MP (3840 X 2160)' },
            { label: 'Lens', value: '4mm, F=1.6 mm' },
            { label: 'Viewing Angle', value: 'Horizontal 90°, Vertical 47°' },
            { label: 'Pan/Tilt Angle', value: '355° pan, 140° tilt' },
            { label: 'Infrared Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
            { label: 'Record Mode', value: 'Motion-triggered recording' },
            { label: 'WiFi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Works with', value: 'Alexa, Google Assistant' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Spotlight', value: '2pcs/2.4W/6500K (cool white)' },
            { label: 'Rechargeable Battery', value: 'Lithium-ion battery (6000mAh)' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card)' },
            { label: 'Operating Temp.', value: '-10oC ~ 55oC (14°F ~ 131°F)' },
            { label: 'Weatherproof', value: 'Indoor/Outdoor' },
            { label: 'Dimensions', value: 'Φ 100 x 129 mm (Φ 3.94 x 5.08 in)' },
            { label: 'Weight', value: '495g (1.09 lbs)' },
          ]
        },
      ],
      packContent: [
        { name: 'Argus PT Ultra Camera', quantity: 2 },
        ...defaultPackContent.slice(1)
      ],
      installation: defaultInstallation,
    },
    // 4: Argus PT Ultra Single -> PDF 4
    4: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4K/8MP (3840 X 2160)' },
            { label: 'Lens', value: '4mm, F=1.6 mm' },
            { label: 'Viewing Angle', value: 'Horizontal 90°, Vertical 47°' },
            { label: 'Pan/Tilt Angle', value: '355° pan, 140° tilt' },
            { label: 'Infrared Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
            { label: 'Record Mode', value: 'Motion-triggered recording' },
            { label: 'WiFi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Works with', value: 'Alexa, Google Assistant' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Spotlight', value: '2pcs/2.4W/6500K (cool white)' },
            { label: 'Rechargeable Battery', value: 'Lithium-ion battery (6000mAh)' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card)' },
            { label: 'Operating Temp.', value: '-10oC ~ 55oC (14°F ~ 131°F)' },
            { label: 'Weatherproof', value: 'Indoor/Outdoor' },
            { label: 'Dimensions', value: 'Φ 100 x 129 mm (Φ 3.94 x 5.08 in)' },
            { label: 'Weight', value: '495g (1.09 lbs)' },
          ]
        },
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 5: Argus 3 Pro Standalone -> PDF 10
    5: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '5MP (2880 x 1616) @15fps' },
            { label: 'Lens', value: 'f=3.0mm, F/1.6' },
            { label: 'Viewing Angle', value: 'H: 110°; V: 58°; D: 132o IR Night Vision Up to 10m (33ft)' },
            { label: 'Spotlight', value: '2pcs/6500K (cool white)' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
            { label: 'Record Mode', value: 'Motion recording, schedule recording, 24/7 recording (only Direct Power)' },
            { label: 'Works with', value: 'Alexa, Google Assistant, Reolink Cloud, Reolink Hub' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Rechargeable Batt.', value: 'Lithium-ion battery (6500mAh)' },
            { label: 'Wi-Fi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card), Reolink Hub' },
            { label: 'Operating Temp.', value: '-20oC ~ 55oC (-4°F ~ 131°F)' },
            { label: 'Weatherproof', value: 'IP67' },
            { label: 'Dimensions', value: '106 x 74 x 54 mm (4.17” x 2.91“ x 2.13”)' },
            { label: 'Weight', value: '(w/o bracket) 293 g (0.65 lbs)' },
          ]
        },
      ],
      packContent: argus3ProPackContent,
      installation: argus3ProInstallation,
      installationNote: 'This device supports 2.4 GHz and 5 GHz Wi-Fi networks. It is recommended to connect the device to 5 GHz Wi-Fi for a better network experience.',
    },
    // 6: Argus MagiCam Magnetic -> PDF 3
    6: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '5MP (2880 x 1616) @15fps' },
            { label: 'Lens', value: 'f=2.8mm, F/1.6' },
            { label: 'Viewing Angle', value: 'H: 110°; V: 58°; D: 132o IR Night Vision Up to 33ft (10m)' },
            { label: 'Colour Night Vision', value: 'Yes' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
            { label: 'Record Mode', value: 'Motion Recording' },
            { label: 'Works with', value: 'Alexa, Google Assistant, Reolink Cloud, Reolink Hub' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Spotlight', value: '2pcs/6500K (cool white)' },
            { label: 'Rechargeable Batt.', value: 'Lithium-ion battery (5200mAh)' },
            { label: 'Wi-Fi Bands', value: '2.4/5GHz Wi-Fi' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card), Reolink Hub' },
            { label: 'Operating Temp.', value: '-20oC ~ 55oC (-4°F ~ 131°F)' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
            { label: 'Dimensions', value: '2.68” x 2.20“ x 3.58” (68 x 56 x 91 mm)' },
            { label: 'Weight', value: '(w/o stand) 0.48 lbs (218 g)' },
          ]
        },
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 7: Argus Solar 2-Pack -> PDF 8
    7: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4K/8MP (5120 X 1440) @ 15fps' },
            { label: 'Lens', value: 'f=4.0mm, F=1.0' },
            { label: 'Viewing Angle', value: 'Diagonal: 180°' },
            { label: 'Digital Zoom', value: '10x' },
            { label: 'Color Night Vision', value: 'ColorX' },
            { label: 'Spotlight', value: '5pcs/2W/6500K/300 Lumens' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'OS Supported', value: 'PC: Windows, Mac OS; Smartphone: iOS, Android' },
            { label: 'Smart Alarm', value: 'Person/vehicle/animal/motion detection' },
            { label: 'PIR Detection', value: 'Up to 10m; 170° (horizontal)' },
            { label: 'Record Mode', value: 'Motion-triggered recording' },
            { label: 'Works with', value: 'Alexa, Google Assistant' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5 GHz Wi-Fi 6' },
            { label: 'Bluetooth', value: 'Bluetooth V5.0' },
            { label: 'Rechargeable Battery', value: 'Lithium-ion battery (5000mAh)' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card)' },
            { label: 'Operating Temp.', value: '-10oC ~ 55oC' },
            { label: 'Weatherproof', value: 'Yes, IP66 rated' },
            { label: 'Dimensions', value: '128 x 87 x 80 mm' },
            { label: 'Weight', value: '400g' },
          ]
        },
      ],
      packContent: [
        { name: 'Argus Solar Camera', quantity: 2 },
        ...defaultPackContent.slice(1)
      ],
      installation: defaultInstallation,
    },
    // 8: Argus Solar Single -> PDF 8
    8: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '2K/4MP (2560x1440) @ 15fps' },
            { label: 'Lens', value: 'f=2.2mm fixed, F=2.2' },
            { label: 'Viewing Angle', value: 'H:125°, V:70°, D:151°' },
            { label: 'Infrared Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'Record Mode', value: 'Motion recording' },
            { label: 'Wi-Fi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Works with', value: 'Alexa, Google Assistant, Reolink Cloud, Reolink Hub' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Battery Capacity', value: '3.6V 7800mAh' },
            { label: 'Solar Panel', value: '3W' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card)' },
            { label: 'Operating Temp.', value: '-20oC ~ 55oC (-4°F ~ 131°F)' },
            { label: 'Weatherproof', value: 'IP66' },
            { label: 'Dimensions', value: '102 x 264 x 161 mm (4.02 x 10.39 x 6.34 in)' },
            { label: 'Weight', value: '721 g (1.59 lbs)' },
          ]
        },
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 9: Smart Video Doorbell -> PDF 16 + PDF 17
    9: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '5MP (2880 x 1616) @15fps' },
            { label: 'Lens', value: 'f=2.8mm, F/1.6' },
            { label: 'Viewing Angle', value: 'H: 110°; V: 58°; D: 132o IR Night Vision Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
            { label: 'Record Mode', value: 'Motion Recording' },
            { label: 'Works with', value: 'Alexa, Google Assistant, Reolink Cloud, Reolink Hub' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Spotlight', value: '2pcs/6500K (cool white)' },
            { label: 'Rechargeable Batt.', value: 'Lithium-ion battery (5200mAh)' },
            { label: 'Wi-Fi Bands', value: '2.4/5GHz' },
            { label: 'Storage', value: 'microSD card slot (supports up to 512GB microSD card), Reolink Hub' },
            { label: 'Operating Temp.', value: '-20oC ~ 55oC (-4°F ~ 131°F)' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
            { label: 'Dimensions', value: '68 x 56 x 91 mm (2.68” x 2.20“ x 3.58”)' },
            { label: 'Weight', value: '(w/o stand) 218g (0.48 lbs)' },
          ]
        },
      ],
      packContent: [
        { name: 'Video Doorbell', quantity: 1 },
        { name: 'Reolink Chime', quantity: 1 },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { title: 'Mount the Bracket', description: 'Mount the wedge or bracket near your door at the desired height.' },
        { title: 'Connect Power', description: 'Connect the doorbell to power or use the built-in battery.' },
        { title: 'Plug in the Chime', description: 'Plug in the Chime into an indoor power socket.' },
        { title: 'Pair Devices', description: 'Pair devices together using the Reolink App.' },
      ],
    },
    // 10: E1 Zoom Indoor 4K -> PDF 19
    10: {
      specs: [
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 11: E Series E321 Indoor -> PDF 18
    11: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4MP (2048 X 2048) @ 15fps' },
            { label: 'Lens', value: 'f=1.2mm, F=1.8 mm' },
            { label: 'Viewing Angle', value: 'Diagonal 180°' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio, noise reduction, echo suppression Quick Replies Support' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Motion/Person/Vehicle/Package Detection Visitor Notification' },
            { label: 'PIR Detection', value: 'Up to 8m' },
            { label: 'Record Mode', value: 'Motion recording (default)' },
            { label: 'Works with', value: 'Alexa/Google Assistant Rich Notification Support' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'WiFi Bands', value: '2.4/5GHz' },
            { label: 'Rechargeable Batt.', value: 'Lithium-ion battery (7000mAh)' },
            { label: 'Storage', value: 'microSD card slot (Max. 256GB), works with Reolink Home Hub' },
            { label: 'Operating Temp.', value: '-10oC ~ 55oC' },
            { label: 'Weatherproof', value: 'Yes' },
            { label: 'Dimensions', value: '160 x 48 x 29.5 mm' },
            { label: 'Weight', value: '(incl. Batt.) 231g' },
          ]
        },
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 12: Elite Floodlight WiFi -> PDF 20 (Floodlight Series F751W)
    12: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '3MP (2304x1296) @15fps' },
            { label: 'Lens', value: 'f=4mm, F2.0' },
            { label: 'Viewing Angle', value: 'H: 77°; V: 41°' },
            { label: 'Pan/Tilt Angle', value: 'Pan: 355°, Tilt: 50° IR Night Vision Up to 40ft (12m)' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/pet/baby crying/motion detection' },
            { label: 'Record Mode', value: 'Motion Recording; schedule recording (24/7 recording)' },
            { label: 'Works with', value: 'Alexa, Google Assistant' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4GHz' },
            { label: 'Storage', value: 'microSD card slot (Max. 512GB); Reolink Cloud; Reolink NVR' },
            { label: 'Operating Temp.', value: '14oF ~ 104oF (-10oC ~ 40oC) Indoor/Outdoor Indoor' },
            { label: 'Dimensions', value: 'Φ 2.87” x 4.49” (Φ 73 x 114 mm)' },
            { label: 'Weight', value: '0.37 lbs (167g)' },
          ]
        },
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 13: Go PT Plus 4G LTE -> PDF 1
    13: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4K/8MP (3840 X 2160) @15fps' },
            { label: 'Lens', value: 'f=2.8-8mm, F1.6' },
            { label: 'Optical Zoom', value: '3x' },
            { label: 'Viewing Angle', value: 'Horizontal : 94° - 50°; Vertical : 53° - 30°' },
            { label: 'Pan/Tilt Angle', value: 'Pan: 355°, Tilt: 50°' },
            { label: 'Auto Tracking', value: 'Support' },
            { label: 'Infrared Night Vision', value: 'Up to 12m' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/pet/motion/baby crying detection' },
            { label: 'Record Mode', value: 'Motion-triggered recording (default); scheduled recording' },
            { label: 'Works with', value: 'Alexa, Google Assistant' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5 GHz' },
            { label: 'Storage', value: 'microSD card slot (Max. 512GB)' },
            { label: 'Operating Temp.', value: '14°F ~ 131°F (-10oC ~ 55oC) Indoor/Outdoor Indoor' },
            { label: 'Dimensions', value: 'Φ 84 x 118 mm' },
            { label: 'Weight', value: '275g' },
          ]
        },
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
    // 14: NVS8 PoE Kit 8MB4 -> PDF 21
    14: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4K/8MP (5120 X 1552) @ 20fps' },
            { label: 'Lens', value: 'f=2.8 fixed, F=1.6' },
            { label: 'Viewing Angle', value: 'Horizontal 180°, Vertical 59°' },
            { label: 'Infrared Night Vision', value: 'Up to 100ft (30m)' },
            { label: 'Color Night Vision', value: 'Yes' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'Record Mode', value: '24/7 recording; scheduled recording; motion recording' },
            { label: 'WiFi Bands', value: '2.4/5GHz' },
            { label: 'Works with', value: 'Alexa, Google Assistant' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Power', value: 'AC 100~240V' },
            { label: 'Storage', value: 'Micro SD card slot (supports up to 512GB microSD card)' },
            { label: 'Operating Temp.', value: '14°F ~ 131°F (-10oC ~ 55oC)' },
            { label: 'Weatherproof', value: 'Yes' },
            { label: 'Dimensions', value: '6.85 x 7.24 x 11.61 in (174 x 184 x 295 mm)' },
            { label: 'Weight', value: '2.91 lbs (1321g)' },
          ]
        },
      ],
      packContent: [
        { name: 'NVS8 NVR', quantity: 1 },
        { name: 'PoE Cameras', quantity: 4 },
        { name: '2TB HDD', quantity: 1 },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { title: 'Connect Cameras', description: 'Connect cameras to the NVR using Ethernet cables.' },
        { title: 'Connect NVR', description: 'Connect the NVR to your router and a monitor.' },
        { title: 'Power On & Setup', description: 'Power on the NVR and follow the setup wizard.' },
        { title: 'Mount Cameras', description: 'Mount cameras in their desired locations and adjust angles.' },
      ],
    },
    // 15: NVS8 PoE Kit 8MD4 -> PDF 21
    15: {
      specs: [
        {
          category: 'Video',
          items: [
            { label: 'Input', value: '8+4 Channels (Supports up to 8 PoE/Wi-Fi' },
            { label: 'Camera', value: 's or 12 battery-powered cameras excluding 4G)' },
            { label: 'HDMI Output', value: 'Up to 3840 x 2160' },
            { label: 'VGA Output', value: 'Up to 1920 x 1080' },
          ]
        },
        {
          category: 'Audio',
          items: [
            { label: 'Input', value: 'Cameras with built-in mic Output 1 channel, RCA' },
          ]
        },
        {
          category: 'Recording',
          items: [
            { label: 'Live View/Playback', value: 'Up to 16MP' },
            { label: 'Hard Drive Support', value: '2TB SATA HDD included (supports up to 16TB, max. 8TB for each HDD)' },
          ]
        },
        {
          category: 'Connection',
          items: [
            { label: 'Network Interface', value: 'RJ45' },
            { label: 'USB Interface', value: '2 x USB 2.0' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'OS Supported', value: 'PC: Windows, Mac OS' },
            { label: 'Smartphone', value: 'iOS, Android' },
            { label: 'Dimensions', value: '255 x 49.5 x 232 mm' },
            { label: 'Weight', value: '1.4kg' },
          ]
        },
        {
          category: 'CAMERA',
          items: [
          ]
        },
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4K/8MP (3840 X 2160) @ 25fps' },
            { label: 'Lens', value: 'f=2.8mm, F=1.6' },
            { label: 'Field of View', value: 'Horizontal: 105°, Vertical: 56° IR Night Vision Up to 30m' },
            { label: 'Spotlight', value: '1pc/4.3W/6500K (cool white) /700 Lumens' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal/motion detection' },
            { label: 'Record Mode', value: '24/7 recording; Scheduled recording; Motion recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Operating Temp.', value: '-10 °C ~ 55 °C' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
            { label: 'Dimensions', value: '68 x 63 x 188 mm' },
            { label: 'Weight', value: '452g 17. NVS8 NVR' },
          ]
        },
        {
          category: 'Video',
          items: [
            { label: 'Input', value: 'Supports (all Reolink models except 4G) up to 12 Channels with 8 built-in PoE Ports' },
            { label: 'HDMI Output', value: 'Up to 3840 x 2160' },
            { label: 'VGA Output', value: 'Up to 1920 x 1080' },
          ]
        },
        {
          category: 'Audio',
          items: [
            { label: 'Input', value: 'Cameras with built-in mic Output 1 channel, RCA' },
          ]
        },
        {
          category: 'Recording',
          items: [
            { label: 'Live View/Playback', value: 'Up to 16MP' },
            { label: 'Hard Drive Support', value: '2TB SATA HDD included (supports up to 16TB, max. 8TB for each HDD)' },
          ]
        },
        {
          category: 'Connection',
          items: [
            { label: 'Network Interface', value: 'RJ45' },
            { label: 'USB Interface', value: '2 x USB 2.0' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'AI Video Search', value: 'Yes' },
            { label: 'OS Supported', value: 'PC: Windows, Mac OS' },
            { label: 'Smartphone', value: 'iOS, Android' },
            { label: 'Dimensions', value: '255 x 49.5 x 232 mm (10.04 x 1.95 x 9.13 in)' },
            { label: 'Weight', value: '1.4kg (3.09 lbs)' },
          ]
        },
        {
          category: 'CAMERA',
          items: [
          ]
        },
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '12MP (4512 x 2512) @ 20fps' },
            { label: 'Lens', value: 'f=4mm, F/1.6' },
            { label: 'Viewing Angle', value: 'Horizontal: 105°, Vertical: 56°, Diagonal: 125º IR Night Vision Up to 100ft (30m)' },
            { label: 'Spotlight', value: '1pc/4.3W/6500K/700 Lumens' },
            { label: 'IR Cut Filter', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio' },
            { label: 'Siren', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Perimeter Protection', value: 'Line Crossing, Zone Intrusion, Zone Loitering' },
            { label: 'Smart Alarm', value: 'Person/vehicle/animal/motion detection' },
            { label: 'Record Mode', value: '24/7 recording; scheduled recording; motion recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Operating Temp.', value: '14°F ~ 131°F (-10°C ~ 55°C)' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
            { label: 'Dimensions', value: 'Φ117 x 104 mm (Φ4.62 x 4.09 in)' },
            { label: 'Weight', value: '526g (1.' },
          ]
        },
      ],
      packContent: [
        { name: 'NVS8 NVR', quantity: 1 },
        { name: 'PoE Dome Cameras', quantity: 4 },
        { name: '2TB HDD', quantity: 1 },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { title: 'Connect Cameras', description: 'Connect cameras to the NVR using Ethernet cables.' },
        { title: 'Connect NVR', description: 'Connect the NVR to your router and a monitor.' },
        { title: 'Power On & Setup', description: 'Power on the NVR and follow the setup wizard.' },
        { title: 'Mount Cameras', description: 'Mount cameras in their desired locations and adjust angles.' },
      ],
    },
    // 16: NVS8 PoE Kit 12MD6 -> PDF 23
    16: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Camera Resolution', value: '12MP (4512 x 2512) @ 20fps' },
            { label: 'NVR Output', value: 'Up to 3840 x 2160 (HDMI)' },
            { label: 'Viewing Angle', value: 'Horizontal: 105°, Vertical: 56°' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal/motion detection' },
            { label: 'Perimeter Protection', value: 'Line Crossing, Zone Intrusion' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'NVR Input', value: 'Supports up to 12 Channels' },
            { label: 'Hard Drive', value: '2TB SATA HDD included (up to 16TB)' },
            { label: 'AI Video Search', value: 'Yes' },
          ]
        }
      ],
      packContent: [
        { name: 'NVS8 NVR', quantity: 1 },
        { name: '12MP PoE Dome Cameras', quantity: 6 },
        { name: '2TB HDD', quantity: 1 },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { title: 'Connect Cameras', description: 'Connect cameras to the NVR using Ethernet cables.' },
        { title: 'Connect NVR', description: 'Connect the NVR to your router and a monitor.' },
        { title: 'Power On & Setup', description: 'Power on the NVR and follow the setup wizard.' },
        { title: 'Mount Cameras', description: 'Mount cameras in their desired locations and adjust angles.' },
      ],
    },
    // 17: Solar Floodlight Cam F310B -> PDF 13
    17: {
      specs: [
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '2K/4MP (2560x1440) @ 15fps' },
            { label: 'Viewing Angle', value: 'H:125°, V:70°, D:151°' },
            { label: 'IR Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Color Night Vision', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'Record Mode', value: 'Motion recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Floodlight', value: '6.5W/3000K~6000K/1000 Lumens' },
            { label: 'Battery Capacity', value: '3.6V 7800mAh' },
            { label: 'Solar Panel', value: '3W Included' },
            { label: 'Weatherproof', value: 'IP66' },
          ]
        }
      ],
      packContent: defaultPackContent,
      installation: defaultInstallation,
    },
  };

  return data[product.id] || data[1];
}
