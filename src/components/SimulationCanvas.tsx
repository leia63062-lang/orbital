
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
  roughness: number
  emissive?: string
  ring?: boolean
}

const planets: PlanetData[] = [
  { name: 'Mercury', color: '#aaa69f', size: 0.20, distance: 2.5, speed: 1.1, phase: 0, height: 0, roughness: 0.9 },
  { name: 'Venus', color: '#e8bd7c', size: 0.31, distance: 3.8, speed: 0.78, phase: 1.2, height: 0.08, roughness: 0.75 },
  { name: 'Earth', color: '#277fd4', size: 0.36, distance: 5.2, speed: 0.58, phase: 2.4, height: -0.1, roughness: 0.65, emissive: '#071b36' },
  { name: 'Mars', color: '#cf6849', size: 0.29, distance: 6.7, speed: 0.42, phase: 3.5, height: 0.16, roughness: 0.85 },
  { name: 'Jupiter', color: '#d7ae83', size: 0.72, distance: 8.8, speed: 0.25, phase: 4.4, height: -0.12, roughness: 0.8 },
  { name: 'Saturn', color: '#d9c18f', size: 0.61, distance: 11.1, speed: 0.18, phase: 5.3, height: 0.1, roughness: 0.8, ring: true },
]

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += delta * 0.08
  })

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.65, 48, 48]} />
        <meshBasicMaterial color="#ff8b32" transparent opacity={0.045} side={THREE.BackSide} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.3, 48, 48]} />
        <meshBasicMaterial color="#ffae45" transparent opacity={0.09} side={THREE.BackSide} />
      </mesh>

      <mesh ref={sunRef}>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshStandardMaterial
          color="#ffb84d"
          emissive="#ff7417"
          emissiveIntensity={3.5}
          roughness={0.85}
        />
      </mesh>

      <pointLight color="#ffb45c" intensity={180} distance={45} decay={2} />
    </group>
  )
}

function Planet({ planet }: { planet: PlanetData }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return

    const angle = state.clock.elapsedTime * planet.speed + planet.phase

    groupRef.current.position.set(
      Math.cos(angle) * planet.distance,
      planet.height + Math.sin(angle * 0.7) * 0.08,
      Math.sin(angle) * planet.distance,
    )

    meshRef.current.rotation.y += delta * 0.35
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={planet.roughness}
          metalness={0.04}
          emissive={planet.emissive ?? '#000000'}
          emissiveIntensity={0.35}
        />
      </mesh>

      {planet.ring && (
        <mesh rotation={[Math.PI / 2.25, 0.15, 0.1]}>
          <ringGeometry args={[planet.size * 1.25, planet.size * 2.05, 96]} />
          <meshStandardMaterial
            color="#c9ad7d"
            side={THREE.DoubleSide}
            transparent
            opacity={0.82}
            roughness={0.9}
          />
        </mesh>
      )}

      <mesh>
        <sphereGeometry args={[planet.size * 1.12, 32, 32]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.045}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function OrbitPath({ distance }: { distance: number }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[distance, 0.012, 8, 240]} />
        <meshBasicMaterial color="#4d9db8" transparent opacity={0.48} />
      </mesh>
      <mesh>
        <torusGeometry args={[distance, 0.035, 8, 240]} />
        <meshBasicMaterial color="#3985aa" transparent opacity={0.055} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#030711']} />
      <fog attach="fog" args={['#030711', 25, 55]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[8, 10, 5]} intensity={1.2} color="#c8e2ff" />

      <Stars
        radius={100}
        depth={70}
        count={5000}
        factor={4}
        saturation={0.2}
        fade
        speed={0.25}
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
        dampingFactor={0.055}
        minDistance={8}
        maxDistance={30}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI * 0.85}
        target={[0, 0, 0]}
      />
    </>
  )
}

export default function SimulationCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 17, 23],
        fov: 42,
        near: 0.1,
        far: 200,
      }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      <Scene />
    </Canvas>
  )
}
