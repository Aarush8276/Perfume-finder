"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { namePool, taglines } from "@/lib/data";
import styles from "./wishlist.module.css";

function WishlistCard({ name, onRemove }) {
  const perfumeData = namePool.find((p) => p[0] === name);
  if (!perfumeData) return null;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
    >
      <div className={styles.imgWrap}>
        <Image src={`/${perfumeData[2]}`} alt={name} fill style={{ objectFit: "cover" }} sizes="300px" />
        <div className={styles.imgOverlay} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.house}>{perfumeData[1]}</p>
      </div>
      <button className={styles.remove} onClick={() => onRemove(name)}>✕ Remove</button>
    </motion.div>
  );
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("scent_wishlist") || "[]");
      setWishlist(saved);
    } catch (e) {
      setWishlist([]);
    }
    setLoaded(true);
  }, []);

  const removeItem = (name) => {
    const updated = wishlist.filter((n) => n !== name);
    setWishlist(updated);
    localStorage.setItem("scent_wishlist", JSON.stringify(updated));
  };

  const clearAll = () => {
    setWishlist([]);
    localStorage.setItem("scent_wishlist", JSON.stringify([]));
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>← Back to Scentropolis</Link>
        <h1 className={styles.title}>My <span className="text-gradient">Wishlist</span></h1>
        {wishlist.length > 0 && (
          <button className={styles.clearBtn} onClick={clearAll}>Clear All</button>
        )}
      </header>

      {!loaded ? null : wishlist.length === 0 ? (
        <motion.div className={styles.empty} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={styles.emptyIcon}>💜</div>
          <h2>Your wishlist is empty</h2>
          <p>Discover and save perfumes that match your vibe.</p>
          <Link href="/" className={styles.cta}>✨ Find My Scent</Link>
        </motion.div>
      ) : (
        <>
          <p className={styles.count}>{wishlist.length} perfume{wishlist.length !== 1 ? "s" : ""} saved</p>
          <motion.div className={styles.grid} layout>
            <AnimatePresence>
              {wishlist.map((name) => (
                <WishlistCard key={name} name={name} onRemove={removeItem} />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </main>
  );
}
