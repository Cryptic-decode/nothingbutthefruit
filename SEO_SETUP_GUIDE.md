# Google Search Console & SEO Setup Guide

## Step 1: Google Search Console Setup

### 1.1 Create Google Search Console Account

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Start Now" or "Add Property"
3. Choose "URL prefix" and enter: `https://nothingbutthefruit.com`
4. Click "Continue"

### 1.2 Verify Website Ownership

Choose one of these verification methods:

#### Method A: HTML Meta Tag (Recommended)

1. Copy the verification meta tag provided by Google
2. Add it to your `.env.local` file:

```env
GOOGLE_SITE_VERIFICATION=your_verification_code_here
```

3. The meta tag will be automatically added to your site via `app/layout.tsx`

#### Method B: HTML File Upload

1. Download the HTML verification file from Google
2. Upload it to your `public/` folder
3. Ensure it's accessible at `https://nothingbutthefruit.com/google[verification-code].html`

#### Method C: Google Analytics (if you have it)

1. If you already have Google Analytics set up
2. Select "Google Analytics" as verification method

### 1.3 Submit Sitemap

1. In Google Search Console, go to "Sitemaps" in the left sidebar
2. Click "Add a new sitemap"
3. Enter: `sitemap.xml`
4. Click "Submit"

## Step 2: Google Analytics Setup

### 2.1 Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create a new account for "Nothing But The Fruit"
4. Set up a new property for your website
5. Get your Measurement ID (starts with G-)

### 2.2 Add Analytics to Website

1. Add your Google Analytics ID to `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. The GoogleAnalytics component is already set up in `app/layout.tsx`

## Step 3: Additional SEO Improvements

### 3.1 Create Missing Images

Create these images in your `public/` folder:

- `og-image.jpg` (1200x630px) - Main Open Graph image
- `og-episodes.jpg` (1200x630px) - Episodes page image
- `og-contact.jpg` (1200x630px) - Contact page image

### 3.2 Submit to Other Search Engines

- **Bing Webmaster Tools**: [Bing Webmaster Tools](https://www.bing.com/webmasters/)
- **Yandex Webmaster**: [Yandex Webmaster](https://webmaster.yandex.com/)

### 3.3 Social Media Optimization

- **Facebook**: Create a Facebook Page and add Open Graph tags
- **Twitter**: Ensure Twitter Card meta tags are working
- **YouTube**: Link your YouTube channel in all social profiles

## Step 4: Content Optimization

### 4.1 Add More Content

- Add more detailed content to the About page
- Create episode descriptions with keywords
- Add testimonials or reviews section

### 4.2 Internal Linking

- Link between pages using relevant anchor text
- Add "Related Episodes" or "Popular Episodes" sections
- Create a "Latest Episodes" widget on the homepage

### 4.3 External Linking

- Link to Bass Global Ministries website
- Link to relevant Christian resources
- Get backlinks from other Christian websites

## Step 5: Technical SEO Checklist

### 5.1 Page Speed Optimization

- [ ] Optimize images (already using Next.js Image component)
- [ ] Enable compression
- [ ] Use CDN if needed
- [ ] Minimize CSS and JavaScript

### 5.2 Mobile Optimization

- [ ] Test on mobile devices
- [ ] Ensure touch targets are large enough
- [ ] Check mobile page speed

### 5.3 Schema Markup

- [x] Organization schema (implemented)
- [x] Podcast schema (implemented)
- [ ] Add Person schema for Pastor Demetria Bass
- [ ] Add VideoObject schema for episodes

## Step 6: Monitoring & Maintenance

### 6.1 Regular Monitoring

- Check Google Search Console weekly
- Monitor Google Analytics for traffic patterns
- Track keyword rankings
- Monitor page speed scores

### 6.2 Content Updates

- Publish new episodes regularly
- Update About page with new information
- Add new testimonials or reviews
- Keep contact information current

### 6.3 Technical Maintenance

- Update dependencies regularly
- Monitor for broken links
- Check for crawl errors
- Update sitemap when adding new pages

## Step 7: Local SEO (if applicable)

### 7.1 Google My Business

- Create a Google My Business profile
- Add business information
- Upload photos
- Encourage reviews

### 7.2 Local Citations

- List on Christian directory websites
- Add to ministry directories
- Submit to local business listings

## Environment Variables Needed

Add these to your `.env.local` file:

```env
# Google Search Console Verification
GOOGLE_SITE_VERIFICATION=your_verification_code_here

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Existing variables
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=nbtfruit@gmail.com
```

## Expected Timeline

- **Week 1**: Google Search Console setup and verification
- **Week 2**: Google Analytics setup and data collection
- **Week 3-4**: First indexing and ranking improvements
- **Month 2-3**: Significant ranking improvements with regular content

## Success Metrics

- **Immediate**: Site indexed by Google
- **1 Month**: Appearing in search results for brand terms
- **3 Months**: Ranking for target keywords
- **6 Months**: Strong organic traffic growth

## Troubleshooting

### Common Issues:

1. **Site not indexed**: Check robots.txt, submit sitemap, request indexing
2. **Low rankings**: Improve content quality, add more keywords
3. **No traffic**: Check Analytics setup, verify tracking code
4. **Crawl errors**: Fix broken links, improve site structure

### Support Resources:

- [Google Search Console Help](https://support.google.com/webmasters/)
- [Google Analytics Help](https://support.google.com/analytics/)
- [Next.js SEO Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
