import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FlowArt from '@/components/FlowArt';
import FlowSection from '@/components/FlowSection';
import VisualWork from '@/components/VisualWork';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { SITE_CONFIG, PROJECTS } from '@/lib/constants';

export default function App() {
  return (
    <Layout>
      <Hero />

      <FlowArt>
        {PROJECTS.map((project, i) => (
          <FlowSection
            key={project.id}
            number={String(i + 1).padStart(2, '0')}
            title={project.title}
            role={project.role}
            period={project.period}
            category={project.category}
            tagline={project.tagline}
            metrics={[...project.metrics]}
            backgroundColor={project.backgroundColor}
            textColor={project.textColor}
            borderColor={project.borderColor}
            isLight={project.isLight}
          />
        ))}
        <VisualWork />
      </FlowArt>

      <About />
      <Footer />
    </Layout>
  );
}
