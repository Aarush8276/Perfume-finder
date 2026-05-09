"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./PerfumeCard.module.css";

export default function PerfumeCard({ perfume, index, onOpenModal, onCompare, isCompared, compareCount }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("scent_wishlist") || "[]");
      setSaved(wishlist.includes(perfume.name));
    } catch {}
  }, [perfume.name]);

  const toggleWishlist = useCallback((e) => {
    e.stopPropagation();
    try {
      const wishlist = JSON.parse(localStorage.getItem("scent_wishlist") || "[]");
      if (saved) {
        localStorage.setItem("scent_wishlist", JSON.stringify(wishlist.filter(n => n !== perfume.name)));
        setSaved(false);
      } else {
        wishlist.push(perfume.name);
        localStorage.setItem("scent_wishlist", JSON.stringify(wishlist));
        setSaved(true);
      }
    } catch {
      setSaved(s => !s);
    }
  }, [saved, perfume.name]);

  const canCompare = isCompared || compareCount < 2;

  return (
    <motion.div
      className={`${styles.card} card-grad glass`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6, boxShadow: "0 28px 70px -15px rgba(180,80,220,0.6)" }}
      onClick={() => onOpenModal && onOpenModal(perfume)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.top}>
        <span className={styles.vibe}>{perfume.vibe}</span>
        <div className={styles.match}>{perfume.match}%</div>
      </div>

      <div className={styles.imgWrap}>
        <Image
          src={`/${perfume.image}`}
          alt={perfume.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width:768px) 90vw, 340px"
        />
        <div className={styles.imgOverlay} />
      </div>

      <h3 className={styles.name}>{perfume.name}</h3>
      <p className={styles.tag}>{perfume.tagline} — <em>{perfume.house}</em></p>

      {["top", "heart", "base"].map((k) => (
        <div className={styles.noteRow} key={k}>
          <div className={styles.lbl}>{k}</div>
          <div className={styles.chips}>
            {perfume.notes[k].map((n) => (
              <span className={styles.chip} key={n}>{n}</span>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.actions} onClick={e => e.stopPropagation()}>
        <button
          className={`${styles.wishlist} ${saved ? styles.saved : ""}`}
          onClick={toggleWishlist}
        >
          {saved ? "♥ Saved" : "♡ Wishlist"}
        </button>
        <button
          className={`${styles.compareBtn} ${isCompared ? styles.compareActive : ""}`}
          onClick={(e) => { e.stopPropagation(); onCompare && onCompare(perfume); }}
          disabled={!canCompare}
          title={!canCompare ? "Max 2 perfumes to compare" : isCompared ? "Remove from compare" : "Add to compare"}
        >
          {isCompared ? "✓ Compare" : "⇄ Compare"}
        </button>
      </div>
    </motion.div>
  );
}
