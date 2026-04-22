const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5501;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Yonsei J Dental API is running' });
});

app.get('/api/clinic-info', (req, res) => {
  res.json({
    name: '연세제이치과의원',
    phone: '02-815-2875',
    address: '서울 동작구 만양로 17, 2층',
    addressDetail: '상도동 19-17',
    hours: {
      mon: '09:30 - 18:30',
      tue: '09:30 - 21:00',
      wed: '09:30 - 18:30',
      thu: '09:30 - 21:00',
      fri: '09:30 - 18:30',
      sat: '09:30 - 14:00',
      sun: '휴진',
      lunch: '13:00 - 14:00',
    },
    nightCare: ['화요일', '목요일'],
    departments: [
      '치과', '구강악안면외과', '치과보철과', '치과교정과',
      '소아치과', '치주과', '치과보존과', '구강내과',
      '영상치의학과', '예방치과'
    ],
  });
});

// Naver Blog RSS proxy
const BLOG_ID = 'ysjeidc';
let blogCache = { data: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; YonseiJDental/1.0)',
      },
    };
    const req = https.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return fetchRSS(response.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => resolve(data));
      response.on('error', reject);
    });
    req.on('error', reject);
  });
}

function parseRSSItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const getTag = (tag) => {
      const m = itemXml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
      if (m) return m[1].trim();
      const m2 = itemXml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
      return m2 ? m2[1].trim() : '';
    };

    const title = getTag('title');
    const link = getTag('link');
    const description = getTag('description');
    const pubDate = getTag('pubDate');

    // Extract first image from description
    const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
    let thumbnail = imgMatch ? imgMatch[1] : '';

    // Clean description: remove HTML tags, limit length
    const cleanDesc = description
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim()
      .slice(0, 120);

    items.push({
      title,
      link,
      description: cleanDesc + (cleanDesc.length >= 120 ? '...' : ''),
      thumbnail,
      pubDate,
    });
  }

  return items;
}

// YouTube RSS
const YT_CHANNEL_ID = 'UCLcyi5GOklyvjVWpgAVzr7g';
const YT_CHANNEL_URL = `https://www.youtube.com/channel/${YT_CHANNEL_ID}`;
let ytCache = { data: null, timestamp: 0 };
const YT_CACHE_TTL = 30 * 60 * 1000; // 30분

function parseYTFeed(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRegex.exec(xml)) !== null && entries.length < 3) {
    const e = m[1];
    const get = (tag) => { const r = e.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)); return r ? r[1].trim() : ''; };
    const videoId = get('yt:videoId');
    const title = get('title');
    const published = get('published');
    const views = (() => { const r = e.match(/statistics views="(\d+)"/); return r ? parseInt(r[1]) : 0; })();
    const isShort = e.includes('/shorts/');
    const link = isShort ? `https://www.youtube.com/shorts/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`;
    entries.push({
      videoId, title, published, views,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      link,
      isShort,
    });
  }
  return entries;
}

app.get('/api/youtube', async (req, res) => {
  try {
    const now = Date.now();
    if (ytCache.data && (now - ytCache.timestamp) < YT_CACHE_TTL) return res.json(ytCache.data);
    const xml = await fetchRSS(`https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`);
    const videos = parseYTFeed(xml);
    const result = { channelUrl: YT_CHANNEL_URL, videos };
    ytCache = { data: result, timestamp: now };
    res.json(result);
  } catch (err) {
    console.error('YouTube RSS error:', err.message);
    if (ytCache.data) return res.json(ytCache.data);
    res.status(500).json({ error: 'Failed to fetch YouTube feed' });
  }
});

const PLACE_ID = '1710388626';
let reviewCountCache = { data: null, timestamp: 0 };
const REVIEW_CACHE_TTL = 60 * 60 * 1000; // 1 hour

