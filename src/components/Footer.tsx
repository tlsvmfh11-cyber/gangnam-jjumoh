import { footerData } from '../data/content';

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4">
              {footerData.company}
            </h3>
            <p className="text-accent mb-4">{footerData.description}</p>
            <p className="text-accent">
              최종 업데이트: <span className="text-secondary">{footerData.lastUpdate}</span>
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-xl font-bold text-secondary mb-4">연락처</h3>
            <div className="space-y-2 text-accent">
              <p>📞 {footerData.contact}</p>
              <p>💬 카카오톡: {footerData.kakao}</p>
              <p>🕐 운영시간: {footerData.hours}</p>
            </div>
          </div>

          {/* 주의사항 */}
          <div>
            <h3 className="text-xl font-bold text-secondary mb-4">주의사항</h3>
            <p className="text-accent text-sm leading-relaxed">
              {footerData.notice}
            </p>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mb-6"></div>

        {/* 저작권 */}
        <div className="text-center text-accent text-sm">
          <p>© 2026 {footerData.company}. All rights reserved.</p>
          <p className="mt-2">본 사이트의 모든 콘텐츠는 저작권으로 보호됩니다.</p>
        </div>
      </div>
    </footer>
  );
};
