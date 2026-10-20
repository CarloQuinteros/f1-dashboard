// Demonyms used in the roster data, mapped to ISO 3166-1 alpha-2 codes for flag images.
const FLAG_CODES: Record<string, string> = {
  Argentine: 'ar',
  Australian: 'au',
  Brazilian: 'br',
  British: 'gb',
  Canadian: 'ca',
  Dutch: 'nl',
  Finnish: 'fi',
  French: 'fr',
  German: 'de',
  Italian: 'it',
  Mexican: 'mx',
  Monegasque: 'mc',
  'New Zealander': 'nz',
  Spanish: 'es',
  Thai: 'th',
}

/** Flag image URL for a demonym, or null when the nationality is not mapped. */
export function flagUrl(nationality: string): string | null {
  const code = FLAG_CODES[nationality]

  return code ? `https://flagcdn.com/w40/${code}.png` : null
}
