import type { Driver } from '../types/f1'

/** Lowercases and strips accents, so "perez" matches "Pérez". */
export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

/**
 * Keeps drivers whose name contains the search text and who belong to the
 * selected team. An empty search or a null team matches everything.
 */
export function filterDrivers(drivers: Driver[], query: string, teamId: string | null): Driver[] {
  const needle = normalizeText(query.trim())

  return drivers.filter((driver) => {
    if (teamId && driver.teamId !== teamId) {
      return false
    }

    if (!needle) {
      return true
    }

    return normalizeText(`${driver.givenName} ${driver.familyName}`).includes(needle)
  })
}
