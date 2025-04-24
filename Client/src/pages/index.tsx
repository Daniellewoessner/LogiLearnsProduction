// pages/index.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Logi Learn</h1>
      <p>Dyslexia-friendly learning tools for children</p>
      
      <div className={styles.cardContainer}>
        <Link href="/curriculum">
          <a className={styles.card}>
            <h2>Superhero Curriculum</h2>
            <p>Learn through exciting superhero stories and activities</p>
          </a>
        </Link>
        
        <Link href="/reading-games">
          <a className={styles.card}>
            <h2>Reading Games</h2>
            <p>Fun reading activities to practice your skills</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;