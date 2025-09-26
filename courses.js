const { useState } = React;
const { useQuery } = ReactQuery;
const { motion } = window.framerMotion;
const { useTranslation } = window.ReactI18next;

const Courses = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  const coursesData = [
    { id: 1, title: "Python Programming", description: "Master Python for software development.", duration: "8 weeks", level: "Beginner", category: "Programming" },
    { id: 2, title: "Data Science Bootcamp", description: "Learn data analysis and machine learning.", duration: "12 weeks", level: "Intermediate", category: "Data Science" },
    { id: 3, title: "UI/UX Design", description: "Design user-friendly interfaces.", duration: "10 weeks", level: "Beginner", category: "Design" },
    { id: 4, title: "Web Development", description: "Build modern web applications.", duration: "10 weeks", level: "Intermediate", category: "Programming" },
    { id: 5, title: "AI Fundamentals", description: "Introduction to artificial intelligence.", duration: "6 weeks", level: "Beginner", category: "Data Science" },
    { id: 6, title: "JavaScript Essentials", description: "Core JavaScript for web development.", duration: "6 weeks", level: "Beginner", category: "Programming" },
    { id: 7, title: "Machine Learning", description: "Advanced ML techniques.", duration: "12 weeks", level: "Advanced", category: "Data Science" },
    { id: 8, title: "Graphic Design", description: "Create stunning visuals.", duration: "8 weeks", level: "Beginner", category: "Design" },
    { id: 9, title: "React Development", description: "Build dynamic UIs with React.", duration: "10 weeks", level: "Intermediate", category: "Programming" },
    { id: 10, title: "Data Visualization", description: "Visualize data with Tableau.", duration: "6 weeks", level: "Intermediate", category: "Data Science" },
    { id: 11, title: "Cybersecurity Basics", description: "Learn to secure systems.", duration: "8 weeks", level: "Beginner", category: "Programming" },
    { id: 12, title: "Motion Graphics", description: "Create animated visuals.", duration: "10 weeks", level: "Intermediate", category: "Design" },
    { id: 13, title: "Deep Learning", description: "Explore neural networks.", duration: "12 weeks", level: "Advanced", category: "Data Science" },
    { id: 14, title: "Mobile App Development", description: "Build apps with Flutter.", duration: "10 weeks", level: "Intermediate", category: "Programming" },
    { id: 15, title: "Product Design", description: "Design innovative products.", duration: "8 weeks", level: "Beginner", category: "Design" }
  ];

  const { data: courses = coursesData } = useQuery(['courses'], () =>
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(() => coursesData)
  );

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!category || course.category === category) &&
    (!level || course.level === level)
  );

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="section">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">{t('courses')}</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            aria-label="Search courses"
          />
          <select onChange={(e) => setCategory(e.target.value)} className="input" aria-label="Category filter">
            <option value="">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Data Science">Data Science</option>
            <option value="Design">Design</option>
          </select>
          <select onChange={(e) => setLevel(e.target.value)} className="input" aria-label="Level filter">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.length > 0 ? filteredCourses.map(course => (
            <motion.div key={course.id} className="card p-4" whileHover={{ scale: 1.1 }}>
              <img src="https://via.placeholder.com/300x200" alt={course.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h4 className="text-lg font-bold">{course.title}</h4>
              <p className="text-slate">{course.description}</p>
              <p className="text-slate">Duration: {course.duration}</p>
              <p className="text-slate">Level: {course.level}</p>
              <p className="text-slate">Category: {course.category}</p>
            </motion.div>
          )) : (
            <p className="text-slate">{t('no_data')}</p>
          )}
        </div>
      </div>
    </motion.section>
  );
};