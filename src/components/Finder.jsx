"use client";
import { motion } from "framer-motion";
import { moods, lifestyles, weathers, occasions } from "@/lib/data";
import styles from "./Finder.module.css";

function OptionBtn({ item, active, onClick }) {
  return (
    <motion.button
      className={`${styles.opt} ${active ? styles.active : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className={styles.glow} />
      <div className={styles.ico}>{item.icon}</div>
      <div className={styles.name}>{item.label}</div>
    </motion.button>
  );
}

export default function Finder({ state, setState, onReveal, loading }) {
  // Calculate progress: each category contributes 25%
  const steps = [state.mood, state.lifestyle, state.weather, state.occasion];
  const progress = Math.round((steps.filter(Boolean).length / steps.length) * 100);

  return (
    <section className={styles.section} id="finder">
      <div className={`${styles.panel} card-grad glass shadow-soft`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>
            Tell us about <span className="text-gradient">you</span>
          </h2>
          <p className={styles.sub}>Four quick questions. One signature scent.</p>
        </motion.div>

        {/* Progress Bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Profile Completion</span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Mood */}
        <span className={styles.stepLabel}>01 — Mood</span>
        <div className={`${styles.grid} ${styles.g4}`}>
          {moods.map((m) => (
            <OptionBtn key={m.id} item={m} active={state.mood === m.id}
              onClick={() => setState(s => ({ ...s, mood: m.id }))} />
          ))}
        </div>

        {/* Lifestyle */}
        <span className={styles.stepLabel}>02 — Lifestyle</span>
        <div className={`${styles.grid} ${styles.g3}`}>
          {lifestyles.map((l) => (
            <OptionBtn key={l.id} item={l} active={state.lifestyle === l.id}
              onClick={() => setState(s => ({ ...s, lifestyle: l.id }))} />
          ))}
        </div>

        {/* Weather */}
        <span className={styles.stepLabel}>03 — Weather</span>
        <div className={`${styles.grid} ${styles.g4}`}>
          {weathers.map((w) => (
            <OptionBtn key={w.id} item={w} active={state.weather === w.id}
              onClick={() => setState(s => ({ ...s, weather: w.id }))} />
          ))}
        </div>

        {/* Occasion */}
        <span className={styles.stepLabel}>04 — Occasion</span>
        <div className={`${styles.grid} ${styles.g4}`}>
          {occasions.map((o) => (
            <OptionBtn key={o.id} item={o} active={state.occasion === o.id}
              onClick={() => setState(s => ({ ...s, occasion: o.id }))} />
          ))}
        </div>

        <motion.button
          className={styles.reveal}
          onClick={onReveal}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <><span className={styles.spinner} /> Analyzing your aura...</>
          ) : (
            "✨ Reveal My Perfume"
          )}
        </motion.button>
      </div>
    </section>
  );
}
