import { describe, expect, it } from 'vitest'
import { drivers } from '../data/drivers'
import { flagUrl } from './countries'

describe('flagUrl', () => {
  it('returns a flag image for every driver nationality', () => {
    const unmapped = drivers.map((d) => d.nationality).filter((n) => flagUrl(n) === null)

    expect(unmapped).toEqual([])
  })

  it('returns null for an unknown nationality', () => {
    expect(flagUrl('Martian')).toBeNull()
  })
})
