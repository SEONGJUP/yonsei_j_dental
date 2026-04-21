import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Services.css';

const services = [
  {
    num: '01',
    title: '일반 치과',
    desc: '충치 치료, 신경 치료, 발치 등 기본에 충실한 치과 진료를 제공합니다.',
    features: ['충치 치료 (보존과)', '신경 치료', '정기 검진 · 스케일링'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6C15 6 10 10 10 16c0 3 1 5.5 2.5 7.5L14 32a1 1 0 001 1h2l1-6h4l1 6h2a1 1 0 001-1l1.5-8.5C28 21.5 30 19 30 16c0-6-5-10-10-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: '임플란트',
    desc: '정밀 진단을 기반으로 자연치아와 유사한 기능과 심미성을 회복합니다.',
    features: ['3D CT 정밀 진단', '1:1 맞춤 시술', '임플란트 사후 관리'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8v6M20 8l-5 3M20 8l5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="14" y="17" width="12" height="5" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M17 22v10M23 22v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 32h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: '치아 교정',
    desc: '가지런한 치열로 건강한 교합과 자신감 있는 미소를 되찾아 드립니다.',
    features: ['투명 교정 (인비절라인)', '설측 교정', '부분 교정'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S10 25.5 10 20z" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: '심미 보철',
    desc: '올세라믹, 라미네이트 등으로 아름답고 자연스러운 치아를 만들어 드립니다.',
    features: ['올세라믹 크라운', '라미네이트', '치아 미백'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14h16l-2 14H14L12 14z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 14l3-5h10l3 5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 14v14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: '잇몸 치료 (치주과)',
    desc: '잇몸 질환의 정확한 진단과 체계적인 치료로 잇몸 건강을 지켜드립니다.',
    features: ['치주 질환 치료', '잇몸 수술', '잇몸 관리 프로그램'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 24c4-8 20-8 24 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 20c3-5 15-5 18 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 8v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: '구강악안면외과',
    desc: '사랑니 발치, 구강 내 소수술 등 전문적인 구강 외과 진료를 합니다.',
    features: ['사랑니 발치 (매복치)', '낭종 제거', '구강 내 소수술'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 10l12 12M26 10L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="26" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 23v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '07',
    title: '소아 치과',
    desc: '아이 눈높이에 맞춘 편안한 분위기에서 치료합니다.',
    features: ['소아 충치 치료', '불소 도포 · 실란트', '성장기 교합 관리'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 32c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '08',
    title: '영상 진단',
    desc: '디지털 엑스레이, 3D CT 등 첨단 장비로 정확한 진단을 내립니다.',
    features: ['파노라마 촬영', '3D CT 촬영', '디지털 구강 촬영'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 30h12M20 26v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="17" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="17" r="2" fill="currentColor"/>
      </svg>
    ),
  },
];

function Services() {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation(0.05);

  return (
    <section id="services" className="section services">
      <div className="container">
        <div ref={titleRef} className={`fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="section-title">진료 안내</h2>
          <p className="section-subtitle">
            치과, 구강악안면외과, 보철과, 교정과, 소아치과, 치주과, 보존과 등 폭넓은 진료
          </p>
        </div>

        <div ref={gridRef} className="services__grid">
          {services.map((s, i) => (
            <div
              key={i}
              className={`services__card fade-in stagger-${Math.min(i + 1, 6)} ${gridVisible ? 'visible' : ''}`}
            >
              <span className="services__num">{s.num}</span>
              <div className="services__icon">{s.icon}</div>
              <h3 className="services__title">{s.title}</h3>
              <p className="services__desc">{s.desc}</p>
              <ul className="services__features">
                {s.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
