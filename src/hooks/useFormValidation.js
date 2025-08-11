import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

export const useFormValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaResult, setCaptchaResult] = useState(0);
  const [captchaQuestion, setCaptchaQuestion] = useState('');

  // Générer un captcha simple
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 + num2;
    setCaptchaResult(result);
    setCaptchaQuestion(`${num1} + ${num2} = ?`);
  };

  // Initialiser le captcha au montage du composant
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validation des champs
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.length < 2) return 'Le nom doit contenir au moins 2 caractères';
        if (value.length > 50) return 'Le nom ne peut pas dépasser 50 caractères';
        break;
      
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Format d\'email invalide';
        break;
      
      case 'message':
        if (!value.trim()) return 'Le message est requis';
        if (value.length < 10) return 'Le message doit contenir au moins 10 caractères';
        if (value.length > 1000) return 'Le message ne peut pas dépasser 1000 caractères';
        break;
      
      case 'captcha':
        if (!value.trim()) return 'Veuillez résoudre le captcha';
        if (parseInt(value) !== captchaResult) return 'Réponse incorrecte';
        break;
      
      default:
        return '';
    }
    return '';
  };

  // Validation complète du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    // Validation du captcha
    const captchaError = validateField('captcha', captchaValue);
    if (captchaError) newErrors.captcha = captchaError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Protection anti-spam
  const checkSpamProtection = () => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    // Limite : 1 soumission par minute
    if (timeSinceLastSubmit < 60000) {
      return { valid: false, message: 'Veuillez attendre 1 minute entre chaque envoi' };
    }
    
    // Limite : 5 soumissions par heure
    if (submitCount >= 5) {
      return { valid: false, message: 'Limite d\'envoi atteinte. Réessayez plus tard.' };
    }
    
    return { valid: true };
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const spamCheck = checkSpamProtection();
    if (!spamCheck.valid) {
      setErrors({ general: spamCheck.message });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Préparer les données pour EmailJS
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_name: 'Ridah'
      };

      // Envoyer l'email via EmailJS
      const result = await emailjs.send(
        'service_w1mpemx', // Ton Service ID
        'template_5cyyhtl', // Ton Template ID
        templateParams,
        'k_CEZqMk8Htiw_u3_' // Ta Public Key
      );

      if (result.status === 200) {
        // Succès
        setSubmitCount(prev => prev + 1);
        setLastSubmitTime(Date.now());
        setFormData({ name: '', email: '', message: '' });
        setCaptchaValue('');
        generateCaptcha();
        setErrors({});
        
        // Message de succès
        alert('Message envoyé avec succès !');
        
        // Reset après 1 heure
        setTimeout(() => {
          setSubmitCount(0);
        }, 3600000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
      
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setErrors({ general: 'Erreur lors de l\'envoi. Réessayez plus tard.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mise à jour des champs
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel
    if (errors[name]) {
      const error = validateField(name, value);
      if (!error) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    captchaValue,
    captchaQuestion,
    handleChange,
    handleSubmit,
    setCaptchaValue
  };
};
