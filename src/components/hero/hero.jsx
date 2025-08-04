import React from "react";
import styles from "./hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = ({ onContactClick }) => {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Bonjour je suis Ridah</h1>
                <p className={styles.description}>Développeur fullstack</p>

                <button onClick={onContactClick} className={styles.contactBtn}>
                    Contactez-moi
                </button>

                <a 
                    href="../../public" 
                    download="Ridah_Benzarti.pdf" 
                    className={styles.downloadBtn}
                >
                    Télécharger mon CV
                </a>
            </div>

            <div className={styles.topBlur}/>
            <div className={styles.bottomBlur}/>
        </section>
    );
}
