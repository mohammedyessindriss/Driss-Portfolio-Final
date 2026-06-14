import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FlowArt from '@/components/FlowArt';
import FlowSection from '@/components/FlowSection';
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
      </FlowArt>

      <div id="about" style={{
        minHeight: '100vh',
        background: '#FAFAF9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter',
        color: '#9CA3AF',
        fontSize: '13px',
      }}>
        About section coming in Prompt 5
      </div>

      <div id="now" style={{
        minHeight: '100vh',
        background: '#F4F4F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter',
        color: '#9CA3AF',
        fontSize: '13px',
      }}>
        Now section coming in Prompt 5
      </div>
    </Layout>
  );
}
