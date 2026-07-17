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
            { label: 'Viewing Angle', value: 'H: 110°; V: 58°; D: 132°' },
            { label: 'IR Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
            { label: 'Audio', value: 'Two-way audio, Siren Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Battery', value: 'Rechargeable 5200mAh Lithium-ion' },
            { label: 'Storage', value: 'microSD card slot, works with Reolink Hub' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
            { label: 'Hub Support', value: 'Up to 8 Cameras, Max 1TB microSD' },
          ]
        }
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
            { label: 'Video Resolution', value: '4K/8MP (5120 X 1440) @ 15fps' },
            { label: 'Viewing Angle', value: 'Diagonal: 180°' },
            { label: 'Color Night Vision', value: 'ColorX' },
            { label: 'Spotlight', value: '5pcs/2W/6500K/300 Lumens' },
            { label: 'Audio', value: 'Two-way audio, Siren Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal/motion detection' },
            { label: 'PIR Detection', value: 'Up to 10m; 170° (horizontal)' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5 GHz Wi-Fi 6' },
            { label: 'Battery', value: 'Rechargeable 5000mAh Lithium-ion' },
            { label: 'Weatherproof', value: 'Yes, IP66 rated' },
          ]
        }
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
            { label: 'Pan/Tilt Angle', value: '355° pan, 140° tilt' },
            { label: 'IR Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Battery', value: 'Rechargeable 6000mAh' },
            { label: 'Weatherproof', value: 'Indoor/Outdoor' },
          ]
        }
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
            { label: 'Pan/Tilt Angle', value: '355° pan, 140° tilt' },
            { label: 'IR Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Battery', value: 'Rechargeable 6000mAh' },
            { label: 'Weatherproof', value: 'Indoor/Outdoor' },
          ]
        }
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
            { label: 'Viewing Angle', value: 'H: 110°; V: 58°; D: 132°' },
            { label: 'IR Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Colour Night Vision', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Battery', value: 'Rechargeable 5200mAh Lithium-ion' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
          ]
        }
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
            { label: 'Video Resolution', value: '2MP (1920 X 1080)' },
            { label: 'Viewing Angle', value: 'H: 113°; V: 63°; D: 132°' },
            { label: 'IR Night Vision', value: 'Up to 8m' },
            { label: 'Audio', value: 'Two-way audio' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/motion detection' },
            { label: 'Record Mode', value: 'Motion Recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Power', value: '2x AA batteries or 5V/1A Direct' },
            { label: 'Wi-Fi Bands', value: '2.4/5GHz' },
            { label: 'Weatherproof', value: 'IP67' },
          ]
        }
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
            { label: 'Video Resolution', value: '5MP (2880 x 1616) @15fps' },
            { label: 'Viewing Angle', value: 'H: 110°; V: 58°; D: 132°' },
            { label: 'IR Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Spotlight', value: '2pcs/6500K (cool white)' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Battery', value: 'Rechargeable 6500mAh' },
            { label: 'Weatherproof', value: 'IP67' },
          ]
        }
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
            { label: 'Video Resolution', value: '5MP (2880 x 1616) @15fps' },
            { label: 'Viewing Angle', value: 'H: 110°; V: 58°; D: 132°' },
            { label: 'IR Night Vision', value: 'Up to 10m (33ft)' },
            { label: 'Spotlight', value: '2pcs/6500K (cool white)' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'PIR Detection', value: 'Up to 10m (33ft); horizontal 120°' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5GHz Wi-Fi 6' },
            { label: 'Battery', value: 'Rechargeable 6500mAh' },
            { label: 'Weatherproof', value: 'IP67' },
          ]
        }
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
            { label: 'Video Resolution', value: '4MP (2048 X 2048) @ 15fps' },
            { label: 'Viewing Angle', value: 'Diagonal 180°' },
            { label: 'Audio', value: 'Two-way audio, noise reduction' },
            { label: 'Chime Sound', value: '10 Music, 100db adjustable' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Motion/Person/Vehicle/Package Detection' },
            { label: 'PIR Detection', value: 'Up to 8m' },
            { label: 'Quick Replies', value: 'Support' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5GHz' },
            { label: 'Battery', value: 'Rechargeable 7000mAh' },
            { label: 'Weatherproof', value: 'Yes' },
          ]
        }
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
        {
          category: 'Video & Audio',
          items: [
            { label: 'Video Resolution', value: '4K/8MP (3840 X 2160) @15fps' },
            { label: 'Optical Zoom', value: '3x' },
            { label: 'Pan/Tilt Angle', value: '355° pan, 50° tilt' },
            { label: 'IR Night Vision', value: 'Up to 12m' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/pet/motion/baby crying detection' },
            { label: 'Auto Tracking', value: 'Support' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4/5 GHz' },
            { label: 'Weatherproof', value: 'Indoor only' },
          ]
        }
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
            { label: 'Video Resolution', value: '3MP (2304x1296) @15fps' },
            { label: 'Pan/Tilt Angle', value: '355° pan, 50° tilt' },
            { label: 'IR Night Vision', value: 'Up to 40ft (12m)' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/pet/baby crying/motion detection' },
            { label: 'Record Mode', value: 'Motion Recording; schedule recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Wi-Fi Bands', value: '2.4GHz' },
            { label: 'Weatherproof', value: 'Indoor only' },
          ]
        }
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
            { label: 'Video Resolution', value: '4K/8MP (5120 X 1552) @ 20fps' },
            { label: 'Viewing Angle', value: 'Horizontal 180°, Vertical 59°' },
            { label: 'IR Night Vision', value: 'Up to 100ft (30m)' },
            { label: 'Color Night Vision', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'Record Mode', value: '24/7 recording; scheduled recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Floodlight', value: '19W/3000K~6500K/3000 Lumens' },
            { label: 'Power', value: 'AC 100~240V' },
            { label: 'Weatherproof', value: 'Yes' },
          ]
        }
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
            { label: 'Video Resolution', value: '5MP (2880 x 1616) @15fps' },
            { label: 'Pan/Tilt Angle', value: '355° pan, 140° tilt' },
            { label: 'IR Night Vision', value: 'Up to 10m' },
            { label: 'Color Night Vision', value: 'Yes' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal detection' },
            { label: 'Network', value: 'Frequency Bands 3G/4G' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'Battery', value: 'Rechargeable 6000mAh' },
            { label: 'Spotlight', value: '2pcs/2.4W/6500K' },
            { label: 'Weatherproof', value: 'Indoor/Outdoor' },
          ]
        }
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
            { label: 'Camera Resolution', value: '4K/8MP (3840 X 2160) @ 25fps' },
            { label: 'NVR Output', value: 'Up to 3840 x 2160 (HDMI)' },
            { label: 'Viewing Angle', value: 'Horizontal: 105°, Vertical: 56°' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal/motion detection' },
            { label: 'Record Mode', value: '24/7 recording; Scheduled recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'NVR Input', value: '8+4 Channels (Supports up to 8 PoE/Wi-Fi)' },
            { label: 'Hard Drive', value: '2TB SATA HDD included (up to 16TB)' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
          ]
        }
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
          category: 'Video & Audio',
          items: [
            { label: 'Camera Resolution', value: '4K/8MP (3840 X 2160) @ 25fps' },
            { label: 'NVR Output', value: 'Up to 3840 x 2160 (HDMI)' },
            { label: 'Viewing Angle', value: 'Horizontal: 105°, Vertical: 56°' },
          ]
        },
        {
          category: 'Software Features',
          items: [
            { label: 'Smart Alarm', value: 'Person/vehicle/animal/motion detection' },
            { label: 'Record Mode', value: '24/7 recording; Scheduled recording' },
          ]
        },
        {
          category: 'General',
          items: [
            { label: 'NVR Input', value: '8+4 Channels (Supports up to 8 PoE/Wi-Fi)' },
            { label: 'Hard Drive', value: '2TB SATA HDD included (up to 16TB)' },
            { label: 'Weatherproof', value: 'Yes, IP67 rated' },
          ]
        }
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
