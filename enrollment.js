const { useState } = React;
const { motion } = window.framerMotion;
const { useTranslation } = window.ReactI18next;
const { Link } = ReactRouterDOM;

const Enrollment = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.course) {
      gtag('event', 'enrollment_submit', { event_category: 'Form', event_label: 'Enrollment' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ name: '', email: '', phone: '', course: '' });
    } else {
      alert('Please fill all required fields');
    }
  };

  const handlePayment = () => {
    gtag('event', 'payment_initiated', { event_category: 'Payment', event_label: 'Stripe' });
    alert(t('payment_success'));
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="section">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">{t('enrollment')}</h2>
        <div className="card p-6 max-w-lg mx-auto">
          {showSuccess && <p className="form-success">{t('form_success')}</p>}
          <input
            type="text"
            placeholder={t('name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
            aria-label={t('name')}
          />
          <input
            type="email"
            placeholder={t('email')}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input"
            aria-label={t('email')}
          />
          <input
            type="tel"
            placeholder={t('phone')}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input"
            aria-label={t('phone')}
          />
          <select
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="input"
            aria-label={t('course')}
          >
            <option value="" disabled>{t('course')}</option>
            <option value="Python Programming">Python Programming</option>
            <option value="Data Science Bootcamp">Data Science Bootcamp</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Web Development">Web Development</option>
            <option value="AI Fundamentals">AI Fundamentals</option>
          </select>
          <button onClick={handleSubmit} className="button mt-4">{t('submit')}</button>
          <button onClick={handlePayment} className="button mt-2">Pay with Stripe</button>
          <Link to="/progress" className="button mt-2">{t('progress')}</Link>
        </div>
      </div>
    </motion.section>
  );
};
