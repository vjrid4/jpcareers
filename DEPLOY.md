# JP Careers — Deployment Guide

Complete guide to deploy the JP Careers static website to production.

---

## Quick Summary

| Option | Cost | Best For |
|--------|------|----------|
| GitHub Pages | Free | Quick deploy, custom domain |
| Cloudflare Pages | Free | Best performance, global CDN |
| Netlify | Free tier | Forms, easy CI/CD |
| VPS (Nginx) | ~₹500/month | Full control |

**Recommended:** Cloudflare Pages (free, fastest, includes CDN + DDoS protection)

---

## Option 1: GitHub Pages (Easiest)

### Prerequisites
- GitHub account
- Domain `jpcareers.in` purchased (Namecheap, GoDaddy, BigRock, etc.)

### Steps

```bash
# 1. Initialize git repo (if not already)
cd /Users/jana/aiwebsite/jpcareers
git init
git add .
git commit -m "Initial commit: JP Careers website"

# 2. Create GitHub repo (via GitHub.com or gh CLI)
gh repo create jpcareers --public --source=. --push

# 3. Enable GitHub Pages
# Go to: GitHub repo → Settings → Pages
# Source: Deploy from branch → main → / (root)
# Custom domain: jpcareers.in
```

### DNS Setup for GitHub Pages
Add these DNS records at your domain registrar:

```
Type: A    Name: @    Value: 185.199.108.153
Type: A    Name: @    Value: 185.199.109.153
Type: A    Name: @    Value: 185.199.110.153
Type: A    Name: @    Value: 185.199.111.153
Type: CNAME  Name: www  Value: vjrid4.github.io
```

Wait 24–48 hours for DNS propagation. Then enable "Enforce HTTPS" in GitHub Pages settings.

---

## Option 2: Cloudflare Pages (Recommended)

### Why Cloudflare Pages?
- Free tier: unlimited sites, unlimited bandwidth
- Automatic HTTPS
- Global CDN (200+ cities)
- Built-in image optimization
- DDoS protection included
- Faster than GitHub Pages

### Steps

```bash
# 1. Push code to GitHub (follow Option 1 steps first)

# 2. Go to dash.cloudflare.com → Pages → Create a project
# Connect to GitHub → Select jpcareers repo
# Build settings:
#   Framework preset: None (static HTML)
#   Build command: (leave empty)
#   Build output directory: /
#   Root directory: /

# 3. Deploy! Cloudflare builds and deploys automatically.
```

### Custom Domain on Cloudflare Pages
1. In Cloudflare Pages project → Custom domains → Add domain
2. Enter `jpcareers.in`
3. If `jpcareers.in` is already on Cloudflare DNS, it auto-configures
4. If not, add these CNAME records at your registrar:
   ```
   CNAME: @  →  <project>.pages.dev
   CNAME: www → <project>.pages.dev
   ```

---

## Option 3: Netlify

```bash
# Via Netlify CLI
npm install -g netlify-cli
cd /Users/jana/aiwebsite/jpcareers
netlify deploy --prod --dir=.

# Or drag-and-drop the folder at netlify.com/drop
```

Custom domain: Netlify → Site settings → Domain management → Add custom domain

---

## Option 4: VPS with Nginx (Full Control)

Use this if you're already running a VPS (kamiti/plotsandflats server at 103.191.209.90).

```bash
# On your VPS:
sudo apt install nginx certbot python3-certbot-nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/jpcareers.in
```

Nginx config:
```nginx
server {
    listen 80;
    server_name jpcareers.in www.jpcareers.in;
    root /var/www/jpcareers;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Gzip compression
    gzip on;
    gzip_types text/html text/css application/javascript application/json;

    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/jpcareers.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Upload files
rsync -avz /Users/jana/aiwebsite/jpcareers/ user@your-vps:/var/www/jpcareers/

# Get SSL certificate
sudo certbot --nginx -d jpcareers.in -d www.jpcareers.in
```

---

## Web3Forms Setup

The contact and consultation forms use Web3Forms for serverless form submission.

### Get Your Key
1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email (info@jpcareers.in) → Get Access Key
3. Copy the access key

### Replace Placeholder
Find and replace `YOUR_WEB3FORMS_KEY` in these files:
- `js/forms.js` — line 1: `const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY';`
- `index.html` — in the popup form
- `contact.html` — in the consultation form
- `career-counselling.html` — in the booking form

