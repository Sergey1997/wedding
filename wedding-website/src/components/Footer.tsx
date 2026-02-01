import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className={styles.footer} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className={styles.names}>Сергей & Анастасия</p>
          <p className={styles.date}>18 апреля 2026</p>
          <div className={styles.hearts}>♥</div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
