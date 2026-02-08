import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ctaData } from '../data/content';

export const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-wine-gold relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-dark opacity-80"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* 타이틀 */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {ctaData.title}
          </h2>

          {/* 설명 */}
          <p className="text-xl md:text-2xl text-accent mb-12">
            {ctaData.description}
          </p>

          {/* 연락처 버튼들 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            {/* 전화 버튼 */}
            <motion.a
              href={`tel:${ctaData.phone}`}
              className="w-full md:w-auto px-12 py-6 text-2xl font-bold bg-white text-primary rounded-full shadow-glow-gold hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 {ctaData.phone}
            </motion.a>

            {/* 카카오톡 버튼 */}
            <motion.a
              href={`https://open.kakao.com/o/${ctaData.kakao}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-12 py-6 text-2xl font-bold bg-[#FEE500] text-[#3C1E1E] rounded-full shadow-glow-gold hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 카카오톡 문의
            </motion.a>
          </div>

          {/* 특징 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ctaData.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-secondary/30"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <p className="text-lg font-bold text-secondary">✓ {feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