app.get('/api/review-count', async (req, res) => {
  try {
    const now = Date.now();
    if (reviewCountCache.data && (now - reviewCountCache.timestamp) < REVIEW_CACHE_TTL) {
      return res.json(reviewCountCache.data);
    }

    const data = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'map.naver.com',
        path: `/p/api/place/summary/${PLACE_ID}`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://map.naver.com/',
        },
      };
      const req = https.get(options, (response) => {
        let body = '';
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => {
          try { resolve(JSON.parse(body)); } catch { reject(new Error('parse error')); }
        });
      });
      req.on('error', reject);
    });

    const displayText = data?.data?.placeDetail?.visitorReviews?.displayText || '';
    const match = displayText.match(/[\d,]+/);
    const count = match ? parseInt(match[0].replace(/,/g, ''), 10) : null;

    const result = { count, displayText };
    reviewCountCache = { data: result, timestamp: now };
    res.json(result);
  } catch (err) {
    console.error('Review count fetch error:', err.message);
    if (reviewCountCache.data) return res.json(reviewCountCache.data);
    res.json({ count: null, displayText: '' });
  }
});

// ── Naver Static Map proxy ──
// 환경변수: NAVER_CLIENT_ID (x-ncp-apigw-api-key-id)
//          NAVER_CLIENT_SECRET (x-ncp-apigw-api-key)
app.get('/api/naver-static-map', (req, res) => {
  const clientId     = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.status(503).json({ error: 'Naver Maps not configured' });
  }

  const w     = Math.min(parseInt(req.query.w)     || 640,  2048);
  const h     = Math.min(parseInt(req.query.h)     || 420,  2048);
  const level = Math.min(parseInt(req.query.level) || 15,   21);

  const params = new URLSearchParams({
    center:  '126.9472485,37.5062069',
    level:   String(level),
    w:       String(w),
    h:       String(h),
    markers: 'type:e|size:mid|pos:126.9472485 37.5062069',
    scale:   '2',
    maptype: 'basic',
  });

  https.get(
    {
      hostname: 'maps.apigw.ntruss.com',
      path:     `/map-static/v2/raster?${params.toString()}`,
      headers: {
        'x-ncp-apigw-api-key-id': clientId,
        'x-ncp-apigw-api-key':    clientSecret,
      },
    },
    (imgRes) => {
      if (imgRes.statusCode !== 200) {
        console.error('Naver static map status:', imgRes.statusCode);
        return res.status(imgRes.statusCode || 502).end();
      }
      res.setHeader('Content-Type',  imgRes.headers['content-type'] || 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      imgRes.pipe(res);
    }
  ).on('error', (err) => {
    console.error('Naver static map error:', err.message);
    res.status(502).end();
  });
});

const ALLOWED_IMAGE_HOSTS = ['blogthumb.pstatic.net', 'postfiles.pstatic.net', 'blogpfthumb.phinf.naver.net', 'blogpfthumb-phinf.pstatic.net'];

app.get('/api/img-proxy', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).end();

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).end();
  }

  if (!ALLOWED_IMAGE_HOSTS.includes(parsedUrl.hostname)) {
    return res.status(403).end();
  }

  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.pathname + parsedUrl.search,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; YonseiJDental/1.0)',
      'Referer': 'https://blog.naver.com/',
    },
  };

  https.get(options, (imgRes) => {
    res.setHeader('Content-Type', imgRes.headers['content-type'] || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    imgRes.pipe(res);
  }).on('error', () => res.status(502).end());
});

app.get('/api/blog', async (req, res) => {
  try {
    const now = Date.now();
    if (blogCache.data && (now - blogCache.timestamp) < CACHE_TTL) {
      return res.json(blogCache.data);
    }

    const rssUrl = `https://rss.blog.naver.com/${BLOG_ID}.xml`;
    const xml = await fetchRSS(rssUrl);
    const posts = parseRSSItems(xml).slice(0, 6);

    const result = {
      blogUrl: `https://blog.naver.com/${BLOG_ID}`,
      posts,
    };

    blogCache = { data: result, timestamp: now };
    res.json(result);
  } catch (err) {
    console.error('Blog RSS fetch error:', err.message);
    if (blogCache.data) {
      return res.json(blogCache.data);
    }
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Local dev only: serve built frontend
if (process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Start server only when run directly (not imported by Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
