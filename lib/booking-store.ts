'use client';

// Lightweight session-storage backed store for the booking wizard. No external deps.

import * as React from 'react';

export interface BookingState {
  barberId: string | null;
  serviceId: string | null;
  priceCents: number;
  durationMin: number;
  date: string | null; // YYYY-MM-DD
  dateLabel: string;
  time: string | null; // HH:mm
  name: string;
  phone: string;
  notes: string;
  consent: boolean;
}

const initialState: BookingState = {
  barberId: null,
  serviceId: null,
  priceCents: 0,
  durationMin: 30,
  date: null,
  dateLabel: '',
  time: null,
  name: '',
  phone: '',
  notes: '',
  consent: true,
};

const STORAGE_KEY = 'gb.booking';

type Listener = (s: BookingState) => void;

class Store {
  private state: BookingState = initialState;
  private listeners = new Set<Listener>();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) this.state = { ...initialState, ...JSON.parse(raw) };
      } catch {}
    }
  }

  get(): BookingState {
    return this.state;
  }

  set(partial: Partial<BookingState>) {
    this.state = { ...this.state, ...partial };
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch {}
    }
    this.listeners.forEach((l) => l(this.state));
  }

  reset() {
    this.state = initialState;
    if (typeof window !== 'undefined') sessionStorage.removeItem(STORAGE_KEY);
    this.listeners.forEach((l) => l(this.state));
  }

  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
}

let storeInstance: Store | null = null;
function getStore() {
  if (!storeInstance) storeInstance = new Store();
  return storeInstance;
}

export function useBookingStore() {
  const store = React.useMemo(() => getStore(), []);
  const [snap, setSnap] = React.useState<BookingState>(() => store.get());

  React.useEffect(() => store.subscribe(setSnap), [store]);

  return {
    ...snap,
    setBooking: (p: Partial<BookingState>) => store.set(p),
    resetBooking: () => store.reset(),
  };
}
