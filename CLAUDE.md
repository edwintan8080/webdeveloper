# Project: Tour & Travel Website — AI SEO Optimized

## Overview
Build a complete, production-ready tour and travel website optimized for:
- **AI Search Engines**: Google SGE/Gemini, ChatGPT Search, Claude, Perplexity AI
- **Traditional SEO**: Google, Bing, Yahoo
- **Mobile-first**: Responsive, fast, accessible
- **Hostinger deployment**: Static HTML (no build tools needed)

## Tech Stack
- **HTML5** — semantic markup
- **CSS3** — custom properties, grid, flexbox, container queries
- **Vanilla JavaScript** — no frameworks, minimal dependencies
- **JSON-LD Schema** — TravelAgency, TouristTrip, FAQPage, Review, LocalBusiness
- **No build tools** — deploy directly to Hostinger File Manager

## Architecture
```
/
├── index.html              # Main landing page
├── tours.html              # Tour packages listing
├── tour-detail.html        # Individual tour template
├── about.html              # About the company
├── contact.html            # Contact page with form
├── blog.html               # Blog listing
├── faq.html                # FAQ page
├── css/
│   ├── style.css           # Main styles
│   ├── components.css      # Reusable components
│   └── responsive.css      # Mobile breakpoints
├── js/
│   ├── main.js             # Core functionality
│   ├── schema.js           # Dynamic schema injection
│   └── analytics.js        # GA4 + event tracking
├── images/                 # Optimized images
├── llms.txt                # AI crawler instructions
├── llms-full.txt           # Full site content for AI
├── robots.txt              # Traditional + AI bot rules
├── sitemap.xml             # XML sitemap
└── .htaccess               # Hostinger Apache config
```

## Design Direction
- **Style**: Warm, inviting, premium travel aesthetic (inspired by Airbnb + Booking.com)
- **Colors**: 
  - Primary: `#0066FF` (trust blue)
  - Accent: `#FF6B35` (warm orange)
  - Success: `#10B981` (green)
  - Dark: `#1A1A2E`
  - Light: `#F8FAFC`
- **Typography**: 
  - Headings: Plus Jakarta Sans (Google Fonts)
  - Body: Inter (Google Fonts)
- **Layout**: Clean sections, whitespace-heavy, card-based tours

## AI SEO Requirements (CRITICAL)

### 1. Schema Markup (JSON-LD on every page)
```json
// TravelAgency — homepage
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "[COMPANY_NAME]",
  "description": "[DESCRIPTION]",
  "url": "https://[DOMAIN]",
  "logo": "https://[DOMAIN]/images/logo.png",
  "image": "https://[DOMAIN]/images/hero.jpg",
  "telephone": "[PHONE]",
  "email": "[EMAIL]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ADDRESS]",
    "addressLocality": "[CITY]",
    "addressRegion": "[PROVINCE]",
    "postalCode": "[POSTAL]",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LONG]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  },
  "sameAs": [
    "https://instagram.com/[HANDLE]",
    "https://facebook.com/[HANDLE]",
    "https://tiktok.com/@[HANDLE]"
  ]
}

// TouristTrip — each tour package
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Bali Adventure Tour 3D2N",
  "description": "Explore Bali's hidden gems...",
  "touristType": ["Adventure", "Cultural"],
  "provider": {
    "@type": "TravelAgency",
    "name": "[COMPANY_NAME]"
  },
  "offers": {
    "@type": "Offer",
    "price": "1500000",
    "priceCurrency": "IDR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "validThrough": "2025-12-31"
  },
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Day 1: Arrival & Ubud Tour"},
      {"@type": "ListItem", "position": 2, "name": "Day 2: Beach & Waterfall"},
      {"@type": "ListItem", "position": 3, "name": "Day 3: Departure"}
    ]
  },
  "image": "https://[DOMAIN]/images/bali-tour.jpg",
  "url": "https://[DOMAIN]/tours/bali-adventure.html"
}

// FAQPage — FAQ section
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is included in the tour package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our tour packages include..."
      }
    }
  ]
}
```

### 2. LLMs.txt (root directory)
```
# llms.txt — AI Crawler Instructions
# [COMPANY_NAME] Travel Agency

> [COMPANY_NAME] is a licensed travel agency based in [CITY], Indonesia specializing in [SPECIALIZATION]. We offer curated tour packages to [DESTINATIONS] with local guides, private transport, and authentic cultural experiences.

## Services
- Custom tour packages (2-14 days)
- Private guided tours
- Airport transfers & transportation
- Hotel bookings
- Event & corporate travel

## Popular Tours
- [Tour 1 Name]: [Brief description] — from IDR [PRICE]
- [Tour 2 Name]: [Brief description] — from IDR [PRICE]
- [Tour 3 Name]: [Brief description] — from IDR [PRICE]

## Contact
- WhatsApp: [NUMBER]
- Email: [EMAIL]
- Website: [URL]

## Key Facts
- Licensed by Indonesian Ministry of Tourism
- 500+ happy customers since [YEAR]
- Local guides fluent in English & Indonesian
- 24/7 customer support

## Links
- [Tours](/tours.html)
- [About Us](/about.html)
- [FAQ](/faq.html)
- [Contact](/contact.html)
```

### 3. Content Structure for AI Citation
Every page must have:
- **First paragraph**: Direct, factual answer (AI loves to cite this)
- **H1**: Clear, keyword-rich heading
- **H2-H3**: Question-based subheadings (matches user queries)
- **Lists**: Steps, features, inclusions (structured data)
- **FAQ section**: On every page, with schema markup

### 4. E-E-A-T Signals
- Author bios on blog posts
- Company registration/license number visible
- Real customer testimonials with names
- Physical address + Google Maps embed
- WhatsApp button (instant contact)
- Social proof: customer count, years in business
- Blog with genuine travel experiences (first-person)

### 5. Voice Search Optimization
- Natural language headings (questions people actually ask)
- Conversational tone in content
- Long-tail keywords in FAQ
- Local language variations (Bahasa + English)

### 6. Zero-Click Optimization
- Rich snippets targeting (price, rating, availability)
- Featured snippet format (paragraph + list + table)
- Knowledge panel signals (consistent NAP everywhere)

## Performance Requirements
- **LCP** < 2.5 seconds
- **INP** < 200ms
- **CLS** < 0.1
- **Lighthouse** > 90 (all categories)
- Image lazy loading with width/height attributes
- Critical CSS inlined
- Font display: swap
- Preload key resources

## Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML throughout
- Alt text on all images
- Keyboard navigation
- Focus visible states
- Color contrast ratio > 4.5:1
- Skip to content link

## Hostinger Deployment
- All paths relative (no hardcoded domains)
- .htaccess for caching, compression, security headers
- 404.html error page
- robots.txt allowing all major AI crawlers
- sitemap.xml with all pages

## Code Standards
- 4-space indentation
- BEM-style CSS naming
- Comments on complex sections
- No inline styles (except critical CSS)
- No external JS dependencies (except Google Fonts)
- Semantic HTML5 elements

## Content Language
- Primary: Bahasa Indonesia
- Secondary: English (for international tourists)
- Use `lang="id"` on HTML element
