"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Finder from "@/components/Finder";
import PerfumeCard from "@/components/PerfumeCard";
import Chatbot from "@/components/Chatbot";
import PerfumeModal from "@/components/PerfumeModal";
import CompareModal from "@/components/CompareModal";
import ThemeToggle from "@/components/ThemeToggle";
import { notesFamilies } from "@/lib/data";
import styles from "./page.module.css";

// Load Hero dynamically (contains Three.js, no SSR)
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });

export default function Home() {
  const [state, setState] = useState({ mood: "confident", lifestyle: "corporate", weather: "cold", occasion: "casual" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);
  const finderRef = useRef(null);

  // Modal state
  const [modalPerfume, setModalPerfume] = useState(null);

  // Compare state
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const scrollToFinder = () => finderRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleReveal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json();
      setResults(data.results);
      setCompareList([]); // reset compare on new results
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStateUpdate = (update) => {
    setState(s => ({ ...s, ...update }));
  };

  const handleCompare = (perfume) => {
    setCompareList(prev => {
      if (prev.find(p => p.name === perfume.name)) {
        return prev.filter(p => p.name !== perfume.name);
      }
      if (prev.length < 2) return [...prev, perfume];
      return prev;
    });
  };

  return (
    <main className="bg-hero">
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.dot} /> Scentropolis
        </div>
        <nav className={styles.nav}>
          <a href="#finder">Finder</a>
          <a href="#how">How it works</a>
          <a href="#notes">Notes Library</a>
          <Link href="/wishlist">♡ Wishlist</Link>
        </nav>
        <div className={styles.headerRight}>
          <ThemeToggle />
          <a href="#finder" className={styles.cta}>Find My Scent</a>
        </div>
      </header>

      {/* ── Hero ── */}
      <Hero onFindScent={scrollToFinder} />

      {/* ── Finder ── */}
      <div ref={finderRef} id="finder">
        <Finder state={state} setState={setState} onReveal={handleReveal} loading={loading} />
      </div>

      {/* ── Results ── */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.section
            ref={resultsRef}
            className={styles.results}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.resultsH2}>
              Your <span className="text-gradient">signature trio</span>
            </h2>
            <p className={styles.resultsMeta}>
              Curated for {state.mood} · {state.lifestyle} · {state.weather} · {state.occasion}
            </p>
            <div className={styles.cards}>
              {results.map((r, i) => (
                <PerfumeCard
                  key={r.name + i}
                  perfume={r}
                  index={i}
                  onOpenModal={setModalPerfume}
                  onCompare={handleCompare}
                  isCompared={!!compareList.find(p => p.name === r.name)}
                  compareCount={compareList.length}
                />
              ))}
            </div>

            {/* Compare bar */}
            <AnimatePresence>
              {compareList.length === 2 && (
                <motion.div
                  className={styles.compareBar}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  <span>⇄ Comparing <strong>{compareList[0].name}</strong> vs <strong>{compareList[1].name}</strong></span>
                  <button className={styles.compareBarBtn} onClick={() => setShowCompare(true)}>
                    View Comparison
                  </button>
                  <button className={styles.compareBarClear} onClick={() => setCompareList([])}>✕</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── How it works ── */}
      <section className={styles.how} id="how">
        <h2 className={styles.sectionH2}>
          How the <span className="text-gradient">scent algorithm</span> works
        </h2>
        <div className={styles.steps}>
          {[
            { n: "01", t: "Personality input", p: "We capture your mood, lifestyle, climate and occasion." },
            { n: "02", t: "AI mapping",        p: "Bold confident → woody spicy oud. Calm day → fresh aquatic." },
            { n: "03", t: "Curated trio",      p: "Three distinct perfumes with full top-heart-base note breakdowns." },
          ].map((s) => (
            <motion.div
              key={s.n}
              className={`${styles.step} card-grad glass`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`${styles.stepN} text-gradient`}>{s.n}</div>
              <div className={styles.stepT}>{s.t}</div>
              <p className={styles.stepP}>{s.p}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Notes Library ── */}
      <section className={styles.notes} id="notes">
        <div className={`${styles.notesPanel} card-grad glass`}>
          <h2>Note <span className="text-gradient">families</span></h2>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {/* Render two sets of tags for seamless infinite scroll */}
              {[...notesFamilies, ...notesFamilies].map((n, i) => (
                <span key={`${n}-${i}`} className={styles.tag}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        Scentropolis · Made with scent &amp; AI · <Link href="/wishlist" style={{ color: "var(--accent)" }}>My Wishlist</Link>
      </footer>

      {/* ── AI Chatbot ── */}
      <Chatbot onStateUpdate={handleStateUpdate} onReveal={handleReveal} />

      {/* ── Perfume Detail Modal ── */}
      {modalPerfume && (
        <PerfumeModal perfume={modalPerfume} onClose={() => setModalPerfume(null)} />
      )}

      {/* ── Compare Modal ── */}
      {showCompare && compareList.length === 2 && (
        <CompareModal perfumes={compareList} onClose={() => setShowCompare(false)} />
      )}
    </main>
  );
}
