# ⚡ 성능 최적화 가이드 (Core Web Vitals 100점 달성)

## 🎯 목표

모든 Core Web Vitals 지표를 "Good" 수준으로 달성하여 **기술 SEO 점수 100점** 달성

---

## 📊 최적화된 항목

### ✅ 1. LCP (Largest Contentful Paint) 최적화 < 2.0초

#### 적용된 최적화:
1. **Critical Resource Preloading**
   ```html
   <!-- index.html -->
   <link rel="preload" href="/images/room-1.webp" as="image" type="image/webp" fetchpriority="high" />
   <link rel="modulepreload" href="/src/main.tsx" />
   ```

2. **첫 번째 이미지 우선 로딩**
   ```tsx
   // Section.tsx
   loading={index === 0 ? 'eager' : 'lazy'}
   fetchPriority={index === 0 ? 'high' : 'auto'}
   ```

3. **WebP 이미지 최적화**
   - 모든 이미지 WebP 변환 (평균 64KB)
   - 적절한 width/height 속성으로 CLS 방지

4. **Font Loading 최적화**
   ```css
   @font-face {
     font-family: 'Pretendard Variable';
     font-display: swap; /* FOIT 방지 */
   }
   ```

5. **DNS Prefetch & Preconnect**
   ```html
   <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   ```

---

### ✅ 2. FID (First Input Delay) 최적화 < 50ms

#### 적용된 최적화:
1. **JavaScript 코드 스플리팅**
   ```ts
   // vite.config.ts
   manualChunks: {
     'react-vendor': ['react', 'react-dom'],
     'motion': ['framer-motion'],
     'react-utils': ['react-helmet-async', 'react-intersection-observer'],
     'particles': ['@tsparticles/react', '@tsparticles/slim'],
   }
   ```

2. **번들 사이즈 최적화**
   - esbuild minification (terser보다 빠름)
   - Tree shaking 자동 적용
   - 불필요한 의존성 제거

3. **Long Task 모니터링**
   ```ts
   // reportWebVitals.ts
   - 50ms 이상 작업 자동 감지
   - 성능 병목 현상 추적
   ```

---

### ✅ 3. CLS (Cumulative Layout Shift) 최적화 < 0.05

#### 적용된 최적화:
1. **이미지 크기 명시**
   ```tsx
   <img
     width="1200"
     height="800"
     style={{ maxHeight: '600px' }}
   />
   ```

2. **폰트 로딩 최적화**
   - font-display: swap으로 레이아웃 시프트 방지
   - 시스템 폰트 fallback 설정

3. **반응형 min-height 사용**
   ```tsx
   className="min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
   ```

4. **애니메이션 최적화**
   - transform, opacity 속성만 사용 (GPU 가속)
   - will-change 속성 최소화

---

### ✅ 4. TTFB (Time to First Byte) 최적화 < 0.5초

#### 적용된 최적화:
1. **Vercel Edge Network**
   - 전 세계 CDN 배포
   - 자동 지역별 최적화

2. **Gzip & Brotli 압축**
   ```ts
   // vite.config.ts
   viteCompression({
     algorithm: 'gzip',
     threshold: 10240, // 10KB 이상만 압축
   })
   viteCompression({
     algorithm: 'brotliCompress', // 더 나은 압축률
   })
   ```

3. **Cache Headers 최적화**
   ```json
   // vercel.json
   {
     "headers": [{
       "source": "/images/(.*)",
       "headers": [{
         "key": "Cache-Control",
         "value": "public, max-age=31536000, immutable"
       }]
     }]
   }
   ```

---

### ✅ 5. INP (Interaction to Next Paint) 최적化 < 100ms

#### 적용된 최적화:
1. **React 18 Concurrent Mode**
   - 자동 배칭 (Automatic Batching)
   - 우선순위 기반 렌더링

2. **Intersection Observer 사용**
   ```tsx
   const [ref, inView] = useInView({
     triggerOnce: true,
     threshold: 0.1,
   });
   ```

3. **이벤트 핸들러 최적화**
   - Framer Motion의 optimized events
   - Passive event listeners

---

## 📦 빌드 최적화

### Vite 설정 (vite.config.ts)

```typescript
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress' }),
  ],
  build: {
    // 청크 크기 경고 제한
    chunkSizeWarningLimit: 500,
    // CSS 코드 스플리팅
    cssCodeSplit: true,
    // Source map 비활성화 (프로덕션)
    sourcemap: false,
    // Minify 최적화
    minify: 'esbuild',
    // 타겟 브라우저
    target: 'es2015',
    // 압축 리포트 비활성화 (빌드 속도 향상)
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
});
```

---

## 🔍 성능 측정 도구

### 1. Web Vitals 자동 측정

```typescript
// src/utils/reportWebVitals.ts
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from 'web-vitals';

// 개발 환경에서 자동 콘솔 출력
// 프로덕션 환경에서 Google Analytics 전송
```

#### 측정 결과 확인 방법:
1. **개발 환경**: 브라우저 콘솔에서 실시간 확인
   ```
   ✅ [Web Vitals] LCP: 1850ms (good)
   ✅ [Web Vitals] FID: 12ms (good)
   ✅ [Web Vitals] CLS: 0.03 (good)
   ```

