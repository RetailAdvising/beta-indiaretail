# Vercel Billing Optimization Guide - Function Duration Issues

## What is Function Duration?

**Function Duration** in Vercel refers to the total execution time of your serverless functions (API routes, middleware, and server-side rendering functions). You're billed based on:

- **Execution Time**: How long your functions run
- **Memory Usage**: Amount of memory allocated to functions
- **Number of Invocations**: How many times functions are called

### Vercel Pricing Tiers
- **Hobby Plan**: 100 GB-hours/month free
- **Pro Plan**: 1,000 GB-hours/month included, then $0.18 per additional GB-hour
- **Enterprise**: Custom pricing

**GB-hour calculation**: Memory allocation (in GB) × Execution time (in hours)

## Common Causes of High Function Duration

### 1. **Slow API Calls**
```javascript
// ❌ BAD: Synchronous API calls
export async function getServerSideProps() {
    const data1 = await fetch('/api/data1');
    const data2 = await fetch('/api/data2'); // Waits for data1 to complete
    const data3 = await fetch('/api/data3'); // Waits for data2 to complete

    return { props: { data1, data2, data3 } };
}

// ✅ GOOD: Parallel API calls
export async function getServerSideProps() {
    const [data1, data2, data3] = await Promise.all([
        fetch('/api/data1'),
        fetch('/api/data2'),
        fetch('/api/data3')
    ]);

    return { props: { data1, data2, data3 } };
}
```

### 2. **Inefficient Database Queries**
```javascript
// ❌ BAD: Multiple database calls in loop
for (const id of articleIds) {
    const article = await db.articles.findById(id);
    articles.push(article);
}

// ✅ GOOD: Batch database query
const articles = await db.articles.findMany({
    where: { id: { in: articleIds } }
});
```

### 3. **Large Data Processing**
```javascript
// ❌ BAD: Processing large arrays synchronously
const processedData = largeArray.map(item => heavyProcessing(item));

// ✅ GOOD: Stream processing or pagination
const processedData = [];
for (let i = 0; i < largeArray.length; i += 100) {
    const batch = largeArray.slice(i, i + 100);
    const processed = await Promise.all(batch.map(item => heavyProcessing(item)));
    processedData.push(...processed);
}
```

### 4. **Missing Caching**
```javascript
// ❌ BAD: No caching
export async function getStaticProps() {
    const data = await expensiveApiCall();
    return { props: { data } };
}

// ✅ GOOD: With revalidation
export async function getStaticProps() {
    const data = await expensiveApiCall();
    return {
        props: { data },
        revalidate: 3600 // Cache for 1 hour
    };
}
```

## Solutions for Your India Retailing Project

### 1. **Optimize API Functions (libs/api.js)**

#### Current Issues in Your Code:
```javascript
// Your current API pattern
export async function articlesList(data) {
    const api = domainUrl + 'get_articles_list_by_cat_by_route';
    return await postMethod(api, data);
}

export async function articlesDetail(data) {
    const api = domainUrl + 'get_single_article_by_route';
    return await postMethod(api, data);
}
```

#### Optimization Solutions:

**A. Implement Request Caching**
```javascript
// Add caching to your API functions
const cache = new Map();
const CACHE_TTL = 300000; // 5 minutes

export async function articlesList(data) {
    const cacheKey = `articles_${JSON.stringify(data)}`;
    const cached = cache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
        return cached.data;
    }

    const api = domainUrl + 'get_articles_list_by_cat_by_route';
    const result = await postMethod(api, data);

    cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
    });

    return result;
}
```

**B. Batch API Calls**
```javascript
// Create a batch function for multiple API calls
export async function batchApiCalls(calls) {
    return await Promise.all(calls.map(call =>
        postMethod(call.api, call.data).catch(err => ({error: err}))
    ));
}

// Usage in pages
export async function getServerSideProps({ query }) {
    const calls = [
        { api: domainUrl + 'get_articles_list_by_cat_by_route', data: query },
        { api: domainUrl + 'get_advertisements', data: { page: 'home' } },
        { api: domainUrl + 'get_website_settings', data: {} }
    ];

    const [articles, ads, settings] = await batchApiCalls(calls);

    return { props: { articles, ads, settings } };
}
```

### 2. **Optimize Pages with Static Generation**

**Convert Server-Side Rendering to Static Generation:**

```javascript
// ❌ Current: Server-side rendering (expensive)
export async function getServerSideProps({ query }) {
    const param = {
        doctype: "Homepage",
        docname: "Homepage"
    };
    const resp = await HomePage(param);
    const data = await resp.message;

    return { props: { data } };
}

// ✅ Optimized: Static generation with revalidation
export async function getStaticProps() {
    const param = {
        doctype: "Homepage",
        docname: "Homepage"
    };
    const resp = await HomePage(param);
    const data = await resp.message;

    return {
        props: { data },
        revalidate: 1800 // Regenerate every 30 minutes
    };
}

// For dynamic routes with static generation
export async function getStaticPaths() {
    // Generate paths for most visited articles
    const popularArticles = await getPopularArticleSlugs();

    const paths = popularArticles.map(slug => ({
        params: { slug }
    }));

    return {
        paths,
        fallback: 'blocking' // Generate other pages on-demand
    };
}
```