```bash
# Quick replace using sed:
find /Users/jana/aiwebsite/jpcareers -name "*.html" -o -name "*.js" | \
  xargs sed -i '' 's/YOUR_WEB3FORMS_KEY/your-actual-key-here/g'
```

### Test Forms
After deploying, test each form:
- Submit test enquiry from contact.html
- Check your email (info@jpcareers.in) for the notification
- Web3Forms also has a dashboard at web3forms.com to see all submissions

---

## WhatsApp Number Setup

Replace `+91-XXXXXXXXXX` and `91XXXXXXXXXX` (for WA links) with your actual number.

```bash
# Replace all instances:
find /Users/jana/aiwebsite/jpcareers -name "*.html" | \
  xargs sed -i '' 's/\+91-XXXXXXXXXX/+91-9XXXXXXXXX/g'

find /Users/jana/aiwebsite/jpcareers -name "*.html" | \
  xargs sed -i '' 's/91XXXXXXXXXX/919XXXXXXXXX/g'
```

WhatsApp Business setup (recommended):
1. Download WhatsApp Business app
2. Register your business number
3. Set up auto-reply, business hours, and catalogue
4. The wa.me links in the site will open a chat directly

---

## Domain DNS Checklist

After purchasing `jpcareers.in`, configure DNS based on your hosting choice:

| Record | Type | Name | Value |
|--------|------|------|-------|
| Root domain | A | @ | (hosting IP) |
| WWW | CNAME | www | @ or hosting URL |
| Email (optional) | MX | @ | mail server |
| Google Search Console | TXT | @ | google-site-verification=... |

### Verify DNS propagation:
```bash
dig jpcareers.in
nslookup jpcareers.in
# Or use: whatsmydns.net
```

---

## Google Search Console Setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → Domain: `jpcareers.in`
3. Verify ownership via DNS TXT record
4. Submit sitemap: `https://jpcareers.in/sitemap.xml`
5. Request indexing for key pages manually in URL Inspection tool

---

## Google Analytics Setup (Optional)

1. Create property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to all HTML files before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Performance Checklist Before Launch

- [ ] Replace `YOUR_WEB3FORMS_KEY` with real key
- [ ] Replace `+91-XXXXXXXXXX` with real WhatsApp number
- [ ] Add real contact email (info@jpcareers.in) throughout
- [ ] Generate all images using image-prompts.md and replace gradient placeholders
- [ ] Compress images with TinyPNG / Squoosh (target < 150KB each)
- [ ] Convert images to WebP format
- [ ] Test all forms (contact, newsletter, popup)
- [ ] Test mobile navigation on actual phone
- [ ] Test dark/light mode toggle
- [ ] Verify all internal links work
- [ ] Submit sitemap to Google Search Console
- [ ] Check Core Web Vitals: pagespeed.web.dev
- [ ] Test on iOS Safari and Chrome Android (most common for Indian users)

---

## File Structure Reference

```
jpcareers/
├── index.html                    # Landing page
├── about.html
├── services.html
├── study-abroad.html
├── jobs-abroad.html
├── career-counselling.html
├── countries.html
├── testimonials.html
├── contact.html
├── privacy-policy.html
├── terms.html
├── sitemap.xml
├── robots.txt
├── .nojekyll                     # Required for GitHub Pages
├── css/
│   └── custom.css                # All custom styles
├── js/
│   ├── main.js                   # Core functionality
│   ├── animations.js             # Scroll animations, counters
│   └── forms.js                  # Form validation & submission
├── blog/
│   ├── index.html                # Blog listing
│   ├── jobs-in-japan.html
│   ├── study-in-germany.html
│   ├── nursing-jobs-abroad.html
│   ├── caregiver-jobs-abroad.html
│   └── work-visa-guide.html
├── images/                       # Add your images here
│   ├── favicon.ico
│   └── ...
├── image-prompts.md              # AI image generation prompts
└── DEPLOY.md                     # This file
```

---

## Support

For deployment questions, contact the development team or refer to the hosting platform's documentation:
- GitHub Pages: docs.github.com/en/pages
- Cloudflare Pages: developers.cloudflare.com/pages
- Netlify: docs.netlify.com
