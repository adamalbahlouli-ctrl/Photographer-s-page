// ============================================================
// AVAILABILITY DATA — Demo/fictional data only.
// Replace with real availability from your booking system.
// ============================================================

export const AVAILABILITY_STATUS = {
  AVAILABLE: 'available',
  LIMITED: 'limited',
  UNAVAILABLE: 'unavailable',
};

// Fictional demo calendar — status by date string 'YYYY-MM-DD'
export const availabilityCalendar = {
  // October 2026
  '2026-10-04': AVAILABILITY_STATUS.AVAILABLE,
  '2026-10-05': AVAILABILITY_STATUS.AVAILABLE,
  '2026-10-10': AVAILABILITY_STATUS.LIMITED,
  '2026-10-11': AVAILABILITY_STATUS.AVAILABLE,
  '2026-10-12': AVAILABILITY_STATUS.UNAVAILABLE,
  '2026-10-17': AVAILABILITY_STATUS.AVAILABLE,
  '2026-10-18': AVAILABILITY_STATUS.AVAILABLE,
  '2026-10-19': AVAILABILITY_STATUS.LIMITED,
  '2026-10-24': AVAILABILITY_STATUS.UNAVAILABLE,
  '2026-10-25': AVAILABILITY_STATUS.AVAILABLE,
  '2026-10-26': AVAILABILITY_STATUS.AVAILABLE,
  '2026-10-31': AVAILABILITY_STATUS.AVAILABLE,
  // November 2026
  '2026-11-01': AVAILABILITY_STATUS.AVAILABLE,
  '2026-11-07': AVAILABILITY_STATUS.AVAILABLE,
  '2026-11-08': AVAILABILITY_STATUS.LIMITED,
  '2026-11-14': AVAILABILITY_STATUS.AVAILABLE,
  '2026-11-15': AVAILABILITY_STATUS.AVAILABLE,
  '2026-11-21': AVAILABILITY_STATUS.UNAVAILABLE,
  '2026-11-22': AVAILABILITY_STATUS.LIMITED,
  '2026-11-28': AVAILABILITY_STATUS.AVAILABLE,
  '2026-11-29': AVAILABILITY_STATUS.AVAILABLE,
};

export const sessionTypes = [
  { value: 'portrait', label: 'Portrait Session' },
  { value: 'wedding', label: 'Wedding Photography' },
  { value: 'couples', label: 'Couples Session' },
  { value: 'editorial', label: 'Editorial & Brand' },
  { value: 'lifestyle', label: 'Lifestyle Session' },
  { value: 'other', label: 'Other / Not sure yet' },
];

export const budgetRanges = [
  { value: 'under-250', label: 'Under $250' },
  { value: '250-500', label: '$250 – $500' },
  { value: '500-1000', label: '$500 – $1,000' },
  { value: '1000-plus', label: '$1,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];
