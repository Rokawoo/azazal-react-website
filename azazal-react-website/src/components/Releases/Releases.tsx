import { useState } from "react";
import styles from "./Releases.module.css";
import releases from "../../data/releases.json";
import { ReleaseCard } from "./ReleaseCard";

export const Releases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getPosition = (index: number): 'left' | 'center' | 'right' | 'far-left' | 'far-right' => {
    const diff = index - currentIndex;
    
    if (diff === 0) return 'center';
    if (diff === -1 || (diff > 0 && diff === releases.length - 1)) return 'left';
    if (diff === 1 || (diff < 0 && Math.abs(diff) === releases.length - 1)) return 'right';
    if (diff === -2 || diff === releases.length - 2) return 'far-left';
    if (diff === 2 || diff === -(releases.length - 2)) return 'far-right';
    
    // For items further away
    if (diff < 0) return 'far-left';
    return 'far-right';
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + releases.length) % releases.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % releases.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.primary}`}></div>

      <section className={styles.container} id="releases">
        <h2 className={styles.title}>Releases</h2>
        
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            {releases.map((release, index) => (
              <ReleaseCard 
                key={index} 
                release={release}
                isActive={index === currentIndex}
                position={getPosition(index)}
              />
            ))}
          </div>

          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrevious}
            aria-label="Previous release"
          >
            <svg viewBox="0 0 24 24" className={styles.navIcon}>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Next release"
          >
            <svg viewBox="0 0 24 24" className={styles.navIcon}>
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>

        <div className={styles.dots}>
          {releases.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to release ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};