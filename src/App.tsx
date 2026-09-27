import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
    <ThemeProvider>
      <SEO
        title="Sumant Kumar Yadav | Senior Frontend Engineer & Startup Lead"
        description="Explore the premium developer portfolio of Sumant Kumar Yadav. Highlighting academic records, verified AWS cloud credentials, writing logs, and Atmos Weather App—our flagship real-time meteorology and climate analytics dashboard."
        url="https://sumant.dev"
      />
      
      <div className="relative min-h-screen text-brand-text bg-brand-bg select-none transition-colors duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

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
  );
}

export default App;
