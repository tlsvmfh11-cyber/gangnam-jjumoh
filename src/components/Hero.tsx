import { motion } from 'framer-motion';
import { hero } from '../data/content';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-wine-gold opacity-20"></div>

      {/* 빛 효과 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary opacity-10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary opacity-10 rounded-full blur-[100px]"></div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 메인 타이틀 */}
          <h1 className="text-7xl md:text-9xl font-bold mb-6 animate-glow">
            <span className="bg-gradient-wine-gold bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-3xl md:text-5xl font-bold text-secondary mb-8">
            {hero.subtitle}
          </p>

          {/* 설명 */}
          <p className="text-xl md:text-2xl text-accent max-w-3xl mx-auto mb-12 leading-relaxed">
            {hero.description}
          </p>

          {/* CTA 버튼 */}
          <motion.a
            href={`tel:${hero.phone}`}
            className="inline-block px-12 py-6 text-2xl font-bold bg-gradient-wine-gold text-white rounded-full shadow-glow-gold hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {hero.cta}
          </motion.a>

          {/* 연락처 */}
          <p className="mt-8 text-xl text-secondary font-bold">
            📞 {hero.phone}
          </p>
        </motion.div>
      </div>

      {/* 스크롤 다운 표시 */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg
          className="w-8 h-8 text-secondary"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};
