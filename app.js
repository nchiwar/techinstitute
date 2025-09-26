(function () {
  // Dependency Check
  if (!window.React || !window.ReactDOM || !window.ReactRouterDOM || !window.ReactQuery || !window.i18next || !window.L) {
    console.error('Missing dependencies:', {
      React: !!window.React,
      ReactDOM: !!window.ReactDOM,
      ReactRouterDOM: !!window.ReactRouterDOM,
      ReactQuery: !!window.ReactQuery,
      QueryClient: !!window.ReactQuery.QueryClient,
      i18next: !!window.i18next,
      Leaflet: !!window.L
    });
    return;
  }

  // Debug ReactQuery structure
  console.log('ReactQuery:', window.ReactQuery);

  const { useState, useEffect } = window.React;
  const { BrowserRouter, Routes, Route, Link } = window.ReactRouterDOM;
  const { QueryClient, useQuery } = window.ReactQuery || {
    QueryClient: function() {
      this.queryCache = {};
      this.query = function() {};
    },
    useQuery: function(queryKey, queryFn) {
      return { data: queryFn(), error: null };
    }
  };

  // i18next Initialization
  window.i18next.init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to TechBit Institute",
          "mission": "Empowering the next generation with cutting-edge digital skills.",
          "home": "Home",
          "courses": "Courses",
          "enrollment": "Enrollment",
          "testimonials": "Testimonials",
          "contact": "Contact",
          "vision": "Vision",
          "about": "About",
          "enroll_now": "Enroll Now",
          "learn_more": "Learn More",
          "submit": "Submit",
          "name": "Name",
          "email": "Email",
          "phone": "Phone",
          "course": "Course",
          "message": "Message",
          "form_success": "Submission successful!",
          "payment_success": "Payment processed successfully!",
          "no_data": "No courses found",
          "progress": "My Progress",
          "theme": "Theme",
          "theme_light": "Light",
          "theme_dark": "Dark",
          "error": "An error occurred. Please try again."
        }
      },
      es: {
        translation: {
          "welcome": "Bienvenidos a TechBit Institute",
          "mission": "Empoderando a la próxima generación con habilidades digitales de vanguardia.",
          "home": "Inicio",
          "courses": "Cursos",
          "enrollment": "Inscripción",
          "testimonials": "Testimonios",
          "contact": "Contacto",
          "vision": "Visión",
          "about": "Acerca",
          "enroll_now": "Inscribirse Ahora",
          "learn_more": "Saber Más",
          "submit": "Enviar",
          "name": "Nombre",
          "email": "Correo Electrónico",
          "phone": "Teléfono",
          "course": "Curso",
          "message": "Mensaje",
          "form_success": "¡Envío exitoso!",
          "payment_success": "¡Pago procesado con éxito!",
          "no_data": "No se encontraron cursos",
          "progress": "Mi Progreso",
          "theme": "Tema",
          "theme_light": "Claro",
          "theme_dark": "Oscuro",
          "error": "Ocurrió un error. Por favor intenta de nuevo."
        }
      },
      fr: {
        translation: {
          "welcome": "Bienvenue à TechBit Institute",
          "mission": "Habiliter la prochaine génération avec des compétences numériques de pointe.",
          "home": "Accueil",
          "courses": "Cours",
          "enrollment": "Inscription",
          "testimonials": "Témoignages",
          "contact": "Contact",
          "vision": "Vision",
          "about": "À Propos",
          "enroll_now": "S'inscrire Maintenant",
          "learn_more": "En Savoir Plus",
          "submit": "Envoyer",
          "name": "Nom",
          "email": "Email",
          "phone": "Téléphone",
          "course": "Cours",
          "message": "Message",
          "form_success": "Soumission réussie !",
          "payment_success": "Paiement traité avec succès !",
          "no_data": "Aucun cours trouvé",
          "progress": "Mon Progrès",
          "theme": "Thème",
          "theme_light": "Clair",
          "theme_dark": "Sombre",
          "error": "Une erreur s'est produite. Veuillez réessayer."
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

  // Custom translation function
  const useTranslation = function () {
    return {
      t: window.i18next.t.bind(window.i18next),
      i18n: window.i18next
    };
  };

  // Initialize QueryClient with fallback
  const queryClient = new (window.ReactQuery.QueryClient || window.ReactQuery)();

  // Error Boundary
  const ErrorBoundary = function (props) {
    const [hasError, setHasError] = useState(false);
    const { t } = useTranslation();

    useEffect(function () {
      const errorHandler = function (error) {
        console.error('ErrorBoundary caught:', error);
        setHasError(true);
      };
      window.addEventListener('error', errorHandler);
      return function () { window.removeEventListener('error', errorHandler); };
    }, []);

    return hasError
      ? React.createElement('div', { className: 'text-center p-6 text-red-600' }, t('error'))
      : props.children;
  };

  // Header Component
  const Header = function () {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleTheme = function (newTheme) {
      setTheme(newTheme);
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      document.documentElement.classList.add(`theme-${newTheme}`);
    };

    const changeLanguage = function (lng) {
      i18n.changeLanguage(lng);
    };

    return React.createElement(
      'header',
      { className: 'header' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6 py-4 flex justify-between items-center' },
        React.createElement('h1', { className: 'text-2xl font-bold text-white' }, 'TechBit Institute'),
        React.createElement(
          'nav',
          { className: `nav ${isMenuOpen ? 'open' : ''}` },
          React.createElement(Link, { to: '/', className: 'nav-link' }, t('home')),
          React.createElement(Link, { to: '/courses', className: 'nav-link' }, t('courses')),
          React.createElement(Link, { to: '/enrollment', className: 'nav-link' }, t('enrollment')),
          React.createElement(Link, { to: '/testimonials', className: 'nav-link' }, t('testimonials')),
          React.createElement(Link, { to: '/contact', className: 'nav-link' }, t('contact')),
          React.createElement(Link, { to: '/vision', className: 'nav-link' }, t('vision')),
          React.createElement(Link, { to: '/about', className: 'nav-link' }, t('about'))
        ),
        React.createElement(
          'div',
          { className: 'flex gap-3' },
          React.createElement(
            'select',
            {
              onChange: function (e) { toggleTheme(e.target.value); },
              defaultValue: 'light',
              className: 'theme-select rounded px-2 py-1',
              'aria-label': t('theme')
            },
            React.createElement('option', { value: 'light' }, t('theme_light')),
            React.createElement('option', { value: 'dark' }, t('theme_dark'))
          ),
          React.createElement(
            'select',
            {
              onChange: function (e) { changeLanguage(e.target.value); },
              defaultValue: 'en',
              className: 'language-select rounded px-2 py-1',
              'aria-label': 'Language'
            },
            React.createElement('option', { value: 'en' }, 'English'),
            React.createElement('option', { value: 'es' }, 'Español'),
            React.createElement('option', { value: 'fr' }, 'Français')
          )
        ),
        React.createElement(
          'button',
          {
            className: 'hamburger md:hidden ml-3',
            onClick: function () { setIsMenuOpen(!isMenuOpen); },
            'aria-label': 'Toggle menu'
          },
          React.createElement('i', { className: isMenuOpen ? 'fas fa-times' : 'fas fa-bars' })
        )
      )
    );
  };

  // Home Component
  const Home = function () {
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

    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('welcome')),
        React.createElement('p', { className: 'text-slate mb-6' }, t('mission')),
        React.createElement('img', {
          src: 'https://via.placeholder.com/600x300',
          alt: 'Institute Banner',
          className: 'w-full h-64 object-cover rounded-lg mb-6',
          onError: function (e) { e.target.outerHTML = '<p class="text-red-600">Image unavailable</p>'; }
        }),
        React.createElement(
          'div',
          { className: 'flex gap-4 mb-8' },
          React.createElement(Link, { to: '/enrollment', className: 'button' }, t('enroll_now')),
          React.createElement(Link, { to: '/courses', className: 'button' }, t('learn_more'))
        ),
        React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, 'Featured Courses'),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8' },
          featuredCourses.map(function (course) {
            return React.createElement(
              window.framerMotion.motion.div,
              { key: course.id, className: 'card p-4', whileHover: { scale: 1.1 } },
              React.createElement('img', {
                src: 'https://via.placeholder.com/300x200',
                alt: course.title,
                className: 'w-full h-32 object-cover rounded-lg mb-2',
                onError: function (e) { e.target.outerHTML = '<p class="text-red-600">Image unavailable</p>'; }
              }),
              React.createElement('h4', { className: 'text-lg font-bold' }, course.title),
              React.createElement('p', { className: 'text-slate' }, course.description),
              React.createElement('p', { className: 'text-slate' }, 'Duration: ' + course.duration),
              React.createElement('p', { className: 'text-slate' }, 'Level: ' + course.level)
            );
          })
        ),
        React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, 'Our Vision'),
        React.createElement('p', { className: 'text-slate mb-6' }, 'To create a global community of skilled tech professionals driving innovation.'),
        React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, 'Testimonials'),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
          testimonials.map(function (testimonial) {
            return React.createElement(
              window.framerMotion.motion.div,
              { key: testimonial.id, className: 'card p-4', whileHover: { scale: 1.1 } },
              React.createElement('img', {
                src: 'https://via.placeholder.com/300x200',
                alt: testimonial.name,
                className: 'w-full h-32 object-cover rounded-lg mb-2',
                onError: function (e) { e.target.outerHTML = '<p class="text-red-600">Image unavailable</p>'; }
              }),
              React.createElement('p', { className: 'text-slate' }, testimonial.review),
              React.createElement('p', { className: 'text-slate font-bold mt-2' }, testimonial.name + ' - ' + testimonial.course)
            );
          })
        )
      )
    );
  };

  // Courses Component
  const Courses = function () {
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

    const { data: courses = coursesData, error } = useQuery(['courses'], function () {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function (res) { return res.json(); })
        .then(function () { return coursesData; })
        .catch(function () { return coursesData; });
    });

    const filteredCourses = courses.filter(function (course) {
      return (
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!category || course.category === category) &&
        (!level || course.level === level)
      );
    });

    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('courses')),
        error && React.createElement('p', { className: 'text-red-600' }, 'Failed to load courses'),
        React.createElement(
          'div',
          { className: 'flex flex-col md:flex-row gap-4 mb-6' },
          React.createElement('input', {
            type: 'text',
            placeholder: 'Search courses...',
            value: searchTerm,
            onChange: function (e) { setSearchTerm(e.target.value); },
            className: 'input',
            'aria-label': 'Search courses'
          }),
          React.createElement(
            'select',
            {
              onChange: function (e) { setCategory(e.target.value); },
              className: 'input',
              'aria-label': 'Category filter'
            },
            React.createElement('option', { value: '' }, 'All Categories'),
            React.createElement('option', { value: 'Programming' }, 'Programming'),
            React.createElement('option', { value: 'Data Science' }, 'Data Science'),
            React.createElement('option', { value: 'Design' }, 'Design')
          ),
          React.createElement(
            'select',
            {
              onChange: function (e) { setLevel(e.target.value); },
              className: 'input',
              'aria-label': 'Level filter'
            },
            React.createElement('option', { value: '' }, 'All Levels'),
            React.createElement('option', { value: 'Beginner' }, 'Beginner'),
            React.createElement('option', { value: 'Intermediate' }, 'Intermediate'),
            React.createElement('option', { value: 'Advanced' }, 'Advanced')
          )
        ),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
          filteredCourses.length > 0
            ? filteredCourses.map(function (course) {
                return React.createElement(
                  window.framerMotion.motion.div,
                  { key: course.id, className: 'card p-4', whileHover: { scale: 1.1 } },
                  React.createElement('img', {
                    src: 'https://via.placeholder.com/300x200',
                    alt: course.title,
                    className: 'w-full h-32 object-cover rounded-lg mb-2',
                    onError: function (e) { e.target.outerHTML = '<p class="text-red-600">Image unavailable</p>'; }
                  }),
                  React.createElement('h4', { className: 'text-lg font-bold' }, course.title),
                  React.createElement('p', { className: 'text-slate' }, course.description),
                  React.createElement('p', { className: 'text-slate' }, 'Duration: ' + course.duration),
                  React.createElement('p', { className: 'text-slate' }, 'Level: ' + course.level),
                  React.createElement('p', { className: 'text-slate' }, 'Category: ' + course.category)
                );
              })
            : React.createElement('p', { className: 'text-slate' }, t('no_data'))
        )
      )
    );
  };

  // Enrollment Component
  const Enrollment = function () {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = function () {
      if (formData.name && formData.email && formData.phone && formData.course) {
        window.gtag('event', 'enrollment_submit', { event_category: 'Form', event_label: 'Enrollment' });
        setShowSuccess(true);
        setTimeout(function () { setShowSuccess(false); }, 3000);
        setFormData({ name: '', email: '', phone: '', course: '' });
      } else {
        alert('Please fill all required fields');
      }
    };

    const handlePayment = function () {
      window.gtag('event', 'payment_initiated', { event_category: 'Payment', event_label: 'Stripe' });
      alert(t('payment_success'));
    };

    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('enrollment')),
        React.createElement(
          'div',
          { className: 'card p-6 max-w-lg mx-auto' },
          showSuccess && React.createElement('p', { className: 'form-success' }, t('form_success')),
          React.createElement('input', {
            type: 'text',
            placeholder: t('name'),
            value: formData.name,
            onChange: function (e) { setFormData({ ...formData, name: e.target.value }); },
            className: 'input',
            'aria-label': t('name')
          }),
          React.createElement('input', {
            type: 'email',
            placeholder: t('email'),
            value: formData.email,
            onChange: function (e) { setFormData({ ...formData, email: e.target.value }); },
            className: 'input',
            'aria-label': t('email')
          }),
          React.createElement('input', {
            type: 'tel',
            placeholder: t('phone'),
            value: formData.phone,
            onChange: function (e) { setFormData({ ...formData, phone: e.target.value }); },
            className: 'input',
            'aria-label': t('phone')
          }),
          React.createElement(
            'select',
            {
              value: formData.course,
              onChange: function (e) { setFormData({ ...formData, course: e.target.value }); },
              className: 'input',
              'aria-label': t('course')
            },
            React.createElement('option', { value: '', disabled: true }, t('course')),
            React.createElement('option', { value: 'Python Programming' }, 'Python Programming'),
            React.createElement('option', { value: 'Data Science Bootcamp' }, 'Data Science Bootcamp'),
            React.createElement('option', { value: 'UI/UX Design' }, 'UI/UX Design'),
            React.createElement('option', { value: 'Web Development' }, 'Web Development'),
            React.createElement('option', { value: 'AI Fundamentals' }, 'AI Fundamentals')
          ),
          React.createElement('button', { onClick: handleSubmit, className: 'button mt-4' }, t('submit')),
          React.createElement('button', { onClick: handlePayment, className: 'button mt-2' }, 'Pay with Stripe'),
          React.createElement(Link, { to: '/progress', className: 'button mt-2' }, t('progress'))
        )
      )
    );
  };

  // Testimonials Component
  const Testimonials = function () {
    const { t } = useTranslation();
    const testimonials = [
      { id: 1, name: "Jane Doe", review: "Transformed my career with practical skills!", course: "Python Programming" },
      { id: 2, name: "John Smith", review: "Instructors were top-notch and supportive.", course: "Data Science Bootcamp" },
      { id: 3, name: "Alice Brown", review: "Loved the hands-on projects!", course: "UI/UX Design" },
      { id: 4, name: "Mike Wilson", review: "Best investment for my future.", course: "Web Development" },
      { id: 5, name: "Sara Lee", review: "AI course was a game-changer!", course: "AI Fundamentals" },
      { id: 6, name: "Tom Clark", review: "Flexible and engaging learning experience.", course: "Python Programming" }
    ];

    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('testimonials')),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
          testimonials.map(function (testimonial) {
            return React.createElement(
              window.framerMotion.motion.div,
              { key: testimonial.id, className: 'card p-4', whileHover: { scale: 1.1 } },
              React.createElement('img', {
                src: 'https://via.placeholder.com/300x200',
                alt: testimonial.name,
                className: 'w-full h-32 object-cover rounded-lg mb-2',
                onError: function (e) { e.target.outerHTML = '<p class="text-red-600">Image unavailable</p>'; }
              }),
              React.createElement('p', { className: 'text-slate' }, testimonial.review),
              React.createElement('p', { className: 'text-slate font-bold mt-2' }, testimonial.name + ' - ' + testimonial.course)
            );
          })
        )
      )
    );
  };

  // Contact Component
  const Contact = function () {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(function () {
      if (window.L) {
        const map = window.L.map('map').setView([6.5244, 3.3792], 15);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        window.L.marker([6.5244, 3.3792], {
          icon: window.L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconSize: [25, 41] })
        }).addTo(map).bindPopup('TechBit Institute').openPopup();
      } else {
        console.error('Leaflet not loaded');
      }
    }, []);

    const handleSubmit = function () {
      if (formData.name && formData.email && formData.message) {
        window.gtag('event', 'contact_submit', { event_category: 'Form', event_label: 'Contact' });
        setShowSuccess(true);
        setTimeout(function () { setShowSuccess(false); }, 3000);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Please fill all required fields');
      }
    };

    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('contact')),
        React.createElement(
          'div',
          { className: 'flex flex-col md:flex-row gap-6' },
          React.createElement(
            'div',
            { className: 'md:w-1/2' },
            window.L
              ? React.createElement('div', { id: 'map', style: { height: '250px', width: '100%', borderRadius: '8px', border: '1px solid #4B0082' } })
              : React.createElement('p', { className: 'text-red-600' }, 'Map unavailable')
          ),
          React.createElement(
            'div',
            { className: 'md:w-1/2' },
            React.createElement('p', { className: 'text-slate mb-2' }, '123 Tech St, Lagos, Nigeria'),
            React.createElement('p', { className: 'text-slate mb-2' }, 'Phone: +234 123 456 7890'),
            React.createElement('p', { className: 'text-slate mb-2' }, 'Email: info@techbitinstitute.com'),
            React.createElement(
              'div',
              { className: 'flex gap-4 mb-4' },
              React.createElement('a', { href: 'https://twitter.com', target: '_blank', className: 'text-coral' }, React.createElement('i', { className: 'fab fa-twitter' })),
              React.createElement('a', { href: 'https://linkedin.com', target: '_blank', className: 'text-coral' }, React.createElement('i', { className: 'fab fa-linkedin' })),
              React.createElement('a', { href: 'https://instagram.com', target: '_blank', className: 'text-coral' }, React.createElement('i', { className: 'fab fa-instagram' }))
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'card p-6 max-w-lg mx-auto mt-6' },
          showSuccess && React.createElement('p', { className: 'form-success' }, t('form_success')),
          React.createElement('input', {
            type: 'text',
            placeholder: t('name'),
            value: formData.name,
            onChange: function (e) { setFormData({ ...formData, name: e.target.value }); },
            className: 'input',
            'aria-label': t('name')
          }),
          React.createElement('input', {
            type: 'email',
            placeholder: t('email'),
            value: formData.email,
            onChange: function (e) { setFormData({ ...formData, email: e.target.value }); },
            className: 'input',
            'aria-label': t('email')
          }),
          React.createElement('textarea', {
            placeholder: t('message'),
            value: formData.message,
            onChange: function (e) { setFormData({ ...formData, message: e.target.value }); },
            className: 'input textarea',
            'aria-label': t('message')
          }),
          React.createElement('button', { onClick: handleSubmit, className: 'button' }, t('submit'))
        )
      )
    );
  };

  // Vision Component
  const Vision = function () {
    const { t } = useTranslation();
    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('vision')),
        React.createElement('p', { className: 'text-slate mb-4' }, 'Our vision is to create a global community of skilled tech professionals driving innovation and solving real-world challenges.'),
        React.createElement('p', { className: 'text-slate mb-4' }, 'We aim to:'),
        React.createElement(
          'ul',
          { className: 'list-disc list-inside text-slate mb-6' },
          React.createElement('li', null, 'Provide accessible, high-quality tech education.'),
          React.createElement('li', null, 'Foster innovation through hands-on projects.'),
          React.createElement('li', null, 'Build a supportive learning community.'),
          React.createElement('li', null, 'Bridge the gap between education and industry needs.')
        ),
        React.createElement('img', {
          src: 'https://via.placeholder.com/600x300',
          alt: 'Vision Banner',
          className: 'w-full h-64 object-cover rounded-lg',
          onError: function (e) { e.target.outerHTML = '<p class="text-red-600">Image unavailable</p>'; }
        })
      )
    );
  };

  // About Component
  const About = function () {
    const { t } = useTranslation();
    const team = [
      { id: 1, name: "Dr. Emily Carter", role: "Founder & CEO" },
      { id: 2, name: "Mark Johnson", role: "Lead Instructor" },
      { id: 3, name: "Lisa Wong", role: "Curriculum Developer" }
    ];

    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('about')),
        React.createElement('p', { className: 'text-slate mb-4' }, 'Founded in 2020, TechBit Institute has trained over 5,000 students in digital skills, empowering careers in tech.'),
        React.createElement('p', { className: 'text-slate mb-6' }, 'Our mission is to make tech education accessible and practical, with a focus on real-world applications.'),
        React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, 'Our Team'),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
          team.map(function (member) {
            return React.createElement(
              window.framerMotion.motion.div,
              { key: member.id, className: 'card p-4', whileHover: { scale: 1.1 } },
              React.createElement('img', {
                src: 'https://via.placeholder.com/300x200',
                alt: member.name,
                className: 'w-full h-32 object-cover rounded-lg mb-2',
                onError: function (e) { e.target.outerHTML = '<p class="text-red-600">Image unavailable</p>'; }
              }),
              React.createElement('h4', { className: 'text-lg font-bold' }, member.name),
              React.createElement('p', { className: 'text-slate' }, member.role)
            );
          })
        )
      )
    );
  };

  // Progress Component
  const Progress = function () {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(function () {
      const saved = localStorage.getItem('courseProgress');
      return saved ? JSON.parse(saved) : [
        { id: 1, course: "Python Programming", completion: 75 },
        { id: 2, course: "Data Science Bootcamp", completion: 40 }
      ];
    });

    useEffect(function () {
      localStorage.setItem('courseProgress', JSON.stringify(progress));
    }, [progress]);

    return React.createElement(
      window.framerMotion.motion.section,
      { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: 'section' },
      React.createElement(
        'div',
        { className: 'container mx-auto px-6' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, t('progress')),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
          progress.map(function (item) {
            return React.createElement(
              window.framerMotion.motion.div,
              { key: item.id, className: 'card p-4', whileHover: { scale: 1.1 } },
              React.createElement('h4', { className: 'text-lg font-bold' }, item.course),
              React.createElement('p', { className: 'text-slate' }, 'Completion: ' + item.completion + '%'),
              React.createElement(
                'div',
                { className: 'progress-bar' },
                React.createElement('div', { className: 'progress-bar-fill', style: { width: item.completion + '%' } })
              )
            );
          })
        )
      )
    );
  };

  // App Component
  const App = function () {
    return React.createElement(
      window.ReactQuery.QueryClientProvider,
      { client: queryClient },
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          ErrorBoundary,
          null,
          React.createElement(
            'div',
            { className: 'theme-light' },
            React.createElement(Header),
            React.createElement(
              'main',
              { className: 'pt-20' },
              React.createElement(
                Routes,
                null,
                React.createElement(Route, { path: '/', element: React.createElement(Home) }),
                React.createElement(Route, { path: '/courses', element: React.createElement(Courses) }),
                React.createElement(Route, { path: '/enrollment', element: React.createElement(Enrollment) }),
                React.createElement(Route, { path: '/testimonials', element: React.createElement(Testimonials) }),
                React.createElement(Route, { path: '/contact', element: React.createElement(Contact) }),
                React.createElement(Route, { path: '/vision', element: React.createElement(Vision) }),
                React.createElement(Route, { path: '/about', element: React.createElement(About) }),
                React.createElement(Route, { path: '/progress', element: React.createElement(Progress) })
              )
            )
          )
        )
      )
    );
  };

  // Render App
  try {
    window.ReactDOM.render(React.createElement(App), document.getElementById('root'));
  } catch (error) {
    console.error('Render Error:', error);
    document.getElementById('root').innerHTML = '<div class="text-center p-6 text-red-600">Failed to render application. Check console for details.</div>';
  }
})();