import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { SEO } from './components/SEO';
import { HeroSection } from './sections/HeroSection';
import { SkeletonLoader } from './components/SkeletonLoader';
import { FooterSection } from './sections/FooterSection';
import { ChatbotWidget } from './sections/ChatbotWidget';

const AboutSection = lazy(() => import('./sections/AboutSection').then(module => ({ default: module.AboutSection })));
const EducationSection = lazy(() => import('./sections/EducationSection').then(module => ({ default: module.EducationSection })));
const SkillsSection = lazy(() => import('./sections/SkillsSection').then(module => ({ default: module.SkillsSection })));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const CertificationsSection = lazy(() => import('./sections/CertificationsSection').then(module => ({ default: module.CertificationsSection })));
const AchievementsSection = lazy(() => import('./sections/AchievementsSection').then(module => ({ default: module.AchievementsSection })));
const DashboardSection = lazy(() => import('./sections/DashboardSection').then(module => ({ default: module.DashboardSection })));
const ContactSection = lazy(() => import('./sections/ContactSection').then(module => ({ default: module.ContactSection })));

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SEO
          title="Sumant Kumar Yadav | MERN Stack Developer"
          description="Explore the premium developer portfolio of Sumant Kumar Yadav. Highlighting academic records, verified certifications, and full-stack projects."
          url="https://sumant.dev"
        />
        
        <div className="relative min-h-screen text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#090d16] bg-grid-pattern select-none transition-colors duration-300">
          <Navbar />

          <main className="relative z-10 w-full">
            <HeroSection />

            <Suspense fallback={<SkeletonLoader />}>
              <AboutSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <EducationSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <SkillsSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <ProjectsSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <CertificationsSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <AchievementsSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <DashboardSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <ContactSection />
            </Suspense>
          </main>

          <FooterSection />

          <ChatbotWidget />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
