import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10KB 이상만 압축
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli compression (더 나은 압축률)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  build: {
    // 청크 크기 경고 제한 (500KB)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // 더 세분화된 코드 스플리팅
        manualChunks: {
          // React 코어
          'react-vendor': ['react', 'react-dom'],
          // 애니메이션 라이브러리
          'motion': ['framer-motion'],
          // React 유틸리티
          'react-utils': ['react-helmet-async', 'react-intersection-observer'],
          // Particles
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
        },
        // 파일명 최적화
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // CSS 코드 스플리팅
    cssCodeSplit: true,
    // Source map 비활성화 (프로덕션)
    sourcemap: false,
    // Minify 설정 (esbuild가 terser보다 빠름)
    minify: 'esbuild',
    // 타겟 브라우저
    target: 'es2015',
    // Rollup 최적화
    reportCompressedSize: false, // 빌드 속도 향상
  },
  server: {
    port: 3000,
    open: true,
  },
  // 최적화 옵션
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
