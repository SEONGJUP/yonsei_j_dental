import { useState, useEffect } from 'react';
import './YouTube.css';

const CHANNEL_ID  = 'UCLcyi5GOklyvjVWpgAVzr7g';
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;
const YOUTUBE_RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/* YouTube Atom 피드 XML 파서 */
function parseYoutubeXML(xml) {
  const entries = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml)) !== null && entries.length < 3) {
    const e = m[1];
    const get = (tag) => {
      const r = e.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return r ? r[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim() : '';
    };
    const videoId = get('yt:videoId');
    if (!videoId) continue;
    entries.push({
      title:     get('title'),
      link:      `https://www.youtube.com/watch?v=${videoId}`,
      pubDate:   get('published'),
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    });
  }
  return entries;
}

/* RSS2JSON 응답 파서 */
function parseRss2Json(data) {
  if (data.status !== 'ok' || !data.items?.length) return [];
  return data.items.slice(0, 3).map(item => {
    const vidMatch = item.link?.match(/[?&]v=([^&]+)/);
    const videoId  = vidMatch?.[1] ?? item.guid?.split('watch?v=')[1] ?? '';
    return {
      title:     item.title,
      link:      item.link,
      pubDate:   item.pubDate,
      thumbnail: videoId
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : item.thumbnail,
    };
  });
}

/* 프록시 소스 목록 — 순서대로 시도 */
const SOURCES = [
  {
    url:   () => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(YOUTUBE_RSS)}&count=3`,
    parse: async (r) => parseRss2Json(await r.json()),
  },
  {
    url:   () => `https://corsproxy.io/?${encodeURIComponent(YOUTUBE_RSS)}`,
    parse: async (r) => parseYoutubeXML(await r.text()),
  },
  {
    url:   () => `https://api.allorigins.win/raw?url=${encodeURIComponent(YOUTUBE_RSS)}`,
    parse: async (r) => parseYoutubeXML(await r.text()),
  },
];

async function fetchLatestVideos() {
  for (const src of SOURCES) {
    try {
      const res = await fetch(src.url(), { signal: AbortSignal.timeout(6000) });
      if (!res.ok) continue;
      const videos = await src.parse(res);
      if (videos.length > 0) return videos;
    } catch {
      /* 다음 소스로 */
    }
  }
  return [];
}

/* ── 날짜 포맷 ── */
function formatDate(str) {
  const d = new Date(str);
  if (isNaN(d)) return '';
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

/* ── 영상 카드 ── */
function VideoCard({ video, index }) {
  const [thumbErr, setThumbErr] = useState(false);
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="yt-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="yt-card__thumb">
        {!thumbErr && video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} loading="lazy" onError={() => setThumbErr(true)} />
        ) : (
          <div className="yt-card__thumb-fallback">
            <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
              <path d="M21.8 8S21.6 6.5 21 5.7c-.7-.8-1.5-.8-1.8-.9C16.8 4.7 12 4.7 12 4.7s-4.8 0-7.2.1c-.4 0-1.2.1-1.8.9C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.5v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.3c.7.8 1.6.8 2 .9C6.5 20 12 20 12 20s4.8 0 7.2-.2c.4 0 1.2-.1 1.8-.9.6-.8.8-2.3.8-2.3S22 14.8 22 13v-1.6C22 9.8 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z"/>
            </svg>
          </div>
        )}
        <div className="yt-card__play">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div className="yt-card__body">
        <h3 className="yt-card__title">{video.title}</h3>
        <div className="yt-card__meta">
          {video.pubDate && <span>{formatDate(video.pubDate)}</span>}
        </div>
      </div>
    </a>
  );
}

/* ── 메인 컴포넌트 ── */
function YouTube() {
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestVideos()
      .then(setVideos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="youtube" className="section youtube snap-section">
      <div className="container">
        <div className="youtube__header">
          <div className="youtube__badge">
            <svg viewBox="0 0 24 24" fill="#FF0000" width="22" height="22">
              <path d="M21.8 8S21.6 6.5 21 5.7c-.7-.8-1.5-.8-1.8-.9C16.8 4.7 12 4.7 12 4.7s-4.8 0-7.2.1c-.4 0-1.2.1-1.8.9C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.5v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.3c.7.8 1.6.8 2 .9C6.5 20 12 20 12 20s4.8 0 7.2-.2c.4 0 1.2-.1 1.8-.9.6-.8.8-2.3.8-2.3S22 14.8 22 13v-1.6C22 9.8 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z"/>
            </svg>
            YouTube · 치아지킴이
          </div>
          <h2 className="section-title">치아 건강 정보를 영상으로 만나보세요</h2>
          <p className="section-subtitle">레진빌드업 · 충치 · 잇몸 등 치아 정보를 쉽게 알려드립니다</p>
        </div>

        {loading ? (
          <div className="youtube__skeleton-wrap">
            {[0,1,2].map(i => <div key={i} className="youtube__skeleton" />)}
          </div>
        ) : videos.length > 0 ? (
          <div className="youtube__grid">
            {videos.map((v, i) => <VideoCard key={v.link} video={v} index={i} />)}
          </div>
        ) : (
          <div className="youtube__fallback">
            <p>최신 영상을 불러오지 못했습니다.</p>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="youtube__cta-btn">
              유튜브 채널에서 보기
            </a>
          </div>
        )}

        {!loading && videos.length > 0 && (
          <div className="youtube__cta">
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="youtube__cta-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M21.8 8S21.6 6.5 21 5.7c-.7-.8-1.5-.8-1.8-.9C16.8 4.7 12 4.7 12 4.7s-4.8 0-7.2.1c-.4 0-1.2.1-1.8.9C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.5v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.3c.7.8 1.6.8 2 .9C6.5 20 12 20 12 20s4.8 0 7.2-.2c.4 0 1.2-.1 1.8-.9.6-.8.8-2.3.8-2.3S22 14.8 22 13v-1.6C22 9.8 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z"/>
              </svg>
              유튜브 채널 구독하기
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default YouTube;
