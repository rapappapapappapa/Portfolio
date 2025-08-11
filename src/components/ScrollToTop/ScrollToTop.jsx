import React, { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.css';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className={styles.scrollToTop}
      onClick={scrollToTop}
      aria-label="Retour en haut"
    >
      ↑
    </button>
  );
};
