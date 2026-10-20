import { useQuery } from '@tanstack/react-query'
import { currentStandingsQuery, driverWinsQuery } from '../api/queries'

interface StatProps<T> {
  label: string
  query: { isPending: boolean; isError: boolean; data?: T }
  render: (data: T) => string
}

function Stat<T>({ label, query, render }: StatProps<T>) {
  let value = 'Loading…'

  if (query.isError) {
    value = 'Unavailable'
  } else if (!query.isPending && query.data !== undefined) {
    value = render(query.data)
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

interface DriverStatsProps {
  driverId: string
}

export function DriverStats({ driverId }: DriverStatsProps) {
  const wins = useQuery(driverWinsQuery(driverId))
  const standing = useQuery({
    ...currentStandingsQuery,
    select: (standings) => standings[driverId] ?? null,
  })

  return (
    <section aria-label="Live stats" className="grid gap-4 sm:grid-cols-2">
      <Stat label="Career race wins" query={wins} render={(total) => String(total)} />
      <Stat
        label="Current season"
        query={standing}
        render={(s) => (s ? `P${s.position} · ${s.points} pts` : 'No standing yet')}
      />
    </section>
  )
}
