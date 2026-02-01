import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './DressCode.module.css';

// Girls dress code images (d1-d10)
const girlsImages = Array.from({ length: 10 }, (_, i) => `/images/d${i + 1}.jpg`);

// Men dress code images (m1-m8)
const mensImages = Array.from({ length: 8 }, (_, i) => `/images/m${i + 1}.jpg`);

const DressCode = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className={styles.dressCode} ref={ref}>
      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Дресс-код
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Мы будем рады видеть вас в подобранной цветовой гамме
        </motion.p>

        <div className={styles.grid}>
          {/* Girls Section */}
          <div className={styles.section}>
            <motion.h3
              className={styles.sectionTitle}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Для девушек
            </motion.h3>
            <motion.div
              className={styles.imageGrid}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {girlsImages.map((src, index) => (
                <motion.div
                  key={`girl-${index}`}
                  className={styles.imageCircle}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={src}
                    alt={`Образ ${index + 1}`}
                    className={styles.image}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Men Section */}
          <div className={styles.section}>
            <motion.h3
              className={styles.sectionTitle}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Для мужчин
            </motion.h3>
            <motion.div
              className={styles.imageGrid}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {mensImages.map((src, index) => (
                <motion.div
                  key={`man-${index}`}
                  className={styles.imageCircle}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={src}
                    alt={`Образ ${index + 1}`}
                    className={styles.image}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
