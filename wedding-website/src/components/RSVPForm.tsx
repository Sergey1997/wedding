import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import styles from './RSVPForm.module.css';

interface FormData {
  name: string;
  attendance: string;
  transfer: string;
  additionalInfo: string;
}

const RSVPForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    attendance: '',
    transfer: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage('Пожалуйста, введите ваше имя');
      return;
    }

    if (!formData.attendance) {
      setErrorMessage('Пожалуйста, укажите, сможете ли вы присутствовать');
      return;
    }

    if (!formData.transfer) {
      setErrorMessage('Пожалуйста, выберите вариант трансфера');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const submissionData = {
        name: formData.name.trim(),
        attendance: formData.attendance,
        transfer: formData.transfer,
        additional_info: formData.additionalInfo.trim() || null,
      };

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('rsvp_submissions').insert([submissionData]);
        if (error) throw error;
      } else {
        // Log to console when Supabase is not configured (for development)
        console.log('Form submission (Supabase not configured):', submissionData);
      }

      setSubmitStatus('success');
      setFormData({ name: '', attendance: '', transfer: '', additionalInfo: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Произошла ошибка при отправке. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className={styles.rsvp} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Анкета</h2>
          <p className={styles.subtitle}>
            Пожалуйста, сообщите нам, будете ли вы с нами.
          </p>

          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.successIcon}>✓</div>
                <h3>Спасибо!</h3>
                <p>Ваш ответ успешно отправлен.</p>
                <button
                  type="button"
                  className={`btn btn-primary ${styles.resetButton}`}
                  onClick={resetForm}
                >
                  Отправить ещё ответ
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">Имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="attendance">
                    Вы сможете присутствовать на торжестве?
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                  >
                    <option value="">Выберите ответ</option>
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="transfer">Трансфер</label>
                  <select
                    id="transfer"
                    name="transfer"
                    value={formData.transfer}
                    onChange={handleChange}
                  >
                    <option value="">Выберите вариант</option>
                    <option value="Не нужен">Не нужен</option>
                    <option value="Нужен в обе стороны">Нужен в обе стороны</option>
                    <option value="Нужен только туда">Нужен только туда</option>
                    <option value="Нужен только обратно">Нужен только обратно</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="additionalInfo">
                    Дополнительная информация{' '}
                    <span className={styles.optional}>(необязательно)</span>
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Информация о членах семьи, особые пожелания..."
                    rows={4}
                  />
                </div>

                {errorMessage && (
                  <motion.p
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className={`btn btn-primary ${styles.submitButton}`}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPForm;
