"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

function PerfumeBottle() {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bottle body */}
      <RoundedBox args={[1, 2.2, 0.55]} radius={0.18} smoothness={6} position={[0, -0.2, 0]}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.3}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.06}
          color="#b066ff"
        />
      </RoundedBox>
      {/* Liquid inside */}
      <RoundedBox args={[0.78, 1.6, 0.35]} radius={0.12} smoothness={4} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#ff6fb5" transparent opacity={0.7} />
      </RoundedBox>
      {/* Cap */}
      <RoundedBox args={[0.7, 0.35, 0.5]} radius={0.08} position={[0, 1.05, 0]}>
        <meshStandardMaterial color="#f5f0ff" metalness={0.6} roughness={0.2} />
      </RoundedBox>
      {/* Label */}
      <RoundedBox args={[0.72, 0.9, 0.08]} radius={0.04} position={[0, -0.2, 0.32]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
      </RoundedBox>
    </group>
  );
}

export default function Hero({ onFindScent }) {
  return (
    <section className={styles.hero}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.content}
      >
        <span className={`${styles.badge} glass`}>✨ AI Powered</span>
        <h1 className={styles.h1}>
          Your AI Powered<br />
          <span className="text-gradient">Perfume Finder</span>
        </h1>
        <p className={styles.sub}>
          Discover your perfect scent. Our AI analyzes your mood, lifestyle and weather
          to suggest perfumes you&apos;ll love.
        </p>
        <button className={styles.cta} onClick={onFindScent}>
          Find My Scent ✨
        </button>
      </motion.div>

      {/* 3D Bottle */}
      <motion.div
        className={styles.canvas}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} style={{ background: "transparent" }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f0a8ff" />
          <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#ff6fb5" />
          <pointLight position={[0, 3, 2]} intensity={0.8} color="#b066ff" />
          <PerfumeBottle />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </motion.div>
    </section>
  );
}
