import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { SITE_CONFIG } from '@/lib/constants';

export default function App() {
  return (
    <Layout>
      <Hero />
      <div id="work" style={{ minHeight: '100vh', background: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', color: '#9CA3AF', fontSize: '13px' }}>
        Work section coming in Prompt 4
      </div>
      <div id="about" style={{ minHeight: '100vh', background: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', color: '#9CA3AF', fontSize: '13px' }}>
        About section coming in Prompt 5
      </div>
      <div id="now" style={{ minHeight: '100vh', background: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', color: '#9CA3AF', fontSize: '13px' }}>
        Now section coming in Prompt 5
      </div>
    </Layout>
  );
}
