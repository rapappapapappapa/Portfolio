import React, { useState } from 'react';
import styles from './App.module.css';

import { Contact } from './components/contact/contact';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';

import { Modal } from './components/contact/modal';
import { Projets } from './components/Projets/Projets';
import { Apropos } from './components/Apropos/Apropos';
import { Footer } from './components/Footer/Footer';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.App}>
    <Navbar />
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
  </div>
  );
}

export default App;
