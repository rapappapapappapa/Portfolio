import React, { useState } from 'react';
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href='/'>
        <img 
        className={styles.navicon} 
        src={
          getImageUrl("porticon.png")
        } />
      </a>

      
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

     
      <ul className={`${styles.menuitems} ${menuOpen ? styles.menuOpen : ""}`} onClick={() => setMenuOpen(false)}>
        <li><a href='#Apropos'>Projets</a></li>
        <li><a href='#Projets'>Compétences</a></li>
      </ul>
    </nav>
  );
};
