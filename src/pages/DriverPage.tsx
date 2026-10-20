import { Link, useParams } from 'react-router-dom'
import { DriverStats } from '../components/DriverStats'
import { FallbackImage } from '../components/FallbackImage'
import { NotFound } from '../components/NotFound'
import { drivers } from '../data/drivers'
import { teams } from '../data/teams'
import { flagUrl } from '../lib/countries'
import { readableInk } from '../lib/readableInk'

export function DriverPage() {
  const { driverId } = useParams()
  const driver = drivers.find((d) => d.id === driverId)

  if (!driver) {
    return <NotFound message="Driver not found" />
  }

  const team = teams.find((t) => t.id === driver.teamId)
  const fullName = `${driver.givenName} ${driver.familyName}`
  const ink = team ? readableInk(team.color) : undefined
  const birthDate = new Date(`${driver.dateOfBirth}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <Link to="/" className="inline-block min-h-11 py-3 text-sm text-mist underline underline-offset-4">
        All drivers
      </Link>

      <section
        className="flex flex-col-reverse items-end gap-6 overflow-hidden rounded-lg p-6 sm:flex-row sm:p-10"
        style={{ backgroundColor: team?.color, color: ink }}
      >
        <div className="min-w-0 flex-1 space-y-3">
          <h1 className="font-display text-4xl leading-none sm:text-6xl">
            {driver.givenName} <span className="block">{driver.familyName}</span>
          </h1>
          <p className="flex items-center gap-3 text-lg">
            <span className="font-display text-2xl leading-none">#{driver.number}</span>
            <span className="font-semibold">{driver.code}</span>
          </p>
          <p className="flex items-center gap-2">
            <FallbackImage
              src={flagUrl(driver.nationality)}
              alt=""
              label={driver.nationality}
              className="h-4 w-6 shrink-0 object-cover"
            />
            {driver.nationality}
          </p>
          {team && (
            <Link to={`/teams/${team.id}`} className="inline-block min-h-11 py-3 font-semibold underline underline-offset-4">
              {team.name}
            </Link>
          )}
        </div>

        <FallbackImage
          src={driver.photo}
          alt={fullName}
          label={driver.code}
          className="h-64 w-auto max-w-full shrink-0 object-contain object-bottom sm:h-80"
        />
      </section>

      <dl className="rounded-lg bg-carbon p-5">
        <dt className="text-sm text-mist">Date of birth</dt>
        <dd className="mt-1 text-lg font-semibold text-paper">{birthDate}</dd>
      </dl>

      {driver.bio && <p className="max-w-prose text-paper">{driver.bio}</p>}

      <DriverStats driverId={driver.id} />
    </article>
  )
}
