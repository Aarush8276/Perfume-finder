"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./CompareModal.module.css";

function NoteRow({ label, notes1, notes2 }) {
  const shared = notes1.filter(n => notes2.includes(n));
  return (
    <div className={styles.noteRowGroup}>
      <div className={styles.noteLabel}>{label}</div>
      <div className={styles.noteCols}>
        <div className={styles.noteChips}>
          {notes1.map(n => (
            <span key={n} className={`${styles.chip} ${shared.includes(n) ? styles.shared : ""}`}>{n}</span>
          ))}
        </div>
        <div className={styles.noteChips}>
          {notes2.map(n => (
            <span key={n} className={`${styles.chip} ${shared.includes(n) ? styles.shared : ""}`}>{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompareModal({ perfumes, onClose }) {
  const [p1, p2] = perfumes;

  // Close on Escape
  if (typeof window !== "undefined") {
    window.onkeydown = (e) => { if (e.key === "Escape") onClose(); };
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
          <h2 className={styles.title}>Scent <span className="text-gradient">Comparison</span></h2>

          {/* Images */}
          <div className={styles.imgRow}>
            {[p1, p2].map(p => (
              <div key={p.name} className={styles.imgCard}>
                <div className={styles.imgWrap}>
                  <Image src={`/${p.image}`} alt={p.name} fill style={{ objectFit: "cover" }} sizes="240px" />
                  <div className={styles.imgOverlay} />
                  <div className={styles.matchBadge}>{p.match}%</div>
                </div>
                <h3 className={styles.perfumeName}>{p.name}</h3>
                <p className={styles.perfumeHouse}>{p.house}</p>
                <span className={styles.vibeBadge}>{p.vibe}</span>
              </div>
            ))}
          </div>

          {/* Notes Comparison */}
          <div className={styles.compareSection}>
            <p className={styles.sharedHint}>
              <span className={styles.sharedDot} /> Highlighted notes are shared between both perfumes
            </p>
            <NoteRow label="TOP" notes1={p1.notes.top} notes2={p2.notes.top} />
            <NoteRow label="HEART" notes1={p1.notes.heart} notes2={p2.notes.heart} />
            <NoteRow label="BASE" notes1={p1.notes.base} notes2={p2.notes.base} />
          </div>

          {/* Match Comparison Bar */}
          <div className={styles.matchSection}>
            <div className={styles.matchBar}>
              <div className={styles.matchBarLabel}>{p1.name}</div>
              <div className={styles.barTrack}>
                <motion.div
                  className={styles.barFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${p1.match}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <div className={styles.matchPct}>{p1.match}%</div>
            </div>
            <div className={styles.matchBar}>
              <div className={styles.matchBarLabel}>{p2.name}</div>
              <div className={styles.barTrack}>
                <motion.div
                  className={`${styles.barFill} ${styles.barFill2}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${p2.match}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
              <div className={styles.matchPct}>{p2.match}%</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
