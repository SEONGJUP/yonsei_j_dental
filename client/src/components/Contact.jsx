import { FiMapPin, FiPhone, FiNavigation, FiClock, FiTruck } from 'react-icons/fi';
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
          <div
            ref={mapRef}
            className={`contact__map fade-in-left ${mapVisible ? 'visible' : ''}`}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5!2d126.95!3d37.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z7ISc7Jq4IOuPmeyekeq1rCDrp4zslpHroZwgMTcgMuy4tQ!5e0!3m2!1sko!2skr!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--radius)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="연세제이치과 위치"
            />
          </div>

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
          <div className="contact__directions-text">
            <div className="contact__directions-icon">
              <FiTruck size={20} />
            </div>
            <div>
              <h4 className="contact__directions-title">자차 이용 시 길 안내</h4>
              <p className="contact__directions-desc">
                내비게이션 도착지를 <strong>「동작구 만양로12 파리바게트」</strong>로 설정해 주세요.<br />
                파리바게트에서 몇 미터 언덕 위로 올라오시면 좌측에 <strong>이디야커피</strong>가 있는 건물입니다.<br />
                빨간 화살표 골목으로 올라오시면 주차장이 있습니다. 😊
              </p>
            </div>
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
