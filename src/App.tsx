import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { FloatingCallButton } from './components/FloatingCallButton';
import { useContentProtection } from './hooks/useContentProtection';
import { siteMetadata, sections } from './data/content';

function App() {
  // 콘텐츠 보호 활성화
  useContentProtection();

  return (
    <HelmetProvider>
      <Helmet>
        {/* 기본 메타 태그 */}
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content={siteMetadata.keywords} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteMetadata.title} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:image" content={siteMetadata.ogImage} />
        <meta property="og:url" content={siteMetadata.url} />
        <meta property="og:site_name" content="강남 쩜오 완벽 가이드" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteMetadata.title} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:image" content={siteMetadata.ogImage} />

        {/* 기타 */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={siteMetadata.url} />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "강남 쩜오 완벽 이용 가이드",
            "description": siteMetadata.description,
            "url": siteMetadata.url,
            "datePublished": "2026-02-08",
            "dateModified": "2026-02-08",
            "inLanguage": "ko-KR",
            "isPartOf": {
              "@type": "WebSite",
              "name": "강남 쩜오 가이드",
              "url": siteMetadata.url
            }
          })}
        </script>

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "강남 프리미엄 쩜오",
            "description": "강남역 도보 3분, 고급 비즈니스 접대 전문 쩜오",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "서울",
              "addressLocality": "강남구",
              "streetAddress": "강남역, 신논현역 일대 (정확한 주소는 예약 시 안내)"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "37.4979",
              "longitude": "127.0276"
            },
            "telephone": "010-XXXX-XXXX",
            "priceRange": "₩₩₩₩",
            "openingHours": "Mo-Su 19:00-05:00"
          })}
        </script>

        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "강남 쩜오 예약은 어떻게 하나요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "강남 쩜오 예약은 전화(010-XXXX-XXXX) 또는 카카오톡으로 가능합니다. 방문 날짜, 시간, 인원, 예산을 말씀하시면 예약이 진행됩니다. 주말이나 저녁 시간대는 최소 3일 전 예약을 권장합니다."
                }
              },
              {
                "@type": "Question",
                "name": "강남 쩜오 가격은 얼마인가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "강남 쩜오 기본 요금은 1인당 30~50만원입니다. 인원, 시간, 업소에 따라 차이가 있으며, 예약 시 정확한 금액을 안내받으실 수 있습니다. 기본 요금에는 룸, 주류, 안주, 파트너 서비스가 모두 포함되어 있습니다."
                }
              },
              {
                "@type": "Question",
                "name": "강남 쩜오 1인 방문 가능한가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "네, 강남 쩜오는 1인 방문도 가능합니다. 1인 전용 룸과 1:1 서비스가 제공되며, 1인 요금은 40~50만원 수준입니다. 혼자서도 편안하게 프리미엄 서비스를 즐기실 수 있습니다."
                }
              }
            ]
          })}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "홈",
                "item": siteMetadata.url
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "강남 쩜오",
                "item": siteMetadata.url
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-dark text-white">
        {/* Hero Section */}
        <Hero />

        {/* Content Sections */}
        {sections.map((section, index) => (
          <Section key={section.id} section={section} index={index} />
        ))}

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <CTA />

        {/* Footer */}
        <Footer />

        {/* Floating Call Button (Mobile Only) */}
        <FloatingCallButton />
      </div>
    </HelmetProvider>
  );
}

export default App;
