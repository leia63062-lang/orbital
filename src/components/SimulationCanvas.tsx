
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface PlanetData {
  name: string
  color: string
  size: number
  distance: number
  speed: number
  phase: number
  height: number
}

const planets: PlanetData[] = [
  {
    name: 'Mercury',
    color: '#a9a39a',
    size: 0.13,
    distance: 2.2,
    speed: 1.1,
    phase: 0,
    height: 0,
  },
  {
    name: 'Venus',
    color: '#e6b875',
    size: 0.22,
    distance: 3.2,
    speed: 0.78,
    phase: 1.2,
    height: 0.08,
  },
  {
    name: 'Earth',
    color: '#368bdb',
    size: 0.25,
    distance: 4.4,
    speed: 0.58,
    phase: 2.4,
    height: -0.1,
  },
  {
    name: 'Mars',
    color: '#d76c4c',
    size: 0.19,
    distance: 5.6,
    speed: 0.42,
    phase: 3.5,
    height: 0.16,
  },
  {
    name: 'Jupiter',
    color: '#d7ae83',
    size: 0.53,
    distance: 7.4,
    speed: 0.25,
    phase: 4.4,
    height: -0.12,
  },
]

function Sun() {
  return (
    <group>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1.35, 48, 48]} />
        <meshBasicMaterial
          color="#ff9d42"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.08, 48, 48]} />
        <meshBasicMaterial
          color="#ffbb55"
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Star surface */}
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial
          color="#ffbd62"
          emissive="#ff8a20"
          emissiveIntensity={3}
          roughness={0.8}
        />
      </mesh>

      <pointLight
        color="#ffb45c"
        intensity={100}
        distance={35}
        decay={2}
      />
    </group>
  )
}

function Planet({ planet }: { planet: PlanetData }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const angle =
      state.clock.elapsedTime * planet.speed + planet.phase

    meshRef.current.position.set(
      Math.cos(angle) * planet.distance,
      planet.height + Math.sin(angle * 0.7) * 0.08,
      Math.sin(angle) * planet.distance,
    )

    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[planet.size, 48, 48]} />
      <meshStandardMaterial
        color={planet.color}
        roughness={0.78}
        metalness={0.08}
      />
    </mesh>
  )
}

function OrbitPath({ distance }: { distance: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[distance, 0.008, 8, 180]} />
      <meshBasicMaterial
        color="#52718e"
        transparent
        opacity={0.32}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050812']} />

      <ambientLight intensity={0.3} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#d9eaff"
      />

      <Stars
        radius={100}
        depth={60}
        count={3500}
        factor={4}
        saturation={0.15}
        fade
        speed={0.35}
      />

      <Sun />

      {planets.map((planet) => (
        <group key={planet.name}>
          <OrbitPath distance={planet.distance} />
          <Planet planet={planet} />
        </group>
      ))}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI * 0.85}
      />
    </>
  )
}

export default function SimulationCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 10, 18],
        fov: 45,
        near: 0.1,
        far: 200,
      }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Scene />
    </Canvas>
  )
}
