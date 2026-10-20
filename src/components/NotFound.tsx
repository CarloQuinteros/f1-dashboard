import { Link } from 'react-router-dom'

interface NotFoundProps {
  message: string
}

export function NotFound({ message }: NotFoundProps) {
  return (
    <section className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="text-2xl font-semibold text-slate-900">{message}</h1>
      <Link to="/" className="inline-block min-h-11 py-3 text-red-600 underline">
        Back to home
      </Link>
    </section>
  )
}
