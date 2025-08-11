import React, { useState } from "react";
import styles from "./Apropos.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export const Apropos = () => {
  const projectData = [
    {
      id: 1,
      name: "Frontend",
      technologies: ["HTML, CSS, Javascript, React"],
      description: "Au cours de mes années d'études j'ai pu affiner mes compétences sur diverses technologies Frontend telles que les classiques HTML et CSS ainsi que de découvrir l'utilisation de React et de ses composants. Je maîtrise la création d'interfaces utilisateur modernes, responsives et performantes avec une attention particulière à l'expérience utilisateur et aux bonnes pratiques de développement web. J'ai également travaillé sur l'optimisation des performances, l'accessibilité web et l'intégration avec des APIs REST. Mes projets incluent des applications e-commerce, des dashboards administratifs et des interfaces utilisateur complexes avec des animations fluides et des interactions intuitives. Je suis également familier avec les outils de build modernes comme Webpack, Vite et les frameworks CSS comme Tailwind CSS et Styled Components."
    },
    {
      id: 2,
      name: "Backend",
      technologies: ["PHP, Symfony, Laravel, NodeJS"],
      description: "Spécialisé dans le développement backend robuste et scalable. J'ai développé des APIs RESTful avec Symfony et Laravel, créé des architectures de base de données optimisées, et implémenté des systèmes d'authentification sécurisés. Mon expérience avec Node.js me permet de créer des applications full-stack performantes avec une stack technologique cohérente. J'ai travaillé sur des systèmes de gestion de contenu, des plateformes e-learning et des applications de gestion d'entreprise. Mes compétences incluent la conception de bases de données relationnelles et NoSQL, l'implémentation de microservices, la gestion des sessions et des cookies, ainsi que l'intégration de services tiers comme les systèmes de paiement et les APIs de géolocalisation. Je maîtrise également les concepts de sécurité web, la validation des données et l'optimisation des requêtes de base de données."
    },
    {
      id: 3,
      name: "Autres compétences",
      technologies: ["Dessin numérique, Modélisation 3D, Blender"],
      description: "Passionné par la création numérique et le game design, je pratique le dessin numérique et la modélisation 3D avec Blender comme loisir créatif. Ces compétences m'aident à concevoir des interfaces de jeux et des éléments visuels pour mes projets. J'ai créé des assets 3D, des textures et des concepts visuels pour des projets personnels de jeux. Cette expérience artistique me permet d'avoir une approche plus créative dans la conception d'interfaces utilisateur et d'apporter une dimension visuelle à mes projets de développement web."
    },
  ];

  const [activeProject, setActiveProject] = useState(null);
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.2);

  const handleToggleProject = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <section className={`${styles.AproposSection} ${styles.scrollReveal} ${isSectionVisible ? styles.visible : ''}`} ref={sectionRef}>
      <h2 className={`${styles.sectionTitleReveal} ${isSectionVisible ? styles.visible : ''}`}>Mes compétences</h2>
      <div className={styles.projectCards}>
        {projectData.map((project) => (
          <div 
            key={project.id} 
            className={`${styles.projectCard} ${styles.skillCardReveal} ${isSectionVisible ? styles.visible : ''} ${activeProject === project.id ? styles.open : ""}`}
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
