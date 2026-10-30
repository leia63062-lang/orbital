
import {
  Activity,
  Atom,
  CircleDot,
  Gauge,
  Orbit,
  Settings2,
  Zap,
} from 'lucide-react'

import SimulationCanvas from './components/SimulationCanvas'

const metrics = [
  { label: 'CELESTIAL BODIES', value: '06', unit: 'OBJECTS' },
  { label: 'GRAVITATIONAL CONSTANT', value: '1.000', unit: 'SCALED' },
  { label: 'SIMULATION ENGINE', value: '3D', unit: 'RENDERER' },
  { label: 'SYSTEM STATUS', value: 'ACTIVE', unit: 'PREVIEW' },
]

function App() {
  return (
    <main className="min-h-screen bg-[#050812] text-slate-100">
      {/* HEADER */}
      <header className="flex h-[76px] items-center justify-between border-b border-white/[0.08] px-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08]">
            <Orbit className="text-cyan-300" size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-[0.22em]">
              ORBITAL<span className="text-cyan-300">.</span>
            </h1>
            <p className="text-[9px] tracking-[0.2em] text-slate-500">
              ORBITAL DYNAMICS LABORATORY
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] tracking-widest text-emerald-300">
            LIVE PREVIEW
          </span>
        </div>

        <button
          aria-label="Settings"
          className="rounded-lg border border-white/10 p-2.5 text-slate-400 hover:bg-white/5"
        >
          <Settings2 size={19} />
        </button>
      </header>

      <div className="mx-auto max-w-[1800px] p-4 md:p-8">
        {/* TITLE */}
        <section className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.22em] text-cyan-300">
              <Atom size={15} />
              ASTROPHYSICS / SIMULATION 001
            </div>

            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Orbital Mechanics
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Explore the dynamics of celestial bodies in a
              three-dimensional gravitational environment.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-slate-400">
            <Zap size={15} className="text-cyan-300" />
            INTERACTIVE 3D ENVIRONMENT
          </div>
        </section>

        {/* METRICS */}
        <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-xl border border-white/[0.08] bg-[#0b1120] p-4"
            >
              <p className="text-[9px] tracking-[0.16em] text-slate-500">
                {metric.label}
              </p>

              <div className="mt-3 flex items-end justify-between gap-2">
                <span className="font-mono text-2xl font-medium">
                  {metric.value}
                </span>

                <span className="pb-1 text-[9px] text-slate-600">
                  {metric.unit}
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* MAIN SIMULATION */}
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="relative h-[520px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#050812] md:h-[680px]">
            <div className="pointer-events-none absolute left-5 top-5 z-10">
              <p className="text-[10px] tracking-[0.2em] text-cyan-300">
                UNIVERSE VIEWPORT
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                PERSPECTIVE / 3D CARTESIAN
              </p>
            </div>

            <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex items-center gap-2 text-[10px] text-slate-500">
              <CircleDot size={13} className="text-cyan-300" />
              DRAG TO ROTATE · SCROLL TO ZOOM
            </div>

            <SimulationCanvas />
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="flex flex-col gap-4">
            <section className="rounded-xl border border-white/[0.08] bg-[#0b1120] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  Environment
                </h3>
                <Gauge size={17} className="text-cyan-300" />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Initial planetary system preview.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  ['Star', '#ffb45c'],
                  ['Planetary orbit', '#52718e'],
                  ['Planetary bodies', '#4ba8df'],
                ].map(([label, color]) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-xs text-slate-400"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {label}
                  </div>
                ))}
              </div>
            </section>

            <section className="flex-1 rounded-xl border border-white/[0.08] bg-[#0b1120] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  System information
                </h3>
                <Activity size={17} className="text-cyan-300" />
              </div>

              <div className="mt-5 space-y-4">
                {[
                  ['Central object', 'Star'],
                  ['Planetary bodies', '05'],
                  ['Spatial dimensions', '3D'],
                  ['Rendering engine', 'Three.js'],
                  ['Camera', 'Perspective'],
                  ['Motion model', 'Illustrative'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 text-xs"
                  >
                    <span className="text-slate-500">{label}</span>
                    <span className="font-mono text-slate-300">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <footer className="mt-5 flex flex-wrap justify-between gap-3 text-[9px] tracking-widest text-slate-600">
          <span>ORBITAL LABORATORY</span>
          <span>VERSION 0.1.0 · DEVELOPMENT</span>
        </footer>
      </div>
    </main>
  )
}

export default App
