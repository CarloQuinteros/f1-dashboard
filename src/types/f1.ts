export interface Team {
  /** Jolpica constructorId, e.g. "red_bull". Join key with the API. */
  id: string
  name: string
  nationality: string
  /** Brand color as a hex string, used as the team accent. */
  color: string
  base: string
  /** null until verified. */
  teamPrincipal: string | null
  /** null until written. */
  bio: string | null
  /** Optional path to a logo. Falls back to a placeholder when missing. */
  logo?: string
}

export interface Driver {
  /** Jolpica driverId, e.g. "max_verstappen". Join key with the API. */
  id: string
  number: number
  code: string
  givenName: string
  familyName: string
  nationality: string
  /** ISO date, yyyy-mm-dd. */
  dateOfBirth: string
  /** Team id, must match a Team.id. */
  teamId: string
  /** null until written. */
  bio: string | null
  /** Optional path to a photo. Falls back to a placeholder when missing. */
  photo?: string
}
