import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./contact.module.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    reply_to: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm(
        "service_w1mpemx", // Ton Service ID
        "template_5cyyhtl", // Ton Template ID
        e.target, 
        "k_CEZqMk8Htiw_u3_" // Ta Public Key (User ID)
      )
      .then(
        (result) => {
          alert("Message envoyé avec succès !");
          setFormData({
            name: "",
            reply_to: "",
            message: "",
          });
        },
        (error) => {
          console.log(error);  // Log général pour afficher l'erreur
          console.log(error.text);  // Log spécifique pour plus d'infos
          alert("Une erreur s'est produite, veuillez réessayer.");
        }
      );
  };
  

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.title}>Contactez-moi</h2>
      <form onSubmit={sendEmail} className={styles.contactForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="reply_to">Email</label>
          <input
            type="email"
            name="reply_to"
            id="reply_to"
            value={formData.reply_to}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>Envoyer</button>
      </form>
    </section>
  );
};
