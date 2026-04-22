import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import './ClinicMap.css';

const LAT = 37.5062069;
const LNG = 126.9472485;
const NAVER_URL =
  'https://m.place.naver.com/hospital/1710388626/location?bk_query=%EC%97%B0%EC%84%B8%EC%A0%9C%EC%9D%B4%EC%B9%98%EA%B3%BC&entry=pll&filter=location&selected_place_id=1710388626';
const NCP_ID = import.meta.env.VITE_NAVER_CLIENT_ID;

// PIN 앵커: bubble(22px) + gap(4px) + dot반경(7px) = 33px (dot 중심)
// 가로 중심: bubble 너비 ~90px → 45px
const ANCHOR_X = 45;
const ANCHOR_Y = 33;

const PIN_HTML = `<div class="clinic-pin">
  <div class="clinic-pin__bubble">연세제이치과</div>
  <div class="clinic-pin__dot"></div>
  <div class="clinic-pin__shadow"></div>
</div>`;

// ── Naver Dynamic Map (JS API) ──
function initNaverMap(container) {
  const { naver } = window;
  const map = new naver.maps.Map(container, {
    center: new naver.maps.LatLng(LAT, LNG),
    zoom: 17,
    zoomControl: true,
    zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
    mapTypeControl: false,
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
  });
  new naver.maps.Marker({
    position: new naver.maps.LatLng(LAT, LNG),
    map,
    icon: {
      content: PIN_HTML,
      size: new naver.maps.Size(90, 46),
      anchor: new naver.maps.Point(ANCHOR_X, ANCHOR_Y),
    },
  });
  return map;
}

// ── Leaflet (기본 interactive 지도) ──
function initLeafletMap(container) {
  return import('leaflet').then((L) => {
    const map = L.map(container, {
      center: [LAT, LNG],
      zoom: 17,
      zoomControl: false,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      attributionControl: false,
    });
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd', maxZoom: 19 }
    ).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);
    const icon = L.divIcon({
      className: '',
      html: PIN_HTML,
      iconSize: [90, 46],
      iconAnchor: [ANCHOR_X, ANCHOR_Y],
    });
    L.marker([LAT, LNG], { icon }).addTo(map);
    return map;
  });
}

// ── 우선순위: VITE_NAVER_CLIENT_ID 있으면 Naver Dynamic, 없으면 Leaflet ──
function ClinicMap() {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    if (NCP_ID) {
      if (window.naver?.maps) {
        mapRef.current = initNaverMap(containerRef.current);
      } else {
        const s = document.createElement('script');
        s.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NCP_ID}`;
        s.onload = () => { mapRef.current = initNaverMap(containerRef.current); };
        document.head.appendChild(s);
      }
    } else {
      initLeafletMap(containerRef.current).then((m) => { mapRef.current = m; });
    }
  }, []);

  return (
    <div className="clinic-map-wrap">
      <div ref={containerRef} className="clinic-map-container" />
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
