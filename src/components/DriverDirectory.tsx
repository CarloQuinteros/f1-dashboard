import { useState } from 'react'
import { drivers } from '../data/drivers'
import { teams } from '../data/teams'
import { filterDrivers } from '../lib/filterDrivers'
import { DriverCard } from './DriverCard'

export function DriverDirectory() {
  const [query, setQuery] = useState('')
  const [teamId, setTeamId] = useState<string | null>(null)
  const visible = filterDrivers(drivers, query, teamId)

  return (
    <section className="mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          aria-label="Search drivers"
          placeholder="Search drivers"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-11 flex-1 rounded-lg border border-slate-300 px-4"
        />
        <select
          aria-label="Filter by team"
          value={teamId ?? ''}
          onChange={(e) => setTeamId(e.target.value || null)}
          className="min-h-11 rounded-lg border border-slate-300 bg-white px-3"
        >
          <option value="">All teams</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p role="status" className="text-slate-600">
          No drivers found.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((driver) => (
            <li key={driver.id}>
              <DriverCard driver={driver} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
