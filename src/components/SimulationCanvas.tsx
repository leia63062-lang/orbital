
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface Props {
  running: boolean
  speed: number
  selected: string
  showOrbits: boolean
  showLabels: boolean
}

const bodies = [
  { name: 'Mercury', color: '#a9a49b', size: 0.16, distance: 2.2, period: 0.24, phase: 0.5 },
  { name: 'Venus', color: '#d9b17d', size: 0.25, distance: 3.3, period: 0.62, phase: 1.5 },
  { name: 'Earth', color: '#438ed0', size: 0.29, distance: 4.5, period: 1, phase: 2.7 },
  { name: 'Mars', color: '#c76f55', size: 0.23, distance: 5.8, period: 1.88, phase: 3.8 },
  { name: 'Jupiter', color: '#c9a783', size: 0.59, distance: 7.8, period: 11.86, phase: 4.8 },
  { name: 'Saturn', color: '#d4c093', size: 0.49, distance: 10, period: 29.4, phase: 5.6, ring: true },
]

function Sun({ selected }: { selected: boolean }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.035
  })

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.78, 64, 64]} />
        <meshBasicMaterial color="#ffbd70" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.84, 48, 48]} />
        <meshBasicMaterial
          color={selected ? '#fff0c9' : '#ffad58'}
          transparent
          opacity={selected ? 0.2 : 0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {selected && (
        <mesh>
          <sphereGeometry args={[1.02, 48, 48]} />
          <meshBasicMaterial color="#ffc477" wireframe transparent opacity={0.16} />
        </mesh>
      )}
      <pointLight color="#ffd09a" intensity={100} distance={40} decay={2} />
      <Html position={[0, 1.15, 0]} center distanceFactor={15}>
        <span className="pointer-events-none whitespace-nowrap text-[10px] font-medium tracking-[0.2em] text-amber-200/80">
          SOL
        </span>
      </Html>
    </group>
  )
}

function Planet({
  data,
  running,
  speed,
  selected,
  showLabels,
}: {
  data: (typeof bodies)[number]
  running: boolean
  speed: number
  selected: boolean
  showLabels: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const angle = useRef(data.phase)

  useFrame((_, delta) => {
    if (!group.current || !mesh.current || !running) return

    angle.current += (delta * speed * 0.42) / Math.sqrt(data.period)
    group.current.position.set(
      Math.cos(angle.current) * data.distance,
      0,
      Math.sin(angle.current) * data.distance,
    )
    mesh.current.rotation.y += delta * speed * 0.12
  })

  return (
    <group ref={group} position={[
      Math.cos(data.phase) * data.distance,
      0,
      Math.sin(data.phase) * data.distance,
    ]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[data.size, 64, 64]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.86}
          metalness={0.02}
          emissive={selected ? data.color : '#000000'}
          emissiveIntensity={selected ? 0.38 : 0}
        />
      </mesh>

      {selected && (
        <mesh>
          <sphereGeometry args={[data.size * 1.2, 32, 32]} />
          <meshBasicMaterial
            color="#8bdfff"
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>
      )}

      {data.ring && (
        <group rotation={[Math.PI / 2.3, 0.12, 0.12]}>
          <mesh>
            <ringGeometry args={[data.size * 1.35, data.size * 2.15, 128]} />
            <meshStandardMaterial
              color="#bca77f"
              roughness={0.95}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[data.size * 1.55, data.size * 1.7, 128]} />
            <meshBasicMaterial
              color="#e6d5b4"
              transparent
              opacity={0.45}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {showLabels && (
        <Html position={[0, data.size + 0.25, 0]} center distanceFactor={16}>
          <span className={`pointer-events-none whitespace-nowrap text-[9px] tracking-[0.14em] ${selected ? 'text-cyan-200' : 'text-slate-400/70'}`}>
            {data.name.toUpperCase()}
          </span>
        </Html>
      )}
    </group>
  )
}

function OrbitPath({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 6, 200]} />
      <meshBasicMaterial
        color="#78a5c2"
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </mesh>
  )
}

function Scene(props: Props) {
  return (
    <>
      <color attach="background" args={['#050914']} />
      <fog attach="fog" args={['#050914', 26, 48]} />
      <ambientLight intensity={0.36} />
      <directionalLight position={[8, 10, 5]} intensity={1.15} color="#dceaff" />
      <Stars radius={85} depth={55} count={2200} factor={2} saturation={0.12} fade speed={0.12} />

      <Sun selected={props.selected === 'Sol'} />

      {props.showOrbits && bodies.map((body) => (
        <OrbitPath key={body.name} radius={body.distance} />
      ))}

      {bodies.map((body) => (
        <Planet
          key={body.name}
          data={body}
          running={props.running}
          speed={props.speed}
          selected={props.selected === body.name}
          showLabels={props.showLabels}
        />
      ))}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minDistance={7}
        maxDistance={24}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI * 0.78}
        target={[0, 0, 0]}
      />
    </>
  )
}

export default function SimulationCanvas(props: Props) {
  return (
    <Canvas
      camera={{ position: [0, 14, 19], fov: 40, near: 0.1, far: 120 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <Scene {...props} />
    </Canvas>
  )
}
