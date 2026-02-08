// 콘텐츠 내 HTML 링크를 React 엘리먼트로 변환하는 유틸리티

import React from 'react';

/**
 * 텍스트 내의 <a> 태그를 실제 클릭 가능한 링크로 변환
 *
 * @param text - HTML 링크가 포함된 텍스트
 * @returns React 엘리먼트 배열
 */
export function parseContentWithLinks(text: string): React.ReactNode {
  // <a href="..." class="...">텍스트</a> 패턴 매칭
  const linkRegex = /<a\s+href="([^"]+)"(?:\s+class="([^"]+)")?>([^<]+)<\/a>/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, href, className, linkText] = match;
    const matchStart = match.index;

    // 링크 이전의 일반 텍스트 추가
    if (matchStart > lastIndex) {
      parts.push(text.substring(lastIndex, matchStart));
    }

    // 링크 엘리먼트 추가
    parts.push(
      <a
        key={matchStart}
        href={href}
        className={className || 'text-secondary hover:text-primary transition-colors underline'}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        {linkText}
      </a>
    );

    lastIndex = linkRegex.lastIndex;
  }

  // 마지막 링크 이후의 텍스트 추가
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // 링크가 없으면 원본 텍스트 반환
  return parts.length === 0 ? text : parts;
}
