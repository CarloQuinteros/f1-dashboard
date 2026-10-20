import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center px-3 text-sm font-medium ${
    isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
  }`

export function AppShell() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4">
          <Link to="/" className="inline-flex min-h-11 items-center text-lg font-bold text-slate-900">
            F1 Dashboard
          </Link>
          <nav aria-label="Main" className="flex">
            <NavLink to="/" end className={navLinkClass}>
              Drivers
            </NavLink>
            <NavLink to="/#teams" className={navLinkClass}>
              Teams
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
