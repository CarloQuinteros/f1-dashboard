import { Link, useParams } from 'react-router-dom'
import { DriverStats } from '../components/DriverStats'
import { FallbackImage } from '../components/FallbackImage'
import { NotFound } from '../components/NotFound'
import { drivers } from '../data/drivers'
import { teams } from '../data/teams'
import { flagUrl } from '../lib/countries'

export function DriverPage() {
  const { driverId } = useParams()
  const driver = drivers.find((d) => d.id === driverId)

  if (!driver) {
    return <NotFound message="Driver not found" />
  }

  const team = teams.find((t) => t.id === driver.teamId)
  const fullName = `${driver.givenName} ${driver.familyName}`
  const birthDate = new Date(`${driver.dateOfBirth}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="mx-auto max-w-3xl space-y-6 p-4">
      <Link to="/" className="inline-block min-h-11 py-3 text-sm text-slate-600 underline">
        ← All drivers
      </Link>

      <header className="flex items-center gap-6">
        <FallbackImage
          src={driver.photo}
          alt={fullName}
          label={driver.code}
          className="h-24 w-24 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm text-slate-500">
            #{driver.number} · {driver.code}
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{fullName}</h1>
          <p className="mt-1 flex items-center gap-2 text-slate-700">
            <FallbackImage
              src={flagUrl(driver.nationality)}
              alt={driver.nationality}
              label={driver.nationality}
              className="h-4 w-6 shrink-0 object-cover"
            />
            {driver.nationality}
          </p>
          {team && (
            <Link
              to={`/teams/${team.id}`}
              className="mt-2 inline-block min-h-11 py-3 font-medium underline"
              style={{ color: team.color }}
            >
              {team.name}
            </Link>
          )}
        </div>
      </header>

      <dl className="rounded-xl bg-white p-4 shadow-sm">
        <dt className="text-sm text-slate-500">Date of birth</dt>
        <dd className="font-medium text-slate-900">{birthDate}</dd>
      </dl>

      {driver.bio && <p className="text-slate-700">{driver.bio}</p>}

      <DriverStats driverId={driver.id} />
    </article>
  )
}
