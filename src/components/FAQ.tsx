import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { faqData } from '../data/content';
import { parseContentWithLinks } from '../utils/parseContent';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-dark">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* 타이틀 */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-wine-gold bg-clip-text text-transparent">
            자주 묻는 질문 TOP 20
          </span>
        </motion.h2>

        <motion.p
          className="text-xl text-accent text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          강남 쩜오에 대해 궁금하신 모든 것을 해결해드립니다
        </motion.p>

        {/* FAQ 리스트 */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#2a2a2a] rounded-xl overflow-hidden border border-secondary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 * index }}
            >
              {/* 질문 */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#333] transition-colors duration-200"
              >
                <span className="text-lg md:text-xl font-bold text-secondary pr-4">
                  Q{index + 1}. {faq.question}
                </span>
                <motion.svg
                  className="w-6 h-6 text-secondary flex-shrink-0"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </motion.svg>
              </button>

              {/* 답변 */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-[#1f1f1f] border-t border-secondary/10">
                      <p className="text-lg text-accent leading-relaxed">
                        {parseContentWithLinks(faq.answer)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
