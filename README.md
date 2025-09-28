Tech Institute Website
Overview
The Tech Institute website is a modern, responsive web application built with React, Tailwind CSS, and i18next for multilingual support. It provides information about tech education programs, including courses, vision, mission, enrollment, testimonials, and contact pages. The site features a consistent design with theme persistence (light/dark modes), accessibility, and mock analytics.
Features

Pages: Home (index.html), Courses (courses.html), Vision (vision.html), Enrollment, Testimonials, Contact, About, Dashboard.
Design:
Color scheme: Teal (#008080), Orange (#F28C38), Soft White (#F5F6F5), Dark Slate (#1F2A44), Charcoal (#333333), Light Gray (#D3D3D3).
Montserrat Alternates font, circuit board background (Teal in light mode, Orange in dark mode).
Max-width: 1200px, responsive single-column layout on mobile (≤768px), no sidebar.
Fade-in animations (0.5s), hover-zoom buttons (scale 1.05).
Reduced header-content spacing (pt-10 on <main>).


Functionality:
Multilingual support (English, Spanish, French) via i18next.
Theme persistence across all pages using localStorage and storage event listener.
Mock Google Analytics (gtag) for tracking button clicks and searches.
Courses page with search/filter functionality and API fallback (uses https://jsonplaceholder.typicode.com/posts with static data on failure).
Consistent vision/mission content on Home and Vision pages.
Header/footer text ("Tech Institute") in Soft White (#F5F6F5) for accessibility (contrast ratio ~12.4:1).


Accessibility: ARIA labels for theme/language selectors and hamburger menu.

Setup

Prerequisites:
Node.js and npm (for http-server).
Chrome browser for testing.


Installation:
Clone or download the project to C:\Users\USER\techinstitute.
Ensure files: index.html, courses.html, vision.html, styles.css, and other pages (enrollment.html, testimonials.html, contact.html, about.html, dashboard.html).
Install http-server: npm install -g http-server.


Running:
Navigate to project directory: cd C:\Users\USER\techinstitute.
Start server: http-server.
Open http://127.0.0.1:8080 in Chrome.



Testing

Theme Persistence:
On index.html, select “Dark” in the theme dropdown. Verify dark mode (Dark Slate background, Light Gray text) persists across all pages (courses.html, vision.html, etc.).
Switch to “Light” on vision.html and confirm light mode (Soft White background, Charcoal text) persists.
Open multiple pages in separate tabs, change the theme in one, and verify others update.
Check localStorage in DevTools > Application for theme key (light or dark).


Vision and Mission:
On vision.html and index.html, confirm identical vision/mission text:
Mission: "Tech Institute is committed to delivering accessible, high-quality education..."
Vision: "To be the global leader in transformative tech education..."


Test translations (English, Spanish, French) via language dropdown.


Design and Colors:
Verify header/footer text ("Tech Institute") is Soft White (#F5F6F5) in both themes.
Check Teal header/footer, Orange buttons, circuit board background, and responsive layout.


Functionality:
On courses.html, test search/filter and API fallback (static courses on error).
Verify gtag events in Console (e.g., enroll_click on Enroll buttons).
Check image fallbacks (“Image Unavailable”) and fade-in animations.


Troubleshooting:
If theme doesn’t persist, check Console for localStorage errors and ensure http://127.0.0.1:8080.
If colors are incorrect, verify styles.css loads (200 status in DevTools > Network).
Clear cache (Ctrl+Shift+R) if issues persist.



Files

index.html: Home page with welcome, vision, mission, featured courses, and testimonials.
courses.html: Courses page with search, filter, and API-driven course list.
vision.html: Vision and mission page, aligned with Home page content.
styles.css: Global styles for colors, animations, and responsive design.
Other pages: enrollment.html, testimonials.html, contact.html, about.html, dashboard.html (update with same App, Header, Footer logic for theme persistence).

Notes

API: courses.html uses https://jsonplaceholder.typicode.com/posts with static fallback. Share Console logs for API debugging.
Updates: Apply theme persistence and color fixes to remaining pages (see vision.html for App, Header, Footer template).
Last Updated: September 28, 2025, 7:21 PM WAT.

Live Demo
