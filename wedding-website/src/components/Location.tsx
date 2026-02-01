import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Location.module.css';

const Location = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.location} ref={ref}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className={styles.title}>Место проведения</h2>
          <p className={styles.address}>
            Мы будем ждать вас по адресу:
          </p>
          <p className={styles.venue}>
            <strong>Агроусадьба Малиновка</strong>
          </p>
          <p className={styles.addressDetails}>
            Солигорский р-н, д. Летенец,
            <br />
            ул. Школьная, 2б
          </p>
          <a
            href="https://maps.google.com/?q=Летенец+Школьная+2б"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Открыть на карте →
          </a>
        </motion.div>
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src="https://static.tildacdn.com/tild3330-3666-4431-b339-653936656431/476904689_1808365684.jpg"
            alt="Агроусадьба Малиновка"
            className={styles.image}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
