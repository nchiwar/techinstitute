const { useState, useEffect } = React;
const { motion } = window.framerMotion;
const { useTranslation } = window.ReactI18next;

const Progress = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('courseProgress');
    return saved ? JSON.parse(saved) : [
      { id: 1, course: "Python Programming", completion: 75 },
      { id: 2, course: "Data Science Bootcamp", completion: 40 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(progress));
  }, [progress]);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="section">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">{t('progress')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progress.map(item => (
            <motion.div key={item.id} className="card p-4" whileHover={{ scale: 1.1 }}>
              <h4 className="text-lg font-bold">{item.course}</h4>
              <p className="text-slate">Completion: {item.completion}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-coral h-2.5 rounded-full" style={{ width: `${item.completion}%` }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};