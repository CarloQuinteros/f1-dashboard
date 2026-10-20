import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { currentStandingsQuery, driverWinsQuery } from '../api/queries'

interface StatProps<T> {
  label: string
  query: { isPending: boolean; isError: boolean; data?: T }
  render: (data: T) => ReactNode
}

function Stat<T>({ label, query, render }: StatProps<T>) {
  let value: ReactNode = <span className="text-lg text-mist">Loading…</span>

  if (query.isError) {
    value = <span className="text-lg text-mist">Unavailable</span>
  } else if (!query.isPending && query.data !== undefined) {
    value = render(query.data)
  }

  return (
    <div className="rounded-lg bg-carbon p-5">
      <p className="text-sm text-mist">{label}</p>
      <p className="font-display mt-2 text-4xl leading-none text-paper">{value}</p>
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
        render={(s) =>
          s ? (
            <>
              <span>P{s.position}</span>{' '}
              <span className="font-sans text-xl font-semibold text-mist">{s.points} pts</span>
            </>
          ) : (
            <span className="text-lg text-mist">No standing yet</span>
          )
        }
      />
    </section>
  )
}
