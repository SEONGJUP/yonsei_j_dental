import { useState, useEffect } from 'react';
import { FiArrowRight, FiExternalLink, FiCalendar } from 'react-icons/fi';
import './Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [blogUrl, setBlogUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const proxyThumb = (url) => url ? `/api/img-proxy?url=${encodeURIComponent(url)}` : '';

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
        setBlogUrl(data.blogUrl || 'https://blog.naver.com/ysjeidc');
      })
      .catch((err) => {
        console.error('Blog fetch failed:', err);
        setBlogUrl('https://blog.naver.com/ysjeidc');
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <section id="blog" className="section blog">
        <div className="container">
          <h2 className="section-title">블로그</h2>
          <p className="section-subtitle">최근 진료 사례와 치과 정보를 확인하세요</p>
          <div className="blog__loading">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="blog__skeleton" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section blog">
      <div className="container">
        <div>
          <h2 className="section-title">블로그</h2>
          <p className="section-subtitle">최근 진료 사례와 치과 정보를 확인하세요</p>
        </div>

        {posts.length > 0 ? (
          <div className="blog__grid">
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog__card"
              >
                <div className="blog__thumb">
                  {post.thumbnail ? (
                    <img
                      src={proxyThumb(post.thumbnail)}
                      alt={post.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = '<div class="blog__thumb-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></div>';
                      }}
                    />
                  ) : (
                    <div className="blog__thumb-placeholder">
                      <FiExternalLink />
                    </div>
                  )}
                </div>
                <div className="blog__body">
                  <h3 className="blog__title">{post.title}</h3>
                  <p className="blog__desc">{post.description}</p>
                  <div className="blog__meta">
                    <span className="blog__date">
                      <FiCalendar size={13} />
                      {formatDate(post.pubDate)}
                    </span>
                    <span className="blog__read-more">
                      자세히 보기 <FiArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="blog__empty">
            <p>블로그 게시물을 불러오는 중 문제가 발생했습니다.</p>
          </div>
        )}

        <div className="blog__cta">
          <a
            href={blogUrl || 'https://blog.naver.com/ysjeidc'}
            target="_blank"
            rel="noopener noreferrer"
            className="blog__cta-btn"
          >
            블로그에서 더 보기 <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Blog;
