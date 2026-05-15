import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 200 }) {
  const mesh = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ],
        speed: 0.002 + Math.random() * 0.004,
        size: 0.02 + Math.random() * 0.04,
      })
    }
    return temp
  }, [count])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    particles.forEach((p, i) => {
      pos[i * 3] = p.position[0]
      pos[i * 3 + 1] = p.position[1]
      pos[i * 3 + 2] = p.position[2]
    })
    return pos
  }, [particles, count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.getElapsedTime()
    
    // Gentle floating animation
    const positions = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(time * particles[i].speed + i) * 0.002
      positions[i * 3] += Math.cos(time * particles[i].speed * 0.5 + i) * 0.001
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    
    // Subtle rotation
    mesh.current.rotation.y = time * 0.02
    mesh.current.rotation.x = time * 0.01
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingLights() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.getElapsedTime()
    group.current.children.forEach((light, i) => {
      light.position.y = Math.sin(time * 0.5 + i * 2) * 3
      light.position.x = Math.cos(time * 0.3 + i * 1.5) * 4
    })
  })

  return (
    <group ref={group}>
      <pointLight position={[2, 2, 2]} color="#00d4ff" intensity={2} distance={10} />
      <pointLight position={[-3, -1, 3]} color="#a855f7" intensity={2} distance={10} />
      <pointLight position={[0, 3, -2]} color="#22d3ee" intensity={1.5} distance={8} />
    </group>
  )
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <FloatingLights />
        <Particles count={150} />
      </Canvas>
    </div>
  )
}
