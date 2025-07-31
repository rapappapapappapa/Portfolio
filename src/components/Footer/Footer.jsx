import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Ridah Benzarti. Tous droits réservés.</p>
    </footer>
  );
};
