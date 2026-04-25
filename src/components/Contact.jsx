import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; 
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message
    };

    emailjs.send(
      SERVICE_ID, 
      TEMPLATE_ID, 
      templateParams, 
      PUBLIC_KEY
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    })
    .catch((error) => {
      console.error('FAILED...', error);
      alert("Failed to send message. Please check console for details.");
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have questions about notes, projects, or want to collaborate? Reach out!"
        />

        <div className={styles.grid}>
          {/* Form */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.field}>
              <label htmlFor="contact-name" className={styles.label}>Full Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message" className={styles.label}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                required
                className={styles.textarea}
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              icon={FaPaperPlane}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
            </Button>

            {submitted && (
              <motion.p
                className={styles.success}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you! Your message has been sent successfully. 🎉
              </motion.p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={styles.infoTitle}>Contact Information</h3>
            <p className={styles.infoSubtitle}>
              Feel free to reach out through any of these channels. I usually respond within 24 hours.
            </p>
            <div className={styles.contactItems}>
              <a href="mailto:deepakchaurasia4542@gmail.com" className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FaEnvelope />
                </div>
                <div>
                  <p className={styles.contactLabel}>Email</p>
                  <p className={styles.contactValue}>deepakchaurasia4542@gmail.com</p>
                </div>
              </a>
              <a href="tel:+919576167878" className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FaPhone />
                </div>
                <div>
                  <p className={styles.contactLabel}>Phone</p>
                  <p className={styles.contactValue}>+91 9576167878</p>
                </div>
              </a>

              <a href="https://wa.me/919576167878" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <div className={`${styles.contactIcon} ${styles.whatsapp}`}>
                  <FaWhatsapp />
                </div>
                <div>
                  <p className={styles.contactLabel}>WhatsApp</p>
                  <p className={styles.contactValue}>+91 9576167878</p>
                </div>
              </a>

              <a 
                href="https://www.google.com/maps/search/?api=1&query=Patna+Bihar+India" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.contactItem}
              >
                <div className={styles.contactIcon}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className={styles.contactLabel}>Location</p>
                  <p className={styles.contactValue}>Patna, Bihar, India</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
