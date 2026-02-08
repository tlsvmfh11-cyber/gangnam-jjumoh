import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Section as SectionType } from '../data/content';

interface SectionProps {
  section: SectionType;
  index: number;
}

export const Section = ({ section, index }: SectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      id={section.id}
      className={`py-20 ${isEven ? 'bg-dark' : 'bg-gradient-to-b from-dark to-[#0a0a0a]'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 타이틀 */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-wine-gold bg-clip-text text-transparent">
            {section.title}
          </span>
        </motion.h2>

        {/* 섹션 이미지 - 반응형 최적화 */}
        <motion.div
          className="mb-12 -mx-4 md:mx-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full overflow-hidden md:rounded-2xl shadow-2xl bg-dark/50">
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent z-10 pointer-events-none"></div>

            {/* 이미지 */}
            <img
              src={`/images/room-${(index % 10) + 1}.webp`}
              alt={`강남 쩜오 ${section.title} - 프리미엄 인테리어`}
              className="w-full h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              draggable="false"
              width="1200"
              height="800"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                maxHeight: '600px'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.parentElement?.style.setProperty('display', 'none');
              }}
            />

            {/* 이미지 하단 텍스트 오버레이 */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 bg-gradient-to-t from-dark/80 to-transparent">
              <p className="text-secondary font-bold text-xs sm:text-sm md:text-base tracking-wider drop-shadow-lg">
                강남 쩜오 • PREMIUM LOUNGE
              </p>
            </div>
          </div>
        </motion.div>

        {/* 콘텐츠 */}
        <div className="space-y-8">
          {section.content.map((paragraph, idx) => (
            <motion.p
              key={idx}
              className="text-lg md:text-xl text-accent leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* 서브섹션 */}
        {section.subsections && section.subsections.length > 0 && (
          <div className="mt-12 space-y-12">
            {section.subsections.map((subsection, subIdx) => (
              <motion.div
                key={subIdx}
                className="bg-[#2a2a2a] p-8 rounded-2xl border border-secondary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + 0.1 * subIdx }}
              >
                {/* 서브타이틀 */}
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
                  {subsection.title}
                </h3>

                {/* 서브 콘텐츠 */}
                <div className="space-y-4">
                  {subsection.content.map((para, paraIdx) => (
                    <p
                      key={paraIdx}
                      className="text-lg text-accent leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 구분선 - 골드 라인 */}
        <motion.div
          className="mt-16 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.section>
  );
};
