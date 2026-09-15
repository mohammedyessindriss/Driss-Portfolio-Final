import Layout from '@/components/Layout';
import MagicCursor from '@/components/MagicCursor';
import Hero from '@/components/Hero';
import FlowArt from '@/components/FlowArt';
import FlowSection from '@/components/FlowSection';
import BrandGuideline from '@/components/BrandGuideline';
import VisualWork from '@/components/VisualWork';
import Footer from '@/components/Footer';
import { SITE_CONFIG, PROJECTS } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';

export default function App() {
  const { t } = useLanguage();

  return (
    <Layout>
      <MagicCursor />
      <Hero />

      <FlowArt>
        {PROJECTS.map((project, i) => (
          <FlowSection
            key={project.id}
            isTbsJe={i === 0}
            sectionLabel={t('projects.socialMediaWork')}
            heading={i === 0 ? t('projects.builtUnderDirection') : undefined}
            number={String(i + 1).padStart(2, '0')}
            title={project.title}
            role={t(`projects.${project.id}.role`)}
            period={project.period}
            category={t(`projects.${project.id}.category`)}
            tagline={t(`projects.${project.id}.tagline`)}
            metrics={project.metrics.map((m, idx) => ({
              value: m.value, // value is same
              label: t(`projects.${project.id}.metrics.${idx}.label`)
            }))}
            backgroundColor={project.backgroundColor}
            textColor={project.textColor}
            borderColor={project.borderColor}
            isLight={project.isLight}
            hasGradientTheme={project.hasGradientTheme}
            creatives={project.creatives.map(c => ({
              ...c,
              type: c.type ? t(`flow.postTypes.${c.type}`) : undefined
            }))}
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
