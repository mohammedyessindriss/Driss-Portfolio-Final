import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FlowArt from '@/components/FlowArt';
import FlowSection from '@/components/FlowSection';
import BrandGuideline from '@/components/BrandGuideline';
import VisualWork from '@/components/VisualWork';
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
            isTbsJe={i === 0}
            sectionLabel="The Social Media Work"
            heading={i === 0 ? 'what was built under my direction' : undefined}
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
            hasGradientTheme={project.hasGradientTheme}
            creatives={[...project.creatives]}
          >
            {i === 0 && <BrandGuideline />}
          </FlowSection>
        ))}
        <VisualWork />
      </FlowArt>

      <Footer />
    </Layout>
  );
}
