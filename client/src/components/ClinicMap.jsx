import './ClinicMap.css';

const LAT = 37.5062069;
const LNG = 126.9472485;
const NAVER_URL =
  'https://m.place.naver.com/hospital/1710388626/location?bk_query=%EC%97%B0%EC%84%B8%EC%A0%9C%EC%9D%B4%EC%B9%98%EA%B3%BC&entry=pll&filter=location&selected_place_id=1710388626';
const OPEN_STREET_MAP_URL =
  `https://www.openstreetmap.org/export/embed.html?bbox=126.9400%2C37.5020%2C126.9545%2C37.5105&layer=mapnik&marker=${LAT}%2C${LNG}`;

function ClinicMap() {
  return (
    <div className="clinic-map-wrap">
      <iframe
        className="clinic-map-embed"
        src={OPEN_STREET_MAP_URL}
        title="연세제이치과 위치 지도"
      />
      <a
        href={NAVER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="clinic-map-badge"
        aria-label="네이버 지도에서 연세제이치과 위치 보기"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#03C75A">
          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
        </svg>
        네이버 지도에서 보기
      </a>
    </div>
  );
}

export default ClinicMap;
