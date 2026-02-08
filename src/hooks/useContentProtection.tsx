import { useEffect } from 'react';

/**
 * 콘텐츠 보호 훅
 * - 우클릭 방지
 * - 드래그/선택 방지
 * - 개발자 도구 차단 (F12, Ctrl+U, Ctrl+Shift+I)
 * - 복사 방지 (선택적)
 */
export const useContentProtection = () => {
  useEffect(() => {
    // 우클릭 방지
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 개발자 도구 차단
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I (개발자 도구)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J (콘솔)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (소스 보기)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      // Ctrl+S (저장)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      // Ctrl+C (복사 - 선택적)
      // if (e.ctrlKey && e.key === 'c') {
      //   e.preventDefault();
      //   return false;
      // }
    };

    // 드래그 방지
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 선택 방지 (텍스트)
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // 이벤트 리스너 등록
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    // 정리 함수
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);
};
