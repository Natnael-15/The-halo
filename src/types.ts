export type ResidenceType = 'Studio' | 'One-Bed' | 'Two-Bed' | 'Penthouse';

export interface Residence {
  id: string;
  name: string;
  type: ResidenceType;
  floor: number;
  price: number;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image: string;
  features: string[];
  exposure: string;
  isAvailable: boolean;
  floorplanSvgPath: string; // Architectural SVG vector layout path
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  hours: string;
  location: string;
}

export interface ViewingRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  residenceId: string;
  notes?: string;
  confirmed: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Amenity' | 'Detail';
  image: string;
  description: string;
}

