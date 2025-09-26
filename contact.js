const { useState } = React;
const { motion } = window.framerMotion;
const { useTranslation } = window.ReactI18next;
const { MapContainer, TileLayer, Marker, Popup } = window.ReactLeaflet || {};

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      gtag('event', 'contact_submit', { event_category: 'Form', event_label: 'Contact' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill all required fields');
    }
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="section">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">{t('contact')}</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {MapContainer ? (
              <MapContainer center={[6.5244, 3.3792]} zoom={15} style={{ height: "250px", width: "100%", borderRadius: '8px', border: '1px solid #4B0082' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={[6.5244, 3.3792]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconSize: [25, 41] })}>
                  <Popup>TechBit Institute</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p className="text-red-500">Map unavailable</p>
            )}
          </div>
          <div className="md:w-1/2">
            <p className="text-slate mb-2">123 Tech St, Lagos, Nigeria</p>
            <p className="text-slate mb-2">Phone: +234 123 456 7890</p>
            <p className="text-slate mb-2">Email: info@techbitinstitute.com</p>
            <div className="flex gap-4 mb-4">
              <a href="https://twitter.com" target="_blank" className="text-coral"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" className="text-coral"><i className="fab fa-linkedin"></i></a>
              <a href="https://instagram.com" target="_blank" className="text-coral"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="card p-6 max-w-lg mx-auto mt-6">
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
          <textarea
            placeholder={t('message')}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="input textarea"
            aria-label={t('message')}
          ></textarea>
          <button onClick={handleSubmit} className="button">{t('submit')}</button>
        </div>
      </div>
    </motion.section>
  );
};