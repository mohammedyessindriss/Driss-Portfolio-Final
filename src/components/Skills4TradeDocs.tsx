import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/lib/LanguageContext';
import SocialCards from '@/components/ui/card-fan-carousel';

const TWEEN_EASE = [0.16, 1, 0.3, 1] as const;
const blockVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: TWEEN_EASE } }
};

export default function Skills4TradeDocs() {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={blockVariants}
      style={{ marginTop: '96px', marginBottom: '32px', position: 'relative', zIndex: 1, width: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8, ease: TWEEN_EASE } }
          }}
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(20px, 5vw, 36px)',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            backgroundImage: 'linear-gradient(135deg, #23296b 0%, #207ca9 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {t('brand.presentation') || 'Presentation Materials'}
        </motion.div>
        <motion.div 
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1, ease: TWEEN_EASE } }
          }}
          style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(32,124,169,0.3), transparent)', transformOrigin: 'left' }}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 w-full">
        <SocialCards
          aspectRatio="A4"
          cards={[
            { 
              imgUrl: 'https://i.ibb.co/1GFqKYS5/Screenshot-2026-08-24-005604.png', 
              alt: 'Presentation slide 1',
              linkUrl: 'https://drive.google.com/file/d/18BUgE9wFlq60Qfb97LCIxl9-wiwzv-Yc/view?usp=sharing'
            },
            { 
              imgUrl: 'https://i.ibb.co/MdJ1zVZ/Screenshot-2026-08-24-005620.png', 
              alt: 'Presentation slide 2',
              linkUrl: 'https://drive.google.com/file/d/18BUgE9wFlq60Qfb97LCIxl9-wiwzv-Yc/view?usp=sharing'
            },
            { 
              imgUrl: 'https://i.ibb.co/wFy10tsN/Screenshot-2026-08-24-005633.png', 
              alt: 'Presentation slide 3',
              linkUrl: 'https://drive.google.com/file/d/18BUgE9wFlq60Qfb97LCIxl9-wiwzv-Yc/view?usp=sharing'
            }
          ]}
        />
      </div>
    </motion.div>
  );
}
