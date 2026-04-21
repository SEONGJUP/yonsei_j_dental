import { useState, useEffect } from 'react';
import { FiPhone, FiMenu, FiX, FiEdit3 } from 'react-icons/fi';
import YonseiLogo from './YonseiLogo';
import './Header.css';

const BLOG_URL = 'https://blog.naver.com/ysjeidc';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '병원소개', href: '#about' },
    { label: '진료안내', href: '#services' },
    { label: '의료진', href: '#doctors' },
    { label: '진료시간', href: '#hours' },
    { label: '블로그', href: BLOG_URL, external: true },
    { label: '오시는 길', href: '#contact' },
  ];

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${mounted ? 'header--mounted' : ''}`}>
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <YonseiLogo
            size={36}
            color={scrolled ? '#00205B' : '#FFFFFF'}
            className="header__logo-icon"
          />
          <div className="header__logo-text">
            <span className="header__logo-main">연세제이치과</span>
            <span className="header__logo-sub">YONSEI J DENTAL</span>
          </div>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={`header__link ${item.external ? 'header__link--blog' : ''}`}
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              onClick={() => setMenuOpen(false)}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.external && <FiEdit3 size={14} />}
              {item.label}
            </a>
          ))}
          <a href="tel:02-815-2875" className="header__phone">
            <FiPhone /> 02-815-2875
          </a>
        </nav>

        <button
          className="header__menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
