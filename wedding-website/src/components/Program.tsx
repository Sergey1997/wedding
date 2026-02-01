import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Program.module.css';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    time: '15:30',
    title: 'Сбор гостей',
    description: 'Просим взять с собой хорошее настроение и свои улыбки',
  },
  {
    time: '16:00',
    title: 'Церемония',
    description: 'Вы станете свидетелями трогательного момента, подготовьте платочки',
  },
  {
    time: '17:30',
    title: 'Банкет',
    description: 'Время вкусной еды, танцев и веселья',
  },
  {
    time: '23:30',
    title: 'Завершение вечера',
    description: 'К сожалению, даже прекрасный день может закончиться',
  },
];

const Program = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className={styles.program} ref={ref}>
      <div className={styles.overlay} />
      <div className={`container ${styles.container}`}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Программа дня
        </motion.h2>
        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={styles.timelineItem}
              variants={itemVariants}
            >
              <div className={styles.timeWrapper}>
                <span className={styles.time}>{item.time}</span>
              </div>
              <div className={styles.connector}>
                <div className={styles.dot} />
                {index < timelineData.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.contentWrapper}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Program;
