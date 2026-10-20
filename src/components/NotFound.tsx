import { Link } from 'react-router-dom'

interface NotFoundProps {
  message: string
}

export function NotFound({ message }: NotFoundProps) {
  return (
    <section className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <h1 className="font-display text-3xl text-paper">{message}</h1>
      <Link
        to="/"
        className="inline-block min-h-11 py-3 text-paper underline decoration-f1-red decoration-2 underline-offset-4"
      >
        Back to home
      </Link>
    </section>
  )
}
