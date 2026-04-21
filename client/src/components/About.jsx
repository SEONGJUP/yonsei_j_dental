import { FiAward, FiShield, FiUsers, FiMonitor, FiHome, FiTruck } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import YonseiLogo from './YonseiLogo';
import './About.css';

const features = [
  {
    icon: <FiAward />,
    title: '연세대 출신 전문의',
    desc: '연세대학교 치과대학 출신 전문의가 직접 상담부터 치료까지 책임집니다.',
  },
  {
    icon: <FiUsers />,
    title: '전 직원 치과위생사',
    desc: '숙련된 치과위생사가 꼼꼼한 구강 관리와 편안한 진료를 도와드립니다.',
  },
  {
    icon: <FiMonitor />,
    title: '최신 장비 · 현대식 시설',
    desc: '3D CT, 디지털 엑스레이 등 최신 장비로 정확한 진단과 치료를 제공합니다.',
  },
  {
    icon: <FiShield />,
    title: '철저한 감염 관리',
    desc: '1인 1기구 멸균 소독, 철저한 방역 관리로 안전한 진료 환경을 유지합니다.',
  },
  {
    icon: <FiHome />,
    title: '엘리베이터 완비',
    desc: '건물 내 엘리베이터를 갖추어 어르신, 거동이 불편하신 분도 편리하게 이용 가능합니다.',
  },
  {
    icon: <FiTruck />,
    title: '주차 시설 구비',
    desc: '건물 내 주차장을 갖추고 있어 차량으로 방문하시는 분들도 편리합니다.',
  },
];

function About() {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation(0.1);

  return (
    <section id="about" className="section about">
      <div className="container">
        <div ref={titleRef} className={`fade-in ${titleVisible ? 'visible' : ''}`}>
          <div className="section-divider">
            <span className="section-divider__line" />
            <YonseiLogo size={36} color="#00205B" />
            <span className="section-divider__line" />
          </div>
          <h2 className="section-title">연세제이치과를 소개합니다</h2>
          <p className="section-subtitle">
            찾아와주시는 분들의 치아를 평생 책임져드리겠다는<br />
            목표를 가지고 진료에 임하겠습니다
          </p>
        </div>

        <div ref={gridRef} className="about__values">
          {features.map((v, i) => (
            <div
              key={i}
              className={`about__card fade-in stagger-${i + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div className="about__icon">{v.icon}</div>
              <h3 className="about__card-title">{v.title}</h3>
              <p className="about__card-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
