import { Link } from 'react-router-dom'
import { teams } from '../data/teams'
import type { Driver } from '../types/f1'
import { FallbackImage } from './FallbackImage'

interface DriverCardProps {
  driver: Driver
}

export function DriverCard({ driver }: DriverCardProps) {
  const team = teams.find((t) => t.id === driver.teamId)
  const fullName = `${driver.givenName} ${driver.familyName}`

  return (
    <Link
      to={`/drivers/${driver.id}`}
      className="flex min-h-11 items-center gap-4 rounded-xl border-l-4 bg-white p-4 shadow-sm transition hover:shadow-md"
      style={{ borderLeftColor: team?.color }}
    >
      <FallbackImage
        src={driver.photo}
        alt={fullName}
        label={driver.code}
        className="h-16 w-16 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="text-sm text-slate-500">
          #{driver.number} · {driver.code}
        </p>
        <h2 className="truncate font-semibold text-slate-900">{fullName}</h2>
        <p className="truncate text-sm text-slate-600">{team?.name}</p>
      </div>
    </Link>
  )
}
