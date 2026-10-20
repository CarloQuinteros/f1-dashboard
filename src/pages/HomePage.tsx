import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DriverDirectory } from '../components/DriverDirectory'
import { teams } from '../data/teams'

export function HomePage() {
  const { hash } = useLocation()

  // Client-side navigation to /#teams does not scroll on its own.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [hash])

  return (
    <>
      <DriverDirectory />

      <nav id="teams" aria-labelledby="teams-heading" className="mx-auto max-w-6xl scroll-mt-20 space-y-4 p-4">
        <h2 id="teams-heading" className="text-xl font-semibold text-slate-900">
          Teams
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => (
            <li key={team.id}>
              <Link
                to={`/teams/${team.id}`}
                className="flex min-h-11 items-center rounded-xl border-l-4 bg-white p-4 font-medium text-slate-900 shadow-sm"
                style={{ borderLeftColor: team.color }}
              >
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
