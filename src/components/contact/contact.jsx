import React from "react";
import styles from "./contact.module.css";
import { useFormValidation } from "../../hooks/useFormValidation";

export const Contact = () => {
  const {
    formData,
    errors,
    isSubmitting,
    captchaValue,
    captchaQuestion,
    handleChange,
    handleSubmit,
    setCaptchaValue
  } = useFormValidation();

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contactez-moi</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nom *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              placeholder="Votre nom"
              disabled={isSubmitting}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              placeholder="votre@email.com"
              disabled={isSubmitting}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message *
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
              placeholder="Votre message..."
              rows="5"
              disabled={isSubmitting}
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="captcha" className={styles.label}>
              Vérification anti-spam *
            </label>
            <div className={styles.captchaContainer}>
              <span className={styles.captchaQuestion}>{captchaQuestion}</span>
              <input
                type="number"
                id="captcha"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e.target.value)}
                className={`${styles.input} ${styles.captchaInput} ${errors.captcha ? styles.error : ''}`}
                placeholder="Réponse"
                disabled={isSubmitting}
              />
            </div>
            {errors.captcha && <span className={styles.errorText}>{errors.captcha}</span>}
          </div>

          {errors.general && (
            <div className={styles.generalError}>
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Envoi en cours...
              </>
            ) : (
              'Envoyer le message'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
