import { useState, useEffect } from 'react';
import { FiPhone, FiChevronDown } from 'react-icons/fi';
import YonseiLogo from './YonseiLogo';
import './Hero.css';

const KEYWORDS = [
  '연세대 치과대학 졸업',
  '통합치의학과 전문의',
  '레진빌드업 충치치료',
  '1,838+ 네이버리뷰',
  '사랑니발치',
  '신경치료',
  '양심치과',
  '합리적인 가격',
  '믿을 수 있는 치과',
  '임플란트',
];

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero snap-section ${loaded ? 'hero--loaded' : ''}`}>
      {/* 배경 레이어들 */}
      <div className="hero__bg-mesh" />
      <div className="hero__bg-glow hero__bg-glow--1" />
      <div className="hero__bg-glow hero__bg-glow--2" />

      <div className="hero__inner container">
        {/* ── 좌측: 텍스트 ── */}
        <div className="hero__left">
          <div className="hero__pill">
            <span className="hero__pill-dot" />
            연세대 치과대학 출신 전문의 직접 진료
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--1">치아 아끼기에 진심인</span>
            <span className="hero__title-line hero__title-line--2">
              <em className="hero__em-blue">레진빌드업</em> 전문
            </span>
            <span className="hero__title-line hero__title-line--3">
              <em className="hero__em-gold">인레이치료 안하는 치과,</em>
            </span>
            <span className="hero__title-line hero__title-line--4">연세제이치과</span>
          </h1>

          <p className="hero__desc">
            자연 치아를 깎지 않고 살리는 보존 중심 진료.<br />
            과잉 진료 없이 꼭 필요한 치료만 권유드립니다.
          </p>

          <div className="hero__actions">
            <a
              href="tel:02-815-2875"
              className="hero__btn hero__btn--primary"
              onClick={(e) => {
                if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
                  e.preventDefault();
                }
              }}
            >
              <FiPhone size={17} />
              <span>02-815-2875 전화 상담</span>
            </a>
          </div>
          <div className="hero__badges">
            {[
              { label: '야간진료', sub: '화·목 21시' },
              { label: '토요진료', sub: '09:30–14:00' },
              { label: '주차가능', sub: '건물뒷편 주차장' },
            ].map(b => (
              <div key={b.label} className="hero__badge">
                <strong>{b.label}</strong>
                <span>{b.sub}</span>
              </div>
            ))}
          </div>

          <div className="hero__sns-note">
            <p className="hero__sns-note-text">
              연세제이치과의 유튜브영상, 블로그글 등은 전문 마케팅업체가 아닌<br />
              <strong className="hero__sns-note-em">대표원장</strong>이 직접 제작하여 게시합니다.
            </p>
            <div className="hero__sns-links">
              <a href="https://blog.naver.com/ysjeidc" target="_blank" rel="noopener noreferrer" className="hero__sns-link" aria-label="네이버 블로그">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCLcyi5GOklyvjVWpgAVzr7g" target="_blank" rel="noopener noreferrer" className="hero__sns-link" aria-label="유튜브">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M21.8 8S21.6 6.5 21 5.7c-.7-.8-1.5-.8-1.8-.9C16.8 4.7 12 4.7 12 4.7s-4.8 0-7.2.1c-.4 0-1.2.1-1.8.9C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.5v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.3c.7.8 1.6.8 2 .9C6.5 20 12 20 12 20s4.8 0 7.2-.2c.4 0 1.2-.1 1.8-.9.6-.8.8-2.3.8-2.3S22 14.8 22 13v-1.6C22 9.8 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/yonsei_j_dental_clinic" target="_blank" rel="noopener noreferrer" className="hero__sns-link" aria-label="인스타그램">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── 우측: 오비탈 + 원형 키워드 ── */}
        <div className="hero__right">
          <div className="hero__kw-ring">
            {/* 오비탈 */}
            <div className="hero__orbital">
              <div className="hero__orbital-ring hero__orbital-ring--outer" />
              <div className="hero__orbital-ring hero__orbital-ring--mid" />
              <div className="hero__orbital-core">
                <YonseiLogo size={90} />
              </div>
            </div>
            {/* 원형 배치 키워드 */}
            {KEYWORDS.map((kw, i) => (
              <span key={i} className={`hero__kw hero__kw--${i + 1}`}>
                <span className="hero__kw-pill">{kw}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <a href="#reviews" className="hero__scroll">
        <span>SCROLL</span>
        <div className="hero__scroll-circle">
          <FiChevronDown size={18} />
        </div>
      </a>
    </section>
  );
}

export default Hero;
