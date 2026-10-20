import { describe, expect, it } from 'vitest'
import { drivers } from '../data/drivers'
import { filterDrivers } from './filterDrivers'

const ids = (list: { id: string }[]) => list.map((d) => d.id)

describe('filterDrivers', () => {
  it('matches a partial name', () => {
    expect(ids(filterDrivers(drivers, 'verst', null))).toEqual(['max_verstappen'])
  })

  it('returns nothing when no name matches', () => {
    expect(filterDrivers(drivers, 'zzz', null)).toEqual([])
  })

  it('matches case-insensitively', () => {
    expect(ids(filterDrivers(drivers, 'NORRIS', null))).toEqual(['norris'])
  })

  it('ignores accents on both sides', () => {
    expect(ids(filterDrivers(drivers, 'perez', null))).toEqual(['perez'])
    expect(ids(filterDrivers(drivers, 'Hulkenberg', null))).toEqual(['hulkenberg'])
  })

  it('combines the team filter with the search text', () => {
    expect(ids(filterDrivers(drivers, 'hadjar', 'red_bull'))).toEqual(['hadjar'])
    expect(filterDrivers(drivers, 'lawson', 'red_bull')).toEqual([])
  })

  it('returns every driver when the search is cleared and no team is selected', () => {
    expect(filterDrivers(drivers, '', null)).toHaveLength(22)
    expect(filterDrivers(drivers, '   ', null)).toHaveLength(22)
  })

  it('returns the whole team when the search is cleared', () => {
    expect(ids(filterDrivers(drivers, '', 'ferrari'))).toEqual(['leclerc', 'hamilton'])
  })
})
