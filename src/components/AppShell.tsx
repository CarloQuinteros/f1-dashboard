import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center border-b-[3px] px-3 text-sm font-semibold transition-colors ${
    isActive ? 'border-f1-red text-paper' : 'border-transparent text-mist hover:text-paper'
  }`

const teamsLinkClass = 'inline-flex min-h-11 items-center border-b-[3px] border-transparent px-3 text-sm font-semibold text-mist transition-colors hover:text-paper'

export function AppShell() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4">
          <Link to="/" className="font-display inline-flex min-h-11 items-center text-lg text-paper">
            F1 Dashboard
          </Link>
          <nav aria-label="Main" className="flex">
            <NavLink to="/" end className={navLinkClass}>
              Drivers
            </NavLink>
            <Link to="/#teams" className={teamsLinkClass}>
              Teams
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
