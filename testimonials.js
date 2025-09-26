const { motion } = window.framerMotion;
const { useTranslation } = window.ReactI18next;

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [
    { id: 1, name: "Jane Doe", review: "Transformed my career with practical skills!", course: "Python Programming" },
    { id: 2, name: "John Smith", review: "Instructors were top-notch and supportive.", course: "Data Science Bootcamp" },
    { id: 3, name: "Alice Brown", review: "Loved the hands-on projects!", course: "UI/UX Design" },
    { id: 4, name: "Mike Wilson", review: "Best investment for my future.", course: "Web Development" },
    { id: 5, name: "Sara Lee", review: "AI course was a game-changer!", course: "AI Fundamentals" },
    { id: 6, name: "Tom Clark", review: "Flexible and engaging learning experience.", course: "Python Programming" }
  ];

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="section">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">{t('testimonials')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(testimonial => (
            <motion.div key={testimonial.id} className="card p-4" whileHover={{ scale: 1.1 }}>
              <img src="https://via.placeholder.com/300x200" alt={testimonial.name} className="w-full h-32 object-cover rounded-lg mb-2" />
              <p className="text-slate">{testimonial.review}</p>
              <p className="text-slate font-bold mt-2">{testimonial.name} - {testimonial.course}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};