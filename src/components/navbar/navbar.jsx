import React, { useState } from 'react';
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

export const Navbar = ({ onThemeToggle, isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href='/'>
        <img 
        className={styles.navicon} 
        src={
          getImageUrl("porticon.png")
        } />
      </a>

      <div className={styles.navControls}>
        {/* Toggle de thème */}
        <button 
          className={styles.themeToggle}
          onClick={onThemeToggle}
          aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {/* Bouton menu */}
        <div className={styles.menuBtn}>
          <img
            className={styles.menubtn}
            src={
              menuOpen
                ? getImageUrl("croa.png")  
                : getImageUrl("barres.png")   
            }
            alt="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      <ul className={`${styles.menuitems} ${menuOpen ? styles.menuOpen : ""}`}>
        <li><button onClick={() => handleNavClick('Projets')} className={styles.navLink}>Projets</button></li>
        <li><button onClick={() => handleNavClick('Apropos')} className={styles.navLink}>Compétences</button></li>
      </ul>
    </nav>
  );
};
