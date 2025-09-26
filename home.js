const { motion } = window.framerMotion;
const { useTranslation } = window.ReactI18next;
const { Link } = ReactRouterDOM;

const Home = () => {
  const { t } = useTranslation();
  const featuredCourses = [
    { id: 1, title: "Python Programming", description: "Master Python for software development.", duration: "8 weeks", level: "Beginner", category: "Programming" },
    { id: 2, title: "Data Science Bootcamp", description: "Learn data analysis and machine learning.", duration: "12 weeks", level: "Intermediate", category: "Data Science" },
    { id: 3, title: "UI/UX Design", description: "Design user-friendly interfaces.", duration: "10 weeks", level: "Beginner", category: "Design" },
    { id: 4, title: "Web Development", description: "Build modern web applications.", duration: "10 weeks", level: "Intermediate", category: "Programming" },
    { id: 5, title: "AI Fundamentals", description: "Introduction to artificial intelligence.", duration: "6 weeks", level: "Beginner", category: "Data Science" }
  ];

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
        <h2 className="text-3xl font-bold mb-4">{t('welcome')}</h2>
        <p className="text-slate mb-6">{t('mission')}</p>
        <img src="https://via.placeholder.com/600x300" alt="Institute Banner" className="w-full h-64 object-cover rounded-lg mb-6" />
        <div className="flex gap-4 mb-8">
          <Link to="/enrollment" className="button">{t('enroll_now')}</Link>
          <Link to="/courses" className="button">{t('learn_more')}</Link>
        </div>

        <h3 className="text-2xl font-bold mb-4">Featured Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredCourses.map(course => (
            <motion.div key={course.id} className="card p-4" whileHover={{ scale: 1.1 }}>
              <img src="https://via.placeholder.com/300x200" alt={course.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h4 className="text-lg font-bold">{course.title}</h4>
              <p className="text-slate">{course.description}</p>
              <p className="text-slate">Duration: {course.duration}</p>
              <p className="text-slate">Level: {course.level}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
        <p className="text-slate mb-6">To create a global community of skilled tech professionals driving innovation.</p>

        <h3 className="text-2xl font-bold mb-4">Testimonials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(testimonial => (
            <motion.div key={testimonial.id} className="card p-4" whileHover={{ scale: 1.1 }}>
              <p className="text-slate">{testimonial.review}</p>
              <p className="text-slate font-bold mt-2">{testimonial.name} - {testimonial.course}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};