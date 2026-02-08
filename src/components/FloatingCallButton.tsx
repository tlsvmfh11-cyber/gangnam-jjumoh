import { motion } from 'framer-motion';
import { hero } from '../data/content';

export const FloatingCallButton = () => {
  return (
    <motion.a
      href={`tel:${hero.phone}`}
      className="fixed bottom-6 right-6 z-50 md:hidden"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        {/* 펄스 효과 */}
        <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-75"></div>

        {/* 메인 버튼 */}
        <div className="relative bg-gradient-wine-gold text-white p-5 rounded-full shadow-glow-gold flex items-center justify-center">
          {/* 전화 아이콘 */}
          <svg
            className="w-7 h-7"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </div>

        {/* 전화번호 툴팁 (호버 시 표시) */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-dark text-secondary px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-lg">
            {hero.phone}
          </div>
        </div>
      </div>
    </motion.a>
  );
};
