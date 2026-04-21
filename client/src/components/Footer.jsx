import { useScrollAnimation } from '../hooks/useScrollAnimation';
import YonseiLogo from './YonseiLogo';
import './Footer.css';

const SNS = [
  {
    label: '네이버 블로그',
    href: 'https://blog.naver.com/ysjeidc',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
      </svg>
    ),
    color: '#03C75A',
  },
  {
    label: '유튜브',
    href: 'https://www.youtube.com/channel/UCLcyi5GOklyvjVWpgAVzr7g',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M21.8 8S21.6 6.5 21 5.7c-.7-.8-1.5-.8-1.8-.9C16.8 4.7 12 4.7 12 4.7s-4.8 0-7.2.1c-.4 0-1.2.1-1.8.9C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.5v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.3c.7.8 1.6.8 2 .9C6.5 20 12 20 12 20s4.8 0 7.2-.2c.4 0 1.2-.1 1.8-.9.6-.8.8-2.3.8-2.3S22 14.8 22 13v-1.6C22 9.8 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z"/>
      </svg>
    ),
    color: '#FF0000',
  },
  {
    label: '인스타그램',
    href: 'https://www.instagram.com/yonsei_j_dental_clinic?igsh=OHk1ZHVoMmozeTgz&utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: '#E1306C',
  },
];

function Footer() {
  const [ref, visible] = useScrollAnimation(0.1);

  return (
    <footer className="footer">
      <div className="container">
        <div ref={ref} className={`footer__inner fade-in ${visible ? 'visible' : ''}`}>
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <YonseiLogo size={32} className="footer__yonsei-logo" />
              <h3 className="footer__logo">연세제이치과의원</h3>
            </div>
            <p className="footer__tagline">
              찾아와주시는 분들의 치아를 평생 책임져드리겠습니다
            </p>
            <div className="footer__sns">
              {SNS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__sns-btn"
                  aria-label={s.label}
                  style={{ '--sns-color': s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>진료안내</h4>
              <a href="#services">일반 치과</a>
              <a href="#services">임플란트</a>
              <a href="#services">치아 교정</a>
              <a href="#services">심미 보철</a>
            </div>
            <div className="footer__col">
              <h4>병원 정보</h4>
              <a href="#about">병원 소개</a>
              <a href="#doctors">의료진</a>
              <a href="#hours">진료 시간</a>
              <a href="#contact">오시는 길</a>
            </div>
            <div className="footer__col">
              <h4>SNS</h4>
              {SNS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
            <div className="footer__col">
              <h4>연락처</h4>
              <a href="tel:02-815-2875">02-815-2875</a>
              <span>서울 동작구 만양로 17, 2층</span>
              <span>(상도동)</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} 연세제이치과의원. All rights reserved.</p>
          <p>서울 동작구 만양로 17, 2층 (상도동) | 대표전화 02-815-2875</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
