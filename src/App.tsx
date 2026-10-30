
import {
  Activity,
  Atom,
  CircleDot,
  Crosshair,
  Gauge,
  Orbit,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Satellite,
  Settings2,
  Timer,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import SimulationCanvas from './components/SimulationCanvas'

const bodies = [
  { name: 'Sol', type: 'STAR', color: '#ffb45c', mass: '1.000 M☉', distance: '0.00 AU' },
  { name: 'Mercury', type: 'PLANET', color: '#aaa69f', mass: '0.055 M⊕', distance: '0.39 AU' },
  { name: 'Venus', type: 'PLANET', color: '#e8bd7c', mass: '0.815 M⊕', distance: '0.72 AU' },
  { name: 'Earth', type: 'PLANET', color: '#368bdb', mass: '1.000 M⊕', distance: '1.00 AU' },
  { name: 'Mars', type: 'PLANET', color: '#cf6849', mass: '0.107 M⊕', distance: '1.52 AU' },
  { name: 'Jupiter', type: 'PLANET', color: '#d7ae83', mass: '317.8 M⊕', distance: '5.20 AU' },
  { name: 'Saturn', type: 'PLANET', color: '#d9c18f', mass: '95.2 M⊕', distance: '9.58 AU' },
]

const initialTelemetry = [
  { label: 'POSITION X', value: '0.000', unit: 'AU' },
  { label: 'POSITION Y', value: '0.000', unit: 'AU' },
  { label: 'VELOCITY', value: '0.000', unit: 'KM/S' },
  { label: 'ACCELERATION', value: '0.000', unit: 'M/S²' },
  { label: 'ORBITAL PERIOD', value: '—', unit: 'DAYS' },
]

function App() {
  const [running, setRunning] = useState(true)
  const [speed, setSpeed] = useState('1×')
  const [selected, setSelected] = useState('Earth')
  const [showOrbits, setShowOrbits] = useState(true)
  const [showLabels, setShowLabels] = useState(true)

  const selectedBody = bodies.find((body) => body.name === selected) ?? bodies[0]

  return (
    <main className="min-h-screen bg-[#030711] text-slate-200">
      <header className="flex h-[68px] items-center justify-between border-b border-white/[0.08] bg-[#070d19] px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.08]">
            <Orbit size={22} className="text-cyan-300" />
          </div>
          <div>
            <div className="text-base font-black tracking-[0.28em]">
              ORBITAL<span className="text-cyan-300">.</span>
            </div>
            <div className="text-[8px] tracking-[0.25em] text-slate-500">
              DEEP SPACE DYNAMICS
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-2 text-[9px] tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            SYSTEM ONLINE
          </div>
          <div className="h-5 w-px bg-white/10" />
          <div className="text-[9px] tracking-widest text-slate-500">
            SIMULATION <span className="text-slate-200">001</span>
          </div>
          <div className="text-[9px] tracking-widest text-slate-500">
            BUILD <span className="text-slate-200">0.2.0</span>
          </div>
        </div>

        <button className="rounded-lg border border-white/10 p-2 text-slate-400 hover:border-cyan-300/40 hover:text-cyan-300">
          <Settings2 size={18} />
        </button>
      </header>

      <section className="relative min-h-[calc(100vh-68px)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#10233a55_0%,transparent_65%)]" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-[9px] tracking-[0.24em] text-cyan-300">
              <Atom size={13} />
              MISSION CONTROL / SOL SYSTEM
            </div>
            <h1 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              Orbital Dynamics
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRunning(!running)}
              className="flex items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[10px] tracking-widest text-cyan-200 hover:bg-cyan-300/20"
            >
              {running ? <Pause size={13} /> : <Play size={13} />}
              {running ? 'PAUSE' : 'RESUME'}
            </button>
            <button
              onClick={() => setSpeed(speed === '1×' ? '10×' : speed === '10×' ? '100×' : '1×')}
              className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-[10px] text-slate-300 hover:border-white/30"
            >
              <Timer size={13} />
              {speed}
            </button>
            <button
              onClick={() => { setRunning(true); setSpeed('1×'); setSelected('Earth') }}
              className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-white"
              title="Reset interface"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        <div className="grid min-h-[650px] grid-cols-1 xl:grid-cols-[230px_minmax(0,1fr)_270px]">
          <aside className="relative z-10 border-b border-white/[0.07] bg-[#070d19]/90 p-4 xl:border-b-0 xl:border-r">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.2em] text-slate-500">OBJECT REGISTRY</span>
              <Satellite size={15} className="text-cyan-300" />
            </div>

            <div className="mb-3 text-[8px] tracking-widest text-slate-600">SOLAR SYSTEM / 07 OBJECTS</div>

            <div className="space-y-1">
              {bodies.map((body) => (
                <button
                  key={body.name}
                  onClick={() => setSelected(body.name)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                    selected === body.name
                      ? 'border-cyan-300/30 bg-cyan-300/[0.08]'
                      : 'border-transparent hover:bg-white/[0.04]'
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_12px_currentColor]"
                    style={{ backgroundColor: body.color, color: body.color }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-slate-200">{body.name}</span>
                    <span className="mt-1 block text-[8px] tracking-widest text-slate-600">{body.type}</span>
                  </span>
                  {selected === body.name && <Crosshair size={13} className="text-cyan-300" />}
                </button>
              ))}
            </div>

            <div className="mt-7 border-t border-white/[0.07] pt-5">
              <div className="mb-4 text-[9px] tracking-[0.2em] text-slate-500">VIEW OPTIONS</div>
              <button
                onClick={() => setShowOrbits(!showOrbits)}
                className="mb-3 flex w-full items-center justify-between text-xs text-slate-400"
              >
                Orbital paths
                <span className={showOrbits ? 'text-cyan-300' : 'text-slate-600'}>
                  {showOrbits ? 'ON' : 'OFF'}
                </span>
              </button>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className="flex w-full items-center justify-between text-xs text-slate-400"
              >
                Object labels
                <span className={showLabels ? 'text-cyan-300' : 'text-slate-600'}>
                  {showLabels ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </aside>

          <section className="relative min-h-[540px] overflow-hidden bg-[#030711]">
            <div className="pointer-events-none absolute inset-0 z-10">
              <div className="absolute left-5 top-5">
                <div className="text-[9px] tracking-[0.2em] text-cyan-300">LIVE UNIVERSE VIEW</div>
                <div className="mt-1 text-[8px] tracking-widest text-slate-600">HELIOCENTRIC / 3D SPACE</div>
              </div>

              <div className="absolute right-5 top-5 flex items-center gap-2 text-[8px] tracking-widest text-slate-500">
                <Radio size={12} className="text-emerald-400" />
                TELEMETRY LINK ACTIVE
              </div>

              <div className="absolute bottom-5 left-5 text-[8px] tracking-widest text-slate-500">
                DRAG TO ROTATE <span className="mx-2 text-cyan-300">/</span> SCROLL TO ZOOM
              </div>

              <div className="absolute bottom-5 right-5 text-[8px] tracking-widest text-slate-600">
                FRAME 001 <span className="text-cyan-300">●</span> 3D
              </div>
            </div>

            <div className="absolute inset-0">
              <SimulationCanvas />
            </div>

            <div className="pointer-events-none absolute inset-0 border border-white/[0.04]" />
          </section>

          <aside className="relative z-10 border-t border-white/[0.07] bg-[#070d19]/90 p-5 xl:border-l xl:border-t-0">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.2em] text-slate-500">TARGET TELEMETRY</span>
              <Activity size={15} className="text-cyan-300" />
            </div>

            <div className="mb-6 border-b border-white/[0.08] pb-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07]">
                <CircleDot size={23} style={{ color: selectedBody.color }} />
              </div>
              <div className="text-xl font-semibold">{selectedBody.name}</div>
              <div className="mt-1 text-[9px] tracking-[0.2em] text-cyan-300">{selectedBody.type} / SELECTED</div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="text-[8px] tracking-widest text-slate-600">MASS</div>
                <div className="mt-1 font-mono text-sm text-slate-200">{selectedBody.mass}</div>
              </div>
              <div>
                <div className="text-[8px] tracking-widest text-slate-600">ORBITAL DISTANCE</div>
                <div className="mt-1 font-mono text-sm text-slate-200">{selectedBody.distance}</div>
              </div>
              <div>
                <div className="text-[8px] tracking-widest text-slate-600">REFERENCE FRAME</div>
                <div className="mt-1 font-mono text-sm text-slate-200">HELIOCENTRIC</div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <div className="mb-4 flex items-center gap-2 text-[9px] tracking-widest text-slate-500">
                <Gauge size={13} className="text-cyan-300" />
                ENGINE STATUS
              </div>
              <div className="mb-3 flex justify-between text-[10px]">
                <span className="text-slate-500">Time scale</span>
                <span className="font-mono text-cyan-300">{speed}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Execution</span>
                <span className={running ? 'text-emerald-300' : 'text-amber-300'}>
                  {running ? 'RUNNING' : 'PAUSED'}
                </span>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-full w-[78%] rounded-full bg-cyan-300/70" />
              </div>
            </div>
          </aside>
        </div>

        <footer className="grid grid-cols-2 border-t border-white/[0.08] bg-[#070d19] md:grid-cols-5">
          {initialTelemetry.map((item) => (
            <div key={item.label} className="border-b border-r border-white/[0.06] px-5 py-4 md:border-b-0">
              <div className="text-[8px] tracking-[0.18em] text-slate-600">{item.label}</div>
              <div className="mt-2 font-mono text-lg text-slate-200">
                {item.value}
                <span className="ml-2 text-[8px] text-slate-600">{item.unit}</span>
              </div>
            </div>
          ))}
        </footer>

        <div className="flex flex-wrap justify-between gap-3 px-5 py-3 text-[8px] tracking-[0.18em] text-slate-700">
          <span>ORBITAL DEEP SPACE DYNAMICS LABORATORY</span>
          <span>DEVELOPMENT BUILD 0.2.0 / NOT FOR NAVIGATION</span>
        </div>
      </section>
    </main>
  )
}

export default App
