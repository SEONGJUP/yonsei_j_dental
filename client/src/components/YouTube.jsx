import { useState, useEffect } from 'react';
import './YouTube.css';

function formatViews(n) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만회`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천회`;
  return `${n}회`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function VideoCard({ video, index }) {
  const [thumbError, setThumbError] = useState(false);

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="yt-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="yt-card__thumb">
        {!thumbError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            onError={() => setThumbError(true)}
          />
        ) : (
          <div className="yt-card__thumb-fallback">
            <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
              <path d="M21.8 8S21.6 6.5 21 5.7c-.7-.8-1.5-.8-1.8-.9C16.8 4.7 12 4.7 12 4.7s-4.8 0-7.2.1c-.4 0-1.2.1-1.8.9C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.5v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.3c.7.8 1.6.8 2 .9C6.5 20 12 20 12 20s4.8 0 7.2-.2c.4 0 1.2-.1 1.8-.9.6-.8.8-2.3.8-2.3S22 14.8 22 13v-1.6C22 9.8 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z"/>
            </svg>
          </div>
        )}
        <div className="yt-card__play">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        {video.isShort && <span className="yt-card__short-badge">Shorts</span>}
      </div>
      <div className="yt-card__body">
        <h3 className="yt-card__title">{video.title}</h3>
        <div className="yt-card__meta">
          {video.views > 0 && <span>조회 {formatViews(video.views)}</span>}
          <span>{formatDate(video.published)}</span>
        </div>
      </div>
    </a>
  );
}

function YouTube() {
  const [videos, setVideos] = useState([]);
  const [channelUrl, setChannelUrl] = useState('https://www.youtube.com/channel/UCLcyi5GOklyvjVWpgAVzr7g');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/youtube')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.videos) setVideos(d.videos);
        if (d?.channelUrl) setChannelUrl(d.channelUrl);
      })
      .catch(() => {})
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
          <h2 className="section-title">
            치아 건강 정보를 영상으로 만나보세요
          </h2>
          <p className="section-subtitle">
            레진빌드업 · 충치 · 잇몸 등 치아 정보를 쉽게 알려드립니다
          </p>
        </div>

        {loading ? (
          <div className="youtube__skeleton-wrap">
            {[0, 1, 2].map(i => <div key={i} className="youtube__skeleton" />)}
          </div>
        ) : (
          <div className="youtube__grid">
            {videos.map((v, i) => <VideoCard key={v.videoId} video={v} index={i} />)}
          </div>
        )}

        <div className="youtube__cta">
          <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="youtube__cta-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M21.8 8S21.6 6.5 21 5.7c-.7-.8-1.5-.8-1.8-.9C16.8 4.7 12 4.7 12 4.7s-4.8 0-7.2.1c-.4 0-1.2.1-1.8.9C2.4 6.5 2.2 8 2.2 8S2 9.8 2 11.5v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.3c.7.8 1.6.8 2 .9C6.5 20 12 20 12 20s4.8 0 7.2-.2c.4 0 1.2-.1 1.8-.9.6-.8.8-2.3.8-2.3S22 14.8 22 13v-1.6C22 9.8 21.8 8 21.8 8zM10 15.5v-7l6 3.5-6 3.5z"/>
            </svg>
            유튜브 채널 구독하기
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default YouTube;
