import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import { Contact } from './components/contact/contact';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';

import { Modal } from './components/contact/modal';
import { Projets } from './components/Projets/Projets';
import { Apropos } from './components/Apropos/Apropos';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Charger la préférence de thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Sauvegarder la préférence de thème
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${styles.App} ${isDarkMode ? styles.dark : styles.light}`}>
    <Navbar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
    <Hero onContactClick={handleShowModal} />
    <div id="Projets">
      <Projets />
    </div>
    <div id="Apropos">
      <Apropos />
    </div>
    {/* La modal contenant le formulaire de contact */}
    <Modal show={showModal} onClose={handleCloseModal}>
      <Contact />
    </Modal>
    <Footer />
    <ScrollToTop />
  </div>
  );
}

export default App;
