// Web Vitals 성능 측정 및 보고
import { onCLS, onLCP, onFCP, onTTFB, onINP } from 'web-vitals';

/**
 * Core Web Vitals 측정 및 콘솔 출력
 *
 * 목표 값:
 * - LCP (Largest Contentful Paint): < 2.5초
 * - INP (Interaction to Next Paint): < 200ms (FID 대체)
 * - CLS (Cumulative Layout Shift): < 0.1
 * - FCP (First Contentful Paint): < 1.8초
 * - TTFB (Time to First Byte): < 600ms
 */

interface MetricReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

const reportMetric = (metric: MetricReport) => {
  // 개발 환경에서만 콘솔 출력
  if (import.meta.env.DEV) {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(`${emoji} [Web Vitals] ${metric.name}:`, {
      value: `${Math.round(metric.value)}ms`,
      rating: metric.rating,
      id: metric.id,
    });
  }

  // 프로덕션 환경에서는 Google Analytics나 다른 분석 도구로 전송
  if (import.meta.env.PROD) {
    // Google Analytics 4 예시 (설치된 경우)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

export function reportWebVitals() {
  // LCP: Largest Contentful Paint (가장 큰 콘텐츠가 화면에 렌더링되는 시간)
  onLCP(reportMetric);

  // INP: Interaction to Next Paint (사용자 상호작용 응답성 - FID 대체)
  onINP(reportMetric);

  // CLS: Cumulative Layout Shift (레이아웃 이동)
  onCLS(reportMetric);

  // FCP: First Contentful Paint (첫 콘텐츠 렌더링 시간)
  onFCP(reportMetric);

  // TTFB: Time to First Byte (서버 응답 시간)
  onTTFB(reportMetric);
}

// 성능 옵저버를 사용한 추가 측정
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // 긴 작업 감지 (Long Tasks)
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('[Performance] Long Task detected:', {
            duration: `${Math.round(entry.duration)}ms`,
            startTime: `${Math.round(entry.startTime)}ms`,
          });
        }
      }
    });
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long Tasks API가 지원되지 않는 브라우저
  }

  // 리소스 타이밍 측정
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        // 느린 리소스 감지 (2초 이상)
        if (resource.duration > 2000) {
          console.warn('[Performance] Slow resource:', {
            name: resource.name,
            duration: `${Math.round(resource.duration)}ms`,
            type: resource.initiatorType,
          });
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (e) {
    // Resource Timing API가 지원되지 않는 브라우저
  }
}
