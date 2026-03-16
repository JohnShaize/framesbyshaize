# Frames by Shaize

A modern photography portfolio website built with **React, Vite, and Tailwind CSS**, designed to showcase portrait and cinematic photography with a refined gallery experience.

The project serves both as a **personal brand website** and a **frontend portfolio project**, demonstrating responsive UI design, modern image handling techniques, and production-ready deployment.

---

# Live Website

https://framesbyshaize.com

---

# Preview

![Portfolio Preview](./preview.png)


---

# Features

### Portfolio Experience
• Curated **masonry-style portfolio gallery** with responsive columns  
• **Thumbnail + full image architecture** for optimized loading  
• Smooth **lightbox viewer with cinematic transitions**  
• **Next / Previous navigation** for browsing images  
• **Keyboard navigation** (arrow keys + escape) on desktop  
• **Swipe gestures** for navigation on mobile  
• First-load **image preloading** for smoother viewing  

### Highlight Gallery
• Featured photography section with curated frames  
• Same **lightbox system and navigation controls** as the portfolio  
• Mobile swipe + desktop keyboard navigation  

### UI / Design
• Fully responsive layout optimized for desktop, tablet, and mobile  
• Dark / Light theme toggle with persistent preference  
• Glass-style navigation UI with backdrop blur  
• Cinematic typography and visual hierarchy  
• Smooth UI animations and transitions  

### Performance & Image Optimization
• WebP image formats for reduced file size  
• Thumbnail / full image separation for faster page load  
• Lazy loading for gallery images  
• Image optimization scripts included in the repository  

### Contact
• Contact form integration using **Web3Forms**  
• Secure environment variable configuration for production deployments  

---

# Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Lucide React Icons

### Deployment
- Vercel

### Integrations
- Web3Forms (contact form email service)

---

# Project Structure

```text
src
├─ components
│  └─ Button.jsx
│
├─ layout
│  └─ Navbar.jsx
│
├─ sections
│  ├─ Hero.jsx
│  ├─ About.jsx
│  ├─ Highlight.jsx
│  ├─ Portfolio.jsx
│  └─ Contact.jsx
│
├─ data
│  ├─ highlightImages.js
│  └─ portfolioImages.js
│
├─ App.jsx
├─ main.jsx
└─ index.css
```

Additional directories used in the project:

```text
public/
  Optimized images used by the site

image-src/
  Original high-resolution image sources

scripts/
  Image optimization scripts used to generate WebP and AVIF assets
```

The project uses a **component-based architecture**, separating layout sections, reusable UI components, and image data.

---

# Local Development

Clone the repository

```bash
git clone https://github.com/JohnShaize/framesbyshaize.git
```

Navigate into the project

```bash
cd framesbyshaize
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Open in browser

```
http://localhost:5173
```

---

# Production Build

Create a production build

```bash
npm run build
```

Preview the production build locally

```bash
npm run preview
```

---

# Environment Variables

The contact form requires a **Web3Forms API key**.

Create a `.env` file in the project root:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_api_key_here
```

For production deployment, add the same variable inside **Vercel Environment Variables**.

---

# Deployment

This project is deployed using **Vercel**.

Deployment workflow:

1. Push project to GitHub
2. Import repository into Vercel
3. Configure environment variables
4. Connect custom domain
5. Deploy

Custom domain used:

```
framesbyshaize.com
```

---

# Purpose of the Project

This project was created to:

• showcase photography work professionally  
• demonstrate modern frontend development practices  
• serve as a portfolio project for React / Frontend developer roles  

The focus is on **clean UI design, optimized media handling, and smooth interactive user experiences.**

---

# Author

**John Shaize**

Toronto, Canada

Instagram  
https://instagram.com/framesbyshaize

Portfolio  
https://framesbyshaize.com

GitHub  
https://github.com/JohnShaize

---

# License

This project is for portfolio and educational purposes.