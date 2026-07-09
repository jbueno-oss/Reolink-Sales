import type { Product } from '../ProductDetail';

export interface AccordionItem {
  label: string;
  value: string;
}

export interface SpecSection {
  category: string;
  items: AccordionItem[];
}

export interface AccordionData {
  specs: SpecSection[];
  packContent: AccordionItem[];
  installation: AccordionItem[];
}

const defaultPackContent: AccordionItem[] = [
  { label: 'Camera', value: '1 × Reolink Camera' },
  { label: 'Mounting Kit', value: 'Wall mount + screw pack' },
  { label: 'Power Cable', value: 'Included power cable' },
  { label: 'Quick Start Guide', value: 'Setup instructions & QR code' },
  { label: 'Surveillance Sign', value: '1 × Security sign sticker' },
];

const defaultInstallation: AccordionItem[] = [
  { label: 'Step 1', value: 'Download the Reolink App and create an account' },
  { label: 'Step 2', value: 'Scan the QR code on the camera or device to pair' },
  { label: 'Step 3', value: 'Follow in-app prompts to configure Wi-Fi or connection' },
  { label: 'Step 4', value: 'Install device in final location and adjust angle' },
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
        { label: 'Camera', value: '4 × Argus 3 Pro Camera' },
        { label: 'Hub', value: '1 × Reolink Home Hub Mini' },
        ...defaultPackContent.slice(1)
      ],
      installation: defaultInstallation,
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
        { label: 'Camera', value: '2 × Argus PT Ultra Camera' },
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
      packContent: defaultPackContent,
      installation: defaultInstallation,
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
        { label: 'Camera', value: '2 × Argus Solar Camera' },
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
        { label: 'Doorbell', value: '1 × Video Doorbell' },
        { label: 'Chime', value: '1 × Reolink Chime' },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { label: 'Step 1', value: 'Mount the wedge/bracket near your door' },
        { label: 'Step 2', value: 'Connect doorbell to power or use battery' },
        { label: 'Step 3', value: 'Plug in the Chime in an indoor socket' },
        { label: 'Step 4', value: 'Pair devices using the Reolink App' },
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
        { label: 'NVR', value: '1 × NVS8 NVR' },
        { label: 'Cameras', value: '4 × PoE Cameras' },
        { label: 'HDD', value: '1 × 2TB HDD pre-installed' },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { label: 'Step 1', value: 'Connect cameras to NVR using Ethernet cables' },
        { label: 'Step 2', value: 'Connect NVR to your router and a monitor' },
        { label: 'Step 3', value: 'Power on the NVR and follow setup wizard' },
        { label: 'Step 4', value: 'Mount cameras in desired locations' },
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
        { label: 'NVR', value: '1 × NVS8 NVR' },
        { label: 'Cameras', value: '4 × PoE Dome Cameras' },
        { label: 'HDD', value: '1 × 2TB HDD pre-installed' },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { label: 'Step 1', value: 'Connect cameras to NVR using Ethernet cables' },
        { label: 'Step 2', value: 'Connect NVR to your router and a monitor' },
        { label: 'Step 3', value: 'Power on the NVR and follow setup wizard' },
        { label: 'Step 4', value: 'Mount cameras in desired locations' },
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
        { label: 'NVR', value: '1 × NVS8 NVR' },
        { label: 'Cameras', value: '6 × 12MP PoE Dome Cameras' },
        { label: 'HDD', value: '1 × 2TB HDD pre-installed' },
        ...defaultPackContent.slice(1)
      ],
      installation: [
        { label: 'Step 1', value: 'Connect cameras to NVR using Ethernet cables' },
        { label: 'Step 2', value: 'Connect NVR to your router and a monitor' },
        { label: 'Step 3', value: 'Power on the NVR and follow setup wizard' },
        { label: 'Step 4', value: 'Mount cameras in desired locations' },
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
