"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./PerfumeModal.module.css";

export default function PerfumeModal({ perfume, onClose }) {
  const [description, setDescription] = useState("");
  const [loadingDesc, setLoadingDesc] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!perfume) return;
    // Check wishlist
    try {
      const wishlist = JSON.parse(localStorage.getItem("scent_wishlist") || "[]");
      setSaved(wishlist.includes(perfume.name));
    } catch {}

    // Fetch AI description
    setLoadingDesc(true);
    fetch("/api/describe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: perfume.name,
        house: perfume.house,
        vibe: perfume.vibe,
        notes: perfume.notes,
      }),
    })
      .then((r) => r.json())
      .then((d) => setDescription(d.description))
      .catch(() => setDescription("A captivating scent that leaves a lasting impression."))
      .finally(() => setLoadingDesc(false));
  }, [perfume]);

  const toggleWishlist = useCallback(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("scent_wishlist") || "[]");
      if (saved) {
        const updated = wishlist.filter((n) => n !== perfume.name);
        localStorage.setItem("scent_wishlist", JSON.stringify(updated));
        setSaved(false);
      } else {
        wishlist.push(perfume.name);
        localStorage.setItem("scent_wishlist", JSON.stringify(wishlist));
        setSaved(true);
      }
    } catch {}
  }, [saved, perfume]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!perfume) return null;

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
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>✕</button>

          <div className={styles.inner}>
            {/* Image */}
            <div className={styles.imgWrap}>
              <Image
                src={`/${perfume.image}`}
                alt={perfume.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className={styles.imgOverlay} />
              <div className={styles.match}>{perfume.match}% Match</div>
            </div>

            {/* Content */}
            <div className={styles.content}>
              <span className={styles.vibe}>{perfume.vibe}</span>
              <h2 className={styles.name}>{perfume.name}</h2>
              <p className={styles.house}>{perfume.house}</p>

              {/* AI Description */}
              <div className={styles.descBox}>
                {loadingDesc ? (
                  <div className={styles.descSkeleton}>
                    <span /><span /><span />
                  </div>
                ) : (
                  <motion.p
                    className={styles.desc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {description}
                  </motion.p>
                )}
              </div>

              {/* Notes */}
              <div className={styles.notes}>
                {["top", "heart", "base"].map((k) => (
                  <div key={k} className={styles.noteRow}>
                    <span className={styles.noteLabel}>{k}</span>
                    <div className={styles.chips}>
                      {perfume.notes[k].map((n) => (
                        <span key={n} className={styles.chip}>{n}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tagline */}
              <p className={styles.tagline}>"{perfume.tagline}"</p>

              {/* Actions */}
              <button
                className={`${styles.wishlistBtn} ${saved ? styles.saved : ""}`}
                onClick={toggleWishlist}
              >
                {saved ? "♥ Saved to Wishlist" : "♡ Save to Wishlist"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
