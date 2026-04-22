import { FiMapPin, FiPhone, FiNavigation, FiClock } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Contact.css';

function Contact() {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [mapRef, mapVisible] = useScrollAnimation(0.1);
  const [infoRef, infoVisible] = useScrollAnimation(0.1);

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div ref={titleRef} className={`fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="section-title">오시는 길</h2>
          <p className="section-subtitle">
            서울 동작구 상도동, 편리한 교통과 주차 시설을 갖추고 있습니다
          </p>
        </div>

        <div className="contact__wrapper">
          <a
            ref={mapRef}
            href="https://m.place.naver.com/hospital/1710388626/location?bk_query=%EC%97%B0%EC%84%B8%EC%A0%9C%EC%9D%B4%EC%B9%98%EA%B3%BC&entry=pll&filter=location&selected_place_id=1710388626"
            target="_blank"
            rel="noopener noreferrer"
            className={`contact__map contact__map--naver fade-in-left ${mapVisible ? 'visible' : ''}`}
            aria-label="네이버 지도에서 연세제이치과 위치 보기"
          >
            <div className="contact__map-inner">
              <div className="contact__map-pin">
                <FiMapPin size={36} />
              </div>
              <p className="contact__map-label">서울 동작구 만양로 17, 2층</p>
              <span className="contact__map-cta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#03C75A">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
                </svg>
                네이버 지도에서 보기
              </span>
            </div>
          </a>

          <div ref={infoRef} className="contact__info">
            {[
              {
                icon: <FiMapPin />,
                title: '주소',
                content: (
                  <>
                    <p>서울 동작구 만양로 17, 2층</p>
                    <p className="contact__item-sub">(상도동 19-17)</p>
                  </>
                ),
                delay: 1,
              },
              {
                icon: <FiPhone />,
                title: '전화',
                content: (
                  <p><a href="tel:02-815-2875">02-815-2875</a></p>
                ),
                delay: 2,
              },
              {
                icon: <FiNavigation />,
                title: '교통안내',
                content: (
                  <p>
                    지하철 7호선 상도역 인근<br />
                    버스 정류장 도보 이용 가능
                  </p>
                ),
                delay: 3,
              },
              {
                icon: <FiClock />,
                title: '편의시설',
                content: (
                  <p>건물 내 엘리베이터 · 주차장 완비</p>
                ),
                delay: 4,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`contact__item fade-in-right stagger-${item.delay} ${infoVisible ? 'visible' : ''}`}
              >
                <div className="contact__item-icon">
                  {item.icon}
                </div>
                <div>
                  <h4>{item.title}</h4>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 자차 길 안내 ── */}
        <div className="contact__directions">
          <div className="contact__directions-left">
            <div className="contact__directions-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <rect x="1" y="11" width="22" height="9" rx="2"/>
                <path d="M4 11V7a2 2 0 012-2h12a2 2 0 012 2v4"/>
                <circle cx="7" cy="20" r="1.5" fill="currentColor" stroke="none"/>
                <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none"/>
                <path d="M4 15h2M18 15h2"/>
              </svg>
            </div>
            <h4 className="contact__directions-title">자차 이용 시 길 안내</h4>
            <p className="contact__directions-desc">
              내비게이션 도착지를 <strong>「동작구 만양로12 파리바게트」</strong>로 설정해 주세요.<br />
              파리바게트에서 몇 미터 언덕 위로 올라오시면 좌측에 <strong>이디야커피</strong>가 있는 건물입니다.<br />
              빨간 화살표 골목으로 올라오시면 주차장이 있습니다. 😊
            </p>
          </div>
          <div className="contact__directions-img">
            <img src="/directions-guide.png" alt="연세제이치과 자차 길 안내" loading="lazy" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;