2. **프로덕션 환경**: Google Analytics 4 이벤트
   - 자동으로 전송됨 (gtag 설정 시)
   - 대시보드에서 실시간 모니터링

---

### 2. Chrome DevTools Lighthouse

배포 후 측정 방법:
```bash
1. Chrome DevTools 열기 (F12)
2. "Lighthouse" 탭 선택
3. "Performance" 카테고리 체크
4. "Desktop" 또는 "Mobile" 선택
5. "Analyze page load" 클릭
```

**목표 점수:**
- Performance: **95+**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**

---

### 3. PageSpeed Insights

실제 사용자 데이터 확인:
```
1. https://pagespeed.web.dev/ 접속
2. URL 입력: https://gangnam-jjumoh-guide.com
3. "분석" 클릭
4. Field Data (실제 사용자) 확인
5. Lab Data (시뮬레이션) 확인
```

---

## 🚀 배포 후 체크리스트

### 1단계: Vercel 배포 확인
- [ ] 빌드 성공 확인
- [ ] 프로덕션 URL 접속 확인
- [ ] 이미지 로딩 확인 (WebP 형식)
- [ ] Gzip/Brotli 압축 확인 (응답 헤더)

### 2단계: Lighthouse 테스트
- [ ] Desktop 모드 Performance 95+ 확인
- [ ] Mobile 모드 Performance 90+ 확인
- [ ] Accessibility 100 확인
- [ ] SEO 100 확인

### 3단계: PageSpeed Insights
- [ ] Field Data "Good" 확인 (배포 후 28일 필요)
- [ ] LCP < 2.5초
- [ ] FID < 100ms
- [ ] CLS < 0.1

### 4단계: 실제 사용자 테스트
- [ ] 모바일 3G 네트워크 테스트
- [ ] 데스크톱 Wi-Fi 테스트
- [ ] 이미지 로딩 속도 체감 확인
- [ ] 스크롤 성능 확인
- [ ] 버튼 클릭 반응 속도 확인

---

## 📈 예상 성능 지표

### Desktop (Lighthouse 예상)
```
Performance: 98/100
- FCP: 0.8초
- LCP: 1.6초
- TBT: 50ms
- CLS: 0.02
- Speed Index: 1.8초
```

### Mobile (Lighthouse 예상)
```
Performance: 92/100
- FCP: 1.2초
- LCP: 2.2초
- TBT: 120ms
- CLS: 0.03
- Speed Index: 2.8초
```

---

## 🔧 추가 최적화 옵션 (선택 사항)

### 1. Service Worker (PWA)
```typescript
// 오프라인 캐싱, 빠른 재방문
// 필요 시 vite-plugin-pwa 설치
```

### 2. HTTP/2 Server Push
```json
// Vercel에서 자동 지원
// 추가 설정 불필요
```

### 3. Critical CSS Inline
```typescript
// 첫 화면 렌더링 최적화
// vite-plugin-critical 사용
```

### 4. Image CDN (선택)
```typescript
// Vercel Image Optimization
// Cloudflare Images
// Cloudinary
```

---

## 🎯 최종 목표

### 기술 SEO 점수: **100/100**

| 항목 | 목표 | 달성 방법 |
|------|------|----------|
| LCP | < 2.0초 | ✅ 이미지 preload + WebP + fetchpriority |
| FID | < 50ms | ✅ 코드 스플리팅 + esbuild minify |
| CLS | < 0.05 | ✅ width/height 명시 + font-display: swap |
| TTFB | < 0.5초 | ✅ Vercel CDN + Gzip/Brotli 압축 |
| INP | < 100ms | ✅ React 18 + Intersection Observer |

---

## 📞 문제 해결

### LCP가 2초 이상인 경우
1. 히어로 이미지 크기 재확인 (< 150KB)
2. 폰트 로딩 차단 확인
3. JavaScript 번들 크기 확인
4. CDN 캐싱 확인

### FID가 100ms 이상인 경우
1. Long Tasks 확인 (> 50ms)
2. Third-party 스크립트 제거
3. 메인 스레드 블로킹 코드 최적화
4. React DevTools Profiler 사용

### CLS가 0.1 이상인 경우
1. 이미지 width/height 누락 확인
2. 폰트 로딩 시프트 확인
3. 광고/삽입 콘텐츠 확인
4. 애니메이션 속성 확인 (transform/opacity만 사용)

---

## 🎊 최종 체크리스트

배포 후 다음을 확인하세요:

- [ ] Lighthouse Performance 95+ (Desktop)
- [ ] Lighthouse Performance 90+ (Mobile)
- [ ] PageSpeed Insights 모든 Core Web Vitals "Good"
- [ ] 웹 브라우저 콘솔에서 Web Vitals 실시간 확인
- [ ] 이미지 로딩 속도 체감 확인
- [ ] 모바일 반응성 확인
- [ ] 실제 사용자 피드백 수집

---

**🎉 Core Web Vitals 100점 달성 시 기술 SEO 점수 100점!**

**최종 업데이트: 2026년 2월 8일**
