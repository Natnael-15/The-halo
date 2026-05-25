import { Residence, Amenity, GalleryItem } from './types';

export const RESIDENCES: Residence[] = [
  {
    id: 'aura-402',
    name: 'The Aura — Suite 402',
    type: 'Studio',
    floor: 4,
    price: 895000,
    sizeSqFt: 520,
    bedrooms: 0,
    bathrooms: 1,
    description: 'A masterpiece of architectural volume and spatial efficiency. The Aura features oversized floor-to-ceiling framing glass and textured travertine details, crafting a compact residence that breathes with elegant light, looking out across the historic mews.',
    image: '/images/studio-apartment-london.jpeg',
    features: [
      'Custom Belgian white oak panelling',
      'Integrated Miele convection suite',
      'Concealed double-bed pivot woodwork',
      'Honed travertine marble bathroom wetroom',
      'Triple-glazed acoustical performance glass'
    ],
    exposure: 'North-West (Sunsets & Curated Mews)',
    isAvailable: true,
    floorplanSvgPath: 'M 10 10 H 90 V 90 H 10 Z' // fallback / symbol
  },
  {
    id: 'horizon-1205',
    name: 'The Horizon — Suite 1205',
    type: 'One-Bed',
    floor: 12,
    price: 1420000,
    sizeSqFt: 840,
    bedrooms: 1,
    bathrooms: 1,
    description: 'Perfectly framing the dawn-swept London cityscape, The Horizon integrates an expansive parlour and culinary space with a private bedroom sanctuary, detailed with brushed champagne metal panels and bespoke finishes.',
    image: '/images/living-parlour-skyline.jpeg',
    features: [
      'Chevron white-oak soundproof flooring',
      'Arabescato marble monolith kitchen island',
      'Walk-in dressing parlour with bespoke internal lighting',
      'Private 80 sq ft recessed loggia balcony',
      'Rimadesio sliding glass partition systems'
    ],
    exposure: 'South-East (Sunrise & City Skyline)',
    isAvailable: true,
    floorplanSvgPath: 'M 10 10 H 90 V 90 H 10 Z'
  },
  {
    id: 'meridian-1801',
    name: 'The Meridian — Suite 1801',
    type: 'Two-Bed',
    floor: 18,
    price: 2650000,
    sizeSqFt: 1350,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Commanding dual-aspect panoramas from the 18th floor over Hyde Park, The Meridian pairs communal grandeur with structural privacy. A dynamic layout designed for warm hospitality and tranquil nights.',
    image: '/images/living-salon-hyde-park.jpeg',
    features: [
      'Bespoke stone column wraps & floor detailing',
      'Integrated Gaggenau master cooking suite',
      'Sub-Zero climate-controlled wine cellaring',
      'Master suite with freestanding volcanic stone bathtub',
      'Zoned state-of-the-art climate and ambient sound control'
    ],
    exposure: 'South-West (Golden Hour Vista & River Front)',
    isAvailable: true,
    floorplanSvgPath: 'M 10 10 H 90 V 90 H 10 Z'
  },
  {
    id: 'penthouse-2400',
    name: 'The Halo Penthouse — Suite 2400',
    type: 'Penthouse',
    floor: 24,
    price: 6950000,
    sizeSqFt: 3200,
    bedrooms: 3,
    bathrooms: 3.5,
    description: 'Occupying the entire pinnacle crown of The Halo, this double-height sky sanctuary represents the absolute pinnacle of high-end metropolitan design. Offering unlimited panoramic vistas over central London, private pool facilities, and endless luxury detailing.',
    image: '/images/halo-penthouse-view.jpeg',
    features: [
      'Direct-to-foyer private lift entry with biometric lock',
      'Private 40ft sky basin infinity pool & thermal wellness spa',
      'Statuario marble fireplace mantle & wet-bar salon',
      'Chef-grade preparator kitchen alongside display galley',
      'Savant architectural lighting & automated leather shades'
    ],
    exposure: '360-degree Unobstructed Skyline, Mountain & Waterfront Vista',
    isAvailable: true,
    floorplanSvgPath: 'M 10 10 H 90 V 90 H 10 Z'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'rooftop-pool',
    title: 'The Halo Sky Pool & Basin',
    description: 'An architectural marvel suspended at sunset, our heated 25-metre infinity pool appears to merge with the city skyline, framed by limestone columns and private cabanas.',
    image: '/images/halo-sky-pool.jpeg',
    features: [
      'Heated to a constant 28°C year-round',
      'Limestone sun loungers and climate-controlled VIP cabanas',
      'Poolside champagne and wellness tonic service',
      'Indoor-outdoor seamless thermodynamic threshold'
    ],
    hours: '06:00 AM – 11:00 PM Daily',
    location: 'Rooftop Summit — Floor 25'
  },
  {
    id: 'residents-lounge',
    title: 'The Meridian Club Lounge',
    description: 'Designed as a natural extension of your personal parlour, this wood-panelled lounge acts as a social nexus and focus space, complete with a sommelier-curated marble bar and intimate reading alcoves.',
    image: '/images/meridian-club-lounge.jpeg',
    features: [
      'Full-time evening bartender and certified sommelier',
      'Bespoke walk-in climate-controlled humidor and tasting tables',
      'Private soundproof screening theatre and boardroom',
      'Cozy double-sided fireplace clad in travertine monolith'
    ],
    hours: '08:00 AM – Midnight Daily',
    location: 'Club Level — Floor 5'
  },
  {
    id: 'wellness-gym',
    title: 'The Atrium Kinetic Wellbeing Centre',
    description: 'A bright, double-height athletic temple designed for deep personal health and kinetic peak performance, fitted with Technogym Artis collection systems and adjacent hot/cold recovery suites.',
    image: '/images/atrium-kinetic-wellbeing-centre.jpeg',
    features: [
      'Technogym Artis biometric-logging cardio and strength gear',
      'Private clinical treatment room for massage and therapy',
      'Finnish sauna crafted in natural red cedar and dual-plunge cold pools',
      'Bespoke hydration bar featuring fresh botanicals and adaptogens'
    ],
    hours: '24 Hour Private Keycard Access',
    location: 'Atrium Level — Floor 6'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Halo Exterior Facade',
    category: 'Exterior',
    image: '/images/halo-exterior-facade.jpeg',
    description: 'The striking curvilinear architecture of The Halo cutting an elegant figure against the golden London skyline.'
  },
  {
    id: 'gal-2',
    title: 'The Grand Living Salon',
    category: 'Interior',
    image: '/images/living-salon-architectural.jpeg',
    description: 'Sun-drenched interiors detailed with honed travertine columns, warm oak floors, and bespoke Italian furnishings.'
  },
  {
    id: 'gal-3',
    title: 'The Sky Pool suspensions',
    category: 'Amenity',
    image: '/images/suspended-glass-pool.jpeg',
    description: 'The 25-metre infinity sky pool seamlessly bridging the horizon, heated to a gentle 28°C year-round.'
  },
  {
    id: 'gal-4',
    title: 'Honed Travertine detailing',
    category: 'Detail',
    image: '/images/travertine-stone-luxury-material.jpeg',
    description: 'A close study of hand-polished silver-veined travertine stonework selected from Tuscan quarries.'
  },
  {
    id: 'gal-5',
    title: 'Culinary Master Galley',
    category: 'Interior',
    image: '/images/luxury-kitchen-marble-island.jpeg',
    description: 'Professional Gaggenau suites set deep within custom sand-blasted timber kitchen cabinets.'
  },
  {
    id: 'gal-6',
    title: 'The Meridian Reading Room',
    category: 'Amenity',
    image: '/images/meridian-reading-room.jpeg',
    description: 'The wood-panelled private residents club lounge, set up for evening cocktails and warm fireside chats.'
  },
  {
    id: 'gal-7',
    title: 'Master Rest Chamber',
    category: 'Interior',
    image: '/images/master-bedroom-suite.jpeg',
    description: 'An acoustically isolated sanctuary featuring silk wallcloth coverings and automated privacy blinds.'
  },
  {
    id: 'gal-8',
    title: 'Bespoke Brass Fittings',
    category: 'Detail',
    image: '/images/brass-faucet-details.jpeg',
    description: 'Finely-brushed warm metalware, offering smooth tactile control over the wellness steam flows.'
  },
  {
    id: 'gal-9',
    title: 'Stone Wetroom Spa Tub',
    category: 'Interior',
    image: '/images/stone-wetroom-spa-tub.jpeg',
    description: 'A freestanding oval soaking bath carved out of a single volcanic monolith, set on heated basalt stone.'
  }
];
