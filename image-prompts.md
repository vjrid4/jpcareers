# JP Careers — AI Image Generation Prompts

Use these prompts with Midjourney, DALL·E 3, Adobe Firefly, or Stable Diffusion to generate all website images. Specify **1200×630px** for OG images, **1920×1080px** for hero backgrounds, and **800×450px** for blog thumbnails.

---

## 1. Hero Background — Main Landing Page
**Prompt:** Futuristic dark cityscape at night, deep navy and violet sky, neon lights reflecting in glass buildings, floating holographic career path icons (graduation cap, briefcase, passport, globe), bokeh light particles, cinematic wide shot, 8K, ultra-realistic, no people

**Usage:** `index.html` hero background  
**Size:** 1920×1080px

---

## 2. Hero Image — Animated Globe with Connections
**Prompt:** Glowing wireframe globe on dark background, purple and cyan connection lines between India and Japan, Germany, UK, Canada, Australia, neon node dots at each country, floating data particles, dark futuristic aesthetic, no text, 8K render

**Usage:** `index.html` hero section floating graphic  
**Size:** 800×800px (square)

---

## 3. About Page — Team Hero
**Prompt:** Modern co-working space with floor-to-ceiling windows, Indian professionals working on laptops and whiteboards, diverse team of young adults, warm studio lighting, shallow depth of field, professional corporate photography style, no faces visible

**Usage:** `about.html` hero section  
**Size:** 1200×600px

---

## 4. Services Page — Career Counselling
**Prompt:** Two people in a professional consultation setting, one gesturing at a career roadmap on a tablet, modern office background with glass walls, natural light, Indian faces, professional attire, warm tones, stock photography style

**Usage:** `services.html` career counselling section  
**Size:** 600×400px

---

## 5. Study Abroad Hero
**Prompt:** Young Indian student with a backpack standing at a European university entrance (gothic architecture, cobblestone), sunrise lighting, a hint of the Indian flag and European flags in the bokeh background, hopeful expression, cinematic shot

**Usage:** `study-abroad.html` hero  
**Size:** 1200×600px

---

## 6. Germany Study — University Campus
**Prompt:** Technical University Munich or Berlin campus exterior in autumn, red and orange foliage, modern glass buildings adjacent to historic architecture, students walking on paths, golden hour lighting, travel photography style

**Usage:** `blog/study-in-germany.html` article hero  
**Size:** 1200×600px

---

## 7. Japan Jobs — Tokyo Cityscape
**Prompt:** Tokyo skyline at dusk, Mount Fuji in background, Shinjuku skyscrapers with neon signs, bullet train in foreground, vibrant colors, cinematic Japanese city photography, no text visible

**Usage:** `blog/jobs-in-japan.html` article hero  
**Size:** 1200×600px

---

## 8. Nursing Jobs — Healthcare Hero
**Prompt:** Indian nurse in scrubs at a modern hospital, NHS-style bright corridor, professional hospital environment, confident pose, natural lighting, photorealistic, diverse healthcare team in background, UK hospital setting

**Usage:** `blog/nursing-jobs-abroad.html` article hero  
**Size:** 1200×600px

---

## 9. Caregiver Jobs — Elder Care
**Prompt:** Compassionate caregiver (young South Asian woman) assisting elderly person in a bright, clean European care home, warm natural light through window, sunflowers on windowsill, genuine smile, documentary photography style

**Usage:** `blog/caregiver-jobs-abroad.html` article hero  
**Size:** 1200×600px

---

## 10. Work Visa Guide — Passport and Documents
**Prompt:** Indian passport open on a modern desk alongside visa approval stamps, European currency coins, globe, and a laptop showing an online application form, flat lay product photography, dark wood background, dramatic side lighting, no identifiable personal data visible

**Usage:** `blog/work-visa-guide.html` article hero  
**Size:** 1200×600px

---

## 11. Testimonials Page Hero
**Prompt:** Collage of Indian young adults in different international locations — cherry blossom Japan, Brandenburg Gate Berlin, Big Ben London, Niagara Falls Canada — each looking happy and successful, grid layout, vibrant colors, social media travel photography aesthetic

**Usage:** `testimonials.html` hero  
**Size:** 1200×600px

---

## 12. Contact Page — Office
**Prompt:** Modern minimalist office space in Hyderabad, hot desks with MacBooks, plants, exposed brick wall with a motivational typography poster, large windows, Indian city view, professional startup aesthetic, interior design photography

**Usage:** `contact.html` map/location section  
**Size:** 800×500px

---

## 13. OG Image — Default Fallback
**Prompt:** JP Careers logo (JP in a purple-to-cyan gradient pill badge) on a dark navy background, tagline "Your Global Career Starts Here" in white Space Grotesk font, subtle neon grid lines, professional social media card design

**Usage:** Default OG image for all pages  
**Size:** 1200×630px  
**Note:** Create in Canva or Figma with brand colors — #050816 background, #6C63FF primary, #00D4FF accent

---

## 14. Favicon / App Icon
**Prompt:** Minimalist "JP" lettermark inside a rounded rectangle, gradient from #6C63FF (purple) to #00D4FF (cyan), clean sans-serif font, works at 16×16px and 512×512px, suitable for favicon and PWA icon

**Usage:** favicon.ico, apple-touch-icon.png  
**Sizes:** 16×16, 32×32, 180×180, 512×512px  
**Note:** Create in Figma or use a logo generator tool

---

## 15. Country Cards — Flag Gradient Backgrounds
Generate one background per country for the country cards section:

- **Japan:** Sunrise gradient — white center fading to soft red, minimal, flags-inspired
- **Germany:** Black, red, gold horizontal gradient — subtle, not literal flag
- **Canada:** Deep red and maple leaf silhouette on frosted glass
- **Australia:** Deep blue starfield (Southern Cross) with golden tones
- **UK:** Deep navy with subtle Union Jack geometry, not literal
- **USA:** Deep navy-to-red gradient with liberty torch silhouette

**Usage:** Country cards in `index.html` and `countries.html`  
**Size:** 400×240px each

---

## Tips for Best Results

1. **Midjourney:** Add `--ar 16:9 --style raw --v 6` for photorealistic images
2. **DALL·E 3:** Start with "Professional photograph of..." for best realism
3. **Adobe Firefly:** Use the "Photo" content type for real-looking images
4. **Compress all images:** Use TinyPNG or Squoosh before adding to site — aim for under 150KB per image
5. **Use WebP format:** Convert all JPEGs/PNGs to WebP for better Core Web Vitals scores
