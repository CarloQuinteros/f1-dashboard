import { Link, useParams } from 'react-router-dom'
import { DriverCard } from '../components/DriverCard'
import { NotFound } from '../components/NotFound'
import { drivers } from '../data/drivers'
import { teams } from '../data/teams'
import { readableInk } from '../lib/readableInk'

export function TeamPage() {
  const { teamId } = useParams()
  const team = teams.find((t) => t.id === teamId)

  if (!team) {
    return <NotFound message="Team not found" />
  }

  const roster = drivers.filter((d) => d.teamId === team.id)
  const ink = readableInk(team.color)

  return (
    <article className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <Link to="/" className="inline-block min-h-11 py-3 text-sm text-mist underline underline-offset-4">
        All drivers
      </Link>

      <header className="space-y-2 rounded-lg p-6 sm:p-10" style={{ backgroundColor: team.color, color: ink }}>
        <h1 className="font-display text-4xl leading-none sm:text-6xl">{team.name}</h1>
        <p className="text-lg">{team.nationality}</p>
      </header>

      <dl className="grid gap-4 rounded-lg bg-carbon p-5 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-mist">Base</dt>
          <dd className="mt-1 text-lg font-semibold text-paper">{team.base}</dd>
        </div>
        <div>
          <dt className="text-sm text-mist">Team principal</dt>
          <dd className="mt-1 text-lg font-semibold text-paper">{team.teamPrincipal ?? 'Not yet published'}</dd>
        </div>
      </dl>

      {team.bio && <p className="max-w-prose text-paper">{team.bio}</p>}

      <section aria-labelledby="team-drivers" className="space-y-4">
        <h2 id="team-drivers" className="font-display text-2xl text-paper">
          Drivers
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {roster.map((driver) => (
            <li key={driver.id}>
              <DriverCard driver={driver} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
