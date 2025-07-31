import React, { useState } from "react";
import styles from "./Apropos.module.css";

export const Apropos = () => {
  const projectData = [
    {
      id: 1,
      name: "Frontend",
      technologies: ["HTML, CSS, Javascript, React"],
      description: "Au cours de mes années d'études j'ai peu affiner mes compétences sur divers technologies Frontend tel que les classiques HTML et CSS ainsi que de découvrir l'utilisation de React et de ses composants "
    },
    {
      id: 2,
      name: "Backend",
      technologies: ["PHP,Symfony,Laravel, NodeJS"],
      description: "",
    },
    {
      id: 3,
      name: "Autres compétences",
      technologies: ["Dessin numérique, Modélisation 3D, Traduction"],
      description: "",

    },
  ];

  
  const [activeProject, setActiveProject] = useState(null);

  
  const handleToggleProject = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <section className={styles.AproposSection}>
      <h2>Mes compétences</h2>
      <div className={styles.projectCards}>
        {projectData.map((project) => (
          <div 
            key={project.id} 
            className={styles.projectCard} 
            onClick={() => handleToggleProject(project.id)}
          >
            <h3>{project.name}</h3>
            <p className={styles.technologies}>
             {project.technologies.join(", ")}
            </p>
            
            {activeProject === project.id && (
              <p className={styles.description}>{project.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
