import React, { useState } from "react";
import Morpion from "../Morpion/Morpion";
import styles from "./Projets.module.css";
import { getImageUrl } from "../../utils";

// Exemple de tableau de projets
const projects = [
  {
    id: 1,
    title: "Projet e-commerce",
    description: "Site de e-commerce avec paiement Stripe.",
    image: "ecommerce.png",
    details: "Le but du projet était de réaliser un site de e-commerce de zéro. J'ai principalement travaillé sur le formulaire de paiement avec Stripe.",
    demoComponent: null,
    github: "https://github.com/...",
    online: null
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

  const handleToggleProject = (id) => {
    setOpenProject(openProject === id ? null : id);
  };

  return (
    <section className={styles.container}>
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
              className={`${styles.projectCard} ${openProject === project.id ? styles.open : ""}`}
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
                        Voir le code
                      </a>
                    )}
                    {project.online && (
                      <a href={project.online} target="_blank" rel="noopener noreferrer">
                        Voir en ligne
                      </a>
                    )}
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