### 3. **Optimize Database Queries**

**Create efficient data fetching patterns:**

```javascript
// ❌ Bad: Multiple sequential calls
const articles = await articlesList({ category: 'retail' });
const comments = await commentList({ article_id: articles[0].id });
const author = await getAuthor({ id: articles[0].author_id });

// ✅ Good: Single optimized call
export async function getArticleWithDetails(articleId) {
    const api = domainUrl + 'get_article_with_details';
    return await postMethod(api, {
        article_id: articleId,
        include_comments: true,
        include_author: true,
        include_related: true
    });
}
```

### 4. **Implement Edge Caching**

**Add Vercel Edge Config for static data:**

```javascript
// vercel.json
{
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=3600, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

### 5. **Optimize Images and Media**

```javascript
// Use Next.js Image optimization
import Image from 'next/image';

// ❌ Bad: Unoptimized images
<img src={check_Image(article.image)} alt={article.title} />

// ✅ Good: Optimized images
<Image
    src={check_Image(article.image)}
    alt={article.title}
    width={400}
    height={300}
    priority={index < 3} // Only for above-fold images
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

## Immediate Action Plan

### Phase 1: Quick Wins (1-2 days)

1. **Add Function Timeouts**
```javascript
// In vercel.json
{
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 10
    },
    "pages/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

2. **Enable ISR for Static Pages**
```javascript
// In pages/aboutus/index.js, pages/advertise-with-us/index.js
export async function getStaticProps() {
    // Your existing code
    return {
        props: { data },
        revalidate: 3600 // 1 hour
    };
}
```

3. **Add Request Caching**
```javascript
// Update libs/api.js postMethod
const requestCache = new Map();

export async function postMethod(api, payload) {
    const cacheKey = `${api}_${JSON.stringify(payload)}`;
    const cached = requestCache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp) < 300000) { // 5 min cache
        return cached.data;
    }

    // Your existing fetch logic
    const result = await fetch(/* ... */);

    requestCache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
    });

    return result;
}
```

### Phase 2: Medium-term Optimizations (3-7 days)

1. **Database Query Optimization**
2. **Implement CDN for static assets**
3. **Add monitoring for function performance**
4. **Optimize bundle size**

### Phase 3: Long-term Solutions (1-2 weeks)

1. **Move to Edge Runtime where possible**
2. **Implement advanced caching strategies**
3. **Database connection pooling**
4. **Consider microservices architecture**

## Monitoring and Debugging

### 1. **Add Performance Monitoring**
```javascript
// Add to _app.js
export function reportWebVitals(metric) {
    if (metric.label === 'web-vital') {
        console.log(metric);
        // Send to analytics
        analytics.track('Web Vital', {
            name: metric.name,
            value: metric.value,
            id: metric.id
        });
    }
}
```

### 2. **Function Duration Tracking**
```javascript
// Add to API routes
export default async function handler(req, res) {
    const startTime = Date.now();

    try {
        // Your API logic
        const result = await yourApiLogic(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        const duration = Date.now() - startTime;
        console.log(`Function duration: ${duration}ms`);

        if (duration > 5000) { // Alert if > 5 seconds
            console.warn(`Slow function detected: ${duration}ms`);
        }
    }
}
```

### 3. **Vercel Analytics Integration**
```bash
npm install @vercel/analytics
```

```javascript
// Add to _app.js
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
```

## Expected Savings

After implementing these optimizations:

- **Function Duration**: 60-80% reduction
- **Monthly Cost**: 50-70% reduction
- **Page Load Speed**: 2-3x faster
- **SEO Performance**: Improved Core Web Vitals

## Tools for Monitoring

1. **Vercel Dashboard**: Function metrics and billing
2. **Next.js Analytics**: Performance insights
3. **Google PageSpeed Insights**: Core Web Vitals
4. **Vercel Speed Insights**: Real user monitoring

## Emergency Cost Control

If billing is critically high:

1. **Immediate**: Set function timeout limits
2. **Short-term**: Enable ISR on all pages
3. **Medium-term**: Move static content to CDN
4. **Long-term**: Architectural review

## Contact Points

- **Vercel Support**: For billing inquiries
- **Next.js Discord**: For optimization help
- **Performance Monitoring**: Set up alerts at 80% of monthly limit

---

**Remember**: Monitor your changes through Vercel's dashboard and adjust based on actual performance metrics.

*Last updated: 2025-09-29*