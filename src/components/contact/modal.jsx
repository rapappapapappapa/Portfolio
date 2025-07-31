import React from 'react';
import styles from './modal.module.css';

export const Modal = ({ show, onClose, children }) => {
  // Si show est false, on ne rend pas la modal
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {/* Bouton pour fermer la modal */}
        <button onClick={onClose} className={styles.closeButton}>X</button>
        {/* Contenu de la modal */}
        {children}
      </div>
    </div>
  );
};
