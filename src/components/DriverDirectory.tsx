import { useState } from 'react'
import { drivers } from '../data/drivers'
import { teams } from '../data/teams'
import { filterDrivers } from '../lib/filterDrivers'
import { DriverCard } from './DriverCard'

const controlClass =
  'min-h-11 rounded-lg border border-graphite bg-carbon text-paper placeholder:text-mist focus-visible:outline-paper'

export function DriverDirectory() {
  const [query, setQuery] = useState('')
  const [teamId, setTeamId] = useState<string | null>(null)
  const visible = filterDrivers(drivers, query, teamId)

  return (
    <section className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <h1 className="font-display text-3xl text-paper sm:text-4xl">2026 drivers</h1>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search drivers</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-mist"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            aria-label="Search drivers"
            placeholder="Search drivers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${controlClass} w-full pl-10 pr-4`}
          />
        </label>
        <select
          aria-label="Filter by team"
          value={teamId ?? ''}
          onChange={(e) => setTeamId(e.target.value || null)}
          className={`${controlClass} px-3`}
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
        <p role="status" className="text-mist">
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
