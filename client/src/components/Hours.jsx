import { FiClock, FiAlertCircle, FiPhone } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Hours.css';

const schedule = [
  { day: '월요일', time: '09:30 - 18:30', active: true, night: false },
  { day: '화요일', time: '09:30 - 21:00', active: true, night: true },
  { day: '수요일', time: '09:30 - 18:30', active: true, night: false },
  { day: '목요일', time: '09:30 - 21:00', active: true, night: true },
  { day: '금요일', time: '09:30 - 18:30', active: true, night: false },
  { day: '토요일', time: '09:30 - 14:00', active: true, night: false },
  { day: '일요일', time: '휴진', active: false, night: false },
];

function Hours() {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [tableRef, tableVisible] = useScrollAnimation(0.15);
  const [infoRef, infoVisible] = useScrollAnimation(0.15);

  return (
    <section id="hours" className="section hours">
      <div className="container">
        <div ref={titleRef} className={`fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="section-title">진료 시간</h2>
        </div>

        <div className="hours__wrapper">
          {/* ── 왼쪽: 시간표 ── */}
          <div
            ref={tableRef}
            className={`hours__table-wrap fade-in-left ${tableVisible ? 'visible' : ''}`}
          >
            <table className="hours__table">
              <tbody>
                {schedule.map((s, i) => (
                  <tr
                    key={i}
                    className={`hours__row ${!s.active ? 'hours__closed' : s.night ? 'hours__night' : ''}`}
                  >
                    <td className="hours__day">{s.day}</td>
                    <td className="hours__time">
                      <FiClock className="hours__icon" />
                      {s.time}
                      {s.night && (
                        <span className="hours__night-badge">야간진료</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── 오른쪽: 정보 카드 ── */}
          <div ref={infoRef} className="hours__info">
            {/* 점심시간 */}
            <div className={`hours__info-card fade-in-right stagger-1 ${infoVisible ? 'visible' : ''}`}>
              <FiAlertCircle className="hours__info-icon" />
              <div>
                <h4>점심시간</h4>
                <p>13:00 - 14:00 (평일)</p>
              </div>
            </div>

            {/* 공휴일 휴진 */}
            <div className={`hours__info-card fade-in-right stagger-2 ${infoVisible ? 'visible' : ''}`}>
              <FiAlertCircle className="hours__info-icon" />
              <div>
                <h4>공휴일 휴진</h4>
                <p>일요일 · 공휴일은 휴진입니다.</p>
              </div>
            </div>

            {/* 응급 진료 — 공휴일 휴진 바로 아래 */}
            <div className={`hours__emergency fade-in-right stagger-3 ${infoVisible ? 'visible' : ''}`}>
              <span className="hours__emergency-dot" />
              <div>
                <strong className="hours__emergency-title">응급 진료 가능</strong>
                <p className="hours__emergency-desc">
                  진료시간 외 공휴일이나 새벽 응급치료 가능
                </p>
              </div>
            </div>

            {/* 예약·상담 문의 — 한 줄 */}
            <div className={`hours__info-card hours__info-card--highlight fade-in-right stagger-4 ${infoVisible ? 'visible' : ''}`}>
              <FiPhone className="hours__info-icon" />
              <div className="hours__phone-row">
                <h4>예약 · 상담 문의</h4>
                <a href="tel:02-815-2875" className="hours__phone-number">02-815-2875</a>
                <span className="hours__phone-sub">전화 예약 및 상담이 가능합니다.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hours;
