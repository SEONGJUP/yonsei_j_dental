import { useState, useEffect, useRef, useCallback } from 'react';
import './Reviews.css';

const NAVER_REVIEW_URL = 'https://m.place.naver.com/hospital/1710388626/review/visitor?bk_query=%EC%97%B0%EC%84%B8%EC%A0%9C%EC%9D%B4%EC%B9%98%EA%B3%BC&entry=pll';

const SURNAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '오', '한', '신', '서', '권'];

const REVIEWS = [
  {
    id: 1,
    author: `${SURNAMES[0]}○○`,
    rating: 5,
    text: '원장님 진짜 실력자.. 고수.. 최고에요.. ♥\n\n어금니 충치가 심해서 다른 치과에서는 크라운 씌우라고 하더라구요. 하기 싫어서 레진빌드업 잘하는 치과 찾아서 왔는데요! 너무 만족합니다! 가격도 합리적이고, 무엇보다 원장님 스킬이 최고에요!! 친절하시고 설명도 자세하게 해주셔요 ㅎㅎ\n\n간호사쌤들이랑 데스크 직원분, 치위생사 선생님들 다 너무 친절하세요!\n\n리뷰 귀찮아서 안적는 스타일인데 넘 만족했어서 이벤트 없이(?) 자의로 작성합니다!',
    keyword: '크라운 대신 레진빌드업',
  },
  {
    id: 2,
    author: `${SURNAMES[3]}○○`,
    rating: 5,
    text: '다니던 치과에서 인접면 인레이 치료 세개를 권유 받았는데 정작 두개는 아무이상없고 한개만 레진으로 떼웠습니다. 인레이 굳이 안해도 되는데 왜 대부분의 치과들은 권유할까요? 그것이 알고싶습니다.\n\n당일 치료가 가능하다는 점, 자연치를 최대한 살릴 수 있다는 점에서 만족도 높은 치료였습니다.\n\n치위생사분들도 친절합니다. 강력 추천합니다.',
    keyword: '인레이 대신 레진',
  },
  {
    id: 3,
    author: `${SURNAMES[7]}○○`,
    rating: 5,
    text: '유튜브 보고 최대한 치아 보존해주신다고 해서 찾아갔는데 그대로 였습니다! 😊\n\n초기 충치가 있는데 정지우식 가능성이 크다고 1년 뒤에 다시 정기검진 받으러 오기로 했어요! 다른치과에서는 바로 인레이 권유 받았었거든요~ 소중한 내 치아 😊\n\n이 좋은 치과가 더 번성하기를 바라는 마음에 리뷰 남겨요~ 💙',
    keyword: '자연치 최대한 보존',
  },
  {
    id: 4,
    author: `${SURNAMES[1]}○○`,
    rating: 5,
    text: '집 앞 치과들 중에 고민하다가 리뷰가 제일 좋은 거 같아서 왔는데 리뷰들이 다 좋은 이유가 있었어요 ㅠㅠ\n\n직원분들 다 너무 친절하시고 특히 데스크에 앉아계신분 넘넘 친절하셔서 좋았어요 ㅎㅎ\n\n사랑니도 아무프게 빼주시고 불편한 새벽에도 연락하라 하시고 의사쌤도 넘~~친절하세요 ㅎㅎ\n\n다른거 권유도 안 하시고 좋습니다 👍👍',
    keyword: '친절함 · 과잉진료 없음',
  },
  {
    id: 5,
    author: `${SURNAMES[5]}○○`,
    rating: 5,
    text: '원장님이 친절하고 꼼꼼하게 봐주세요. 다른 데서 레진빌드업 치료 받았는데 받고 나서 여길 알았네요.. ㅠ\n\n가격도 여기가 훨씬 합리적이고.. 충치도 지금 꼭 치료 필요한 것만 짚어주시고.. 무엇보다 질문하기가 마음이 편했어요.\n\n뭔가 문제 생겨도 잘 대처해주실 거 같고 치아 관련해서 잘 몰라서 물안했던 것들 질문 다 잘 답변해주셔서 넘 좋아요. 추천합니다!',
    keyword: '합리적 가격 · 꼼꼼한 진료',
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="review-card__stars" aria-label={`별점 ${count}점`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < count ? '#FF6B35' : '#e0e0e0'}>
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.3l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__avatar">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
          <circle cx="18" cy="13" r="7" fill="rgba(255,255,255,0.85)"/>
          <path d="M4 34c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
        <div className="review-card__meta">
          <span className="review-card__author">{review.author}</span>
          <div className="review-card__naver">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#03C75A">
              <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
            </svg>
            <span>네이버 리뷰</span>
          </div>
        </div>
        <StarRating count={review.rating} />
      </div>
      <span className="review-card__keyword">{review.keyword}</span>
      <p className="review-card__text">
        {review.text.split('\n\n').map((para, i, arr) => (
          <span key={i}>{para}{i < arr.length - 1 && <><br /><br /></>}</span>
        ))}
      </p>
    </div>
  );
}

function Reviews() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [reviewCount, setReviewCount] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch('/api/review-count')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.count) setReviewCount(d.count.toLocaleString()); })
      .catch(() => {});
  }, []);

  const go = useCallback((idx, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 350);
  }, [animating]);

  const next = useCallback(() => {
    go((current + 1) % REVIEWS.length, 'next');
  }, [current, go]);

  const prev = useCallback(() => {
    go((current - 1 + REVIEWS.length) % REVIEWS.length, 'prev');
  }, [current, go]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5500);
  }, [next]);

  return (
    <section id="reviews" className="section reviews snap-section">
      <div className="container">
        <div className="reviews__intro">
          <div className="reviews__naver-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#03C75A">
              <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
            </svg>
            네이버 리뷰
            <span className="reviews__naver-count">3년간 1,838건</span>
          </div>
          <h2 className="section-title reviews__title">
            연세제이치과의<br className="m-br" />치아와 잇몸에 대한 마음은<br />
            <span className="reviews__title-em">네이버 리뷰가 대변해줍니다</span>
          </h2>
          <p className="section-subtitle">
            리뷰는 100% 다녀가신 분들의 소중한 실제 후기들입니다.
          </p>
        </div>

        <div className="reviews__stage">
          <button
            className="reviews__nav reviews__nav--prev"
            onClick={() => { prev(); resetTimer(); }}
            aria-label="이전 리뷰"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={`reviews__track reviews__track--${direction} ${animating ? 'reviews__track--out' : 'reviews__track--in'}`}>
            <ReviewCard review={REVIEWS[current]} />
          </div>

          <button
            className="reviews__nav reviews__nav--next"
            onClick={() => { next(); resetTimer(); }}
            aria-label="다음 리뷰"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="reviews__dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`reviews__dot ${i === current ? 'reviews__dot--active' : ''}`}
              onClick={() => { go(i, i > current ? 'next' : 'prev'); resetTimer(); }}
              aria-label={`${i + 1}번 리뷰`}
            />
          ))}
        </div>

        <p className="reviews__slide-count">{current + 1} / {REVIEWS.length}</p>

        <div className="reviews__cta">
          <a
            href={NAVER_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews__cta-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
            </svg>
            네이버 리뷰 더 보러가기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
