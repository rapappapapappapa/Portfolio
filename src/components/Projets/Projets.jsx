import React, { useState } from "react";
import Morpion from "../Morpion/Morpion";
import styles from "./Projets.module.css";
import { getImageUrl } from "../../utils";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

// Exemple de tableau de projets
const projects = [
  {
    id: 1,
    title: "Projet e-commerce",
    description: "Site de e-commerce avec paiement Stripe.",
    image: "ecommerce.png",
    details: "Le but du projet était de réaliser un site de e-commerce de zéro. J'ai principalement travaillé sur le formulaire de paiement avec Stripe. Application complète avec gestion des produits, panier d'achat, système d'authentification et intégration de paiement sécurisé.",
    demoComponent: null,
    github: "https://github.com/rapappapapappapa/Projet-e-commerce",
    online: "https://github.com/rapappapapappapa/Projet-e-commerce"
  },
  {
    id: 2,
    title: "Twitter Clone",
    description: "Reproduction du site 'X' (anciennement Twitter).",
    image: "twitter.png",
    details: "Premier gros projet de groupe, nous avons découvert la gestion de projet en équipe.",
    demoComponent: null,
    github: "https://github.com/...",
    online: null
  },
  {
    id: 3,
    title: "Morpion (Tic-Tac-Toe)",
    description: "Jeu de morpion réalisé avec React.",
    image: "tic-tac-toe.png",
    details: "Tu peux jouer directement ici !",
    demoComponent: "Morpion",
    github: "https://github.com/...",
    online: null
  },
  {
    id: 4,
    title: "Système de Gestion de Cinéma",
    description: "Application web complète pour la gestion d'un complexe cinématographique.",
    image: "paiment.png",
    details: "Système de gestion intégré comprenant la réservation de billets, la gestion des salles et des séances, un système de paiement sécurisé, et un tableau de bord administrateur. Développé avec React pour le frontend et Node.js/Express pour le backend, avec une base de données MongoDB. Interface utilisateur intuitive avec système de géolocalisation pour les cinémas.",
    demoComponent: null,
    github: "https://github.com/rapappapapappapa/cinema-management",
    online: "https://cinema-management-demo.vercel.app/"
  }
  // Ajoute d'autres projets ici
];

export const Projets = () => {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.2);

  const handleToggleProject = (id) => {
    setOpenProject(openProject === id ? null : id);
  };

  const launchEcommerce = () => {
    // Ouvre une nouvelle fenêtre avec les instructions pour lancer le projet
    const instructions = `
🚀 Pour lancer le projet e-commerce :

1. Ouvrez un terminal
2. Naviguez vers le projet : cd ~/Projet-e-commerce/ecommerce
3. Lancez le backend : cd back && php -S localhost:8000
4. Ouvrez un autre terminal
5. Lancez le frontend : cd front && npm run dev
6. Ouvrez http://localhost:5173 dans votre navigateur

Ou cliquez sur le lien GitHub pour voir le code source !
    `;
    
    alert(instructions);
    // Ouvre aussi le README du projet
    window.open('https://github.com/rapappapapappapa/Projet-e-commerce', '_blank');
  };

  return (
    <section className={`${styles.container} ${styles.scrollReveal} ${isSectionVisible ? styles.visible : ''}`} ref={sectionRef}>
      <button
        className={styles.toggleSectionBtn}
        onClick={() => setSectionOpen(!sectionOpen)}
      >
        {sectionOpen ? "Cacher les projets" : "Voir mes projets"}
      </button>

      {sectionOpen && (
        <div className={styles.projectsList}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${styles.projectCardReveal} ${isSectionVisible ? styles.visible : ''} ${openProject === project.id ? styles.open : ""}`}
            >
              <div
                className={styles.projectHeader}
                onClick={() => handleToggleProject(project.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <span className={styles.arrow}>
                  {openProject === project.id ? "▲" : "▼"}
                </span>
              </div>
              {openProject === project.id && (
                <div className={styles.projectDetails}>
                  <p>{project.details}</p>
                  {project.demoComponent === "Morpion" && <Morpion />}
                  <div className={styles.projectLinks}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        📁 Voir le code GitHub
                      </a>
                    )}
                    {project.online && project.id === 1 ? (
                      <button 
                        onClick={launchEcommerce}
                        className={styles.launchBtn}
                      >
                        🚀 Lancer le projet
                      </button>
                    ) : project.online ? (
                      <a href={project.online} target="_blank" rel="noopener noreferrer">
                        🌐 Voir le projet en ligne
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
