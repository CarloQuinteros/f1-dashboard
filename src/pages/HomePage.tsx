import { Link } from 'react-router-dom'
import { DriverDirectory } from '../components/DriverDirectory'
import { teams } from '../data/teams'

export function HomePage() {
  return (
    <>
      <DriverDirectory />

      <nav aria-labelledby="teams-heading" className="mx-auto max-w-6xl space-y-4 p-4">
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
