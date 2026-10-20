import { Link } from 'react-router-dom'
import { readableInk } from '../lib/readableInk'
import { teams } from '../data/teams'
import type { Driver } from '../types/f1'
import { FallbackImage } from './FallbackImage'

interface DriverCardProps {
  driver: Driver
}

export function DriverCard({ driver }: DriverCardProps) {
  const team = teams.find((t) => t.id === driver.teamId)
  const fullName = `${driver.givenName} ${driver.familyName}`
  const ink = team ? readableInk(team.color) : undefined

  return (
    <Link
      to={`/drivers/${driver.id}`}
      className="group flex min-h-11 overflow-hidden rounded-lg bg-carbon transition-shadow hover:ring-1 hover:ring-graphite sm:flex-col"
    >
      <div
        className="relative flex w-28 shrink-0 items-end justify-center overflow-hidden sm:h-48 sm:w-full"
        style={{ backgroundColor: team?.color, color: ink }}
      >
        <span className="font-display absolute left-3 top-2 text-3xl leading-none">{driver.number}</span>
        <FallbackImage
          src={driver.photo}
          alt={fullName}
          label={driver.code}
          className="h-full w-full object-contain object-bottom transition-transform duration-150 group-hover:-translate-y-1 motion-reduce:transition-none"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4 sm:p-5">
        <h2 className="font-display truncate text-xl leading-tight text-paper">
          {driver.givenName} <span className="block">{driver.familyName}</span>
        </h2>
        <p className="truncate text-sm text-mist">{team?.name}</p>
      </div>
    </Link>
  )
}
