export type UserRole = 'attendee' | 'organizer' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface EventPricing {
  tier: 'general' | 'vip' | 'custom';
  label: string;
  price: number;
  currency: string;
  quantity?: number;
  benefits?: string[];
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location: {
    city?: string;
    country?: string;
    address?: string;
    isVirtual?: boolean;
  };
  status: string;
  pricing: EventPricing[];
  media?: { url: string; type: 'image' | 'video' }[];
}

export interface Ticket {
  _id: string;
  event: Event;
  type: EventPricing['tier'];
  price: number;
  status: 'active' | 'cancelled' | 'transferred';
}

