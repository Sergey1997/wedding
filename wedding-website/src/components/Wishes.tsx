import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Wishes.module.css';

interface WishItem {
  image: string;
  title: string;
  text: string;
  alt: string;
}

const wishesData: WishItem[] = [
  {
    image: 'https://static.tildacdn.com/tild3631-6430-4538-a636-373536656362/un0381303.jpg',
    title: 'Взрослый вечер',
    text: 'Наше мероприятие рассчитано на взрослую публику. Поэтому просим вас позаботиться о том, чтобы в этот вечер ваши дети были в надёжных руках.',
    alt: 'Праздник для взрослых',
  },
  {
    image: 'https://static.tildacdn.com/tild3238-6233-4038-a637-343236653239/Kniga-sudeb-1200x763.jpg',
    title: 'Книга вместо цветов',
    text: 'Приятным комплиментом для нас будет, если вместо цветов, вы решите подарить нам любимую книгу с вашими искренними пожеланиями на какой-нибудь из страниц.',
    alt: 'Книга с пожеланиями',
  },
];

const Wishes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.wishes} ref={ref}>
      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Наши пожелания
        </motion.h2>
        <div className={styles.grid}>
          {wishesData.map((wish, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={wish.image}
                  alt={wish.alt}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{wish.title}</h3>
                <p className={styles.cardText}>{wish.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishes;
