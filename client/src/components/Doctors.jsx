import { useScrollAnimation } from '../hooks/useScrollAnimation';
import YonseiLogo from './YonseiLogo';
import './Doctors.css';

const CAREER = [
  { type: 'yonsei', text: '연세대학교 치의예과 입학' },
  { type: 'yonsei', text: '연세대학교 치과대학 졸업' },
  { type: 'dot',    text: '통합치의학과 전문의 1기' },
  { type: 'dot',    text: '서울대학교 치의학대학원 치과보존과 연수원 수료' },
  { type: 'dot',    text: '대한치과보철학회 인증 우수보철치과의사' },
  { type: 'dot',    text: '대한통합치과학회 정회원' },
  { type: 'dot',    text: '대한치과보철학회 정회원' },
  { type: 'dot',    text: '대한심미치과학회 정회원' },
  { type: 'dot',    text: '대한구강악안면임플란트학회 정회원' },
  { type: 'dot',    text: '서울특별시의회 치과주치의 표창' },
  { type: 'dot',    text: 'OSSTEM, Dentium, Dentis 임플란트 연구자문의' },
];

function Doctors() {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [photoRef, photoVisible] = useScrollAnimation(0.1);
  const [infoRef, infoVisible] = useScrollAnimation(0.15);
  const [statsRef, statsVisible] = useScrollAnimation(0.2);

  return (
    <section id="doctors" className="section doctors">
      <div className="container">

        <div ref={titleRef} className={`fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="section-title">의료진 소개</h2>
          <p className="section-subtitle">
            연세대학교 치과대학 출신 전문의가 직접 진료합니다
          </p>
        </div>

        <div className="doctors__profile">
          <div ref={photoRef} className={`doctors__photo-wrap scale-in ${photoVisible ? 'visible' : ''}`}>
            <img
              src="/doctor-profile.png"
              alt="박종우 대표원장"
              className="doctors__photo"
            />
          </div>

          <div ref={infoRef} className={`doctors__info fade-in ${infoVisible ? 'visible' : ''}`}>
            <div className="doctors__name-row">
              <span className="doctors__label">대표원장</span>
              <strong className="doctors__name">박종우 원장</strong>
            </div>

            <blockquote className="doctors__quote">
              "찾아와주시는 분들의 치아를<br className="m-br" /> 평생 책임져드리겠다는<br className="d-br" />{' '}목표를 가지고<br className="m-br" /> 진료에 임하겠습니다."
            </blockquote>

            <ul className="doctors__career">
              {CAREER.map((item, i) => (
                <li key={i}>
                  {item.type === 'yonsei' ? (
                    <YonseiLogo size={16} className="doctors__yonsei-icon" />
                  ) : (
                    <span className="doctors__bullet" />
                  )}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={statsRef} className="doctors__stats">
          {[
            { number: '전 의료진', label: '치과위생사' },
            { number: '연세대', label: '치과대학 출신' },
            { number: '전문의', label: '직접 진료' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`doctors__stat fade-in stagger-${i + 1} ${statsVisible ? 'visible' : ''}`}
            >
              <span className="doctors__stat-number">{stat.number}</span>
              <span className="doctors__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Doctors;
