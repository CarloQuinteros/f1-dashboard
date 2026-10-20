import { Link, useParams } from 'react-router-dom'
import { NotFound } from '../components/NotFound'
import { drivers } from '../data/drivers'
import { teams } from '../data/teams'

export function TeamPage() {
  const { teamId } = useParams()
  const team = teams.find((t) => t.id === teamId)

  if (!team) {
    return <NotFound message="Team not found" />
  }

  const roster = drivers.filter((d) => d.teamId === team.id)

  return (
    <article className="mx-auto max-w-3xl space-y-6 p-4">
      <Link to="/" className="inline-block min-h-11 py-3 text-sm text-slate-600 underline">
        ← All drivers
      </Link>

      <header className="space-y-2 border-l-8 pl-4" style={{ borderLeftColor: team.color }}>
        <h1 className="text-3xl font-bold text-slate-900">{team.name}</h1>
        <p className="text-slate-700">{team.nationality}</p>
      </header>

      <dl className="grid gap-4 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-2">
        <div>
          <dt className="text-sm text-slate-500">Base</dt>
          <dd className="font-medium text-slate-900">{team.base}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Team principal</dt>
          <dd className="font-medium text-slate-900">{team.teamPrincipal ?? 'Not yet published'}</dd>
        </div>
      </dl>

      {team.bio && <p className="text-slate-700">{team.bio}</p>}

      <section aria-labelledby="team-drivers">
        <h2 id="team-drivers" className="mb-3 text-xl font-semibold text-slate-900">
          Drivers
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {roster.map((driver) => (
            <li key={driver.id}>
              <Link
                to={`/drivers/${driver.id}`}
                className="flex min-h-11 items-center justify-between rounded-xl bg-white p-4 shadow-sm"
              >
                <span className="font-medium text-slate-900">
                  {driver.givenName} {driver.familyName}
                </span>
                <span className="text-sm text-slate-500">#{driver.number}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
