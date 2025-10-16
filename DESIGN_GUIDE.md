# Nothing But The Fruit - Design Guide

## Project Overview

**Nothing But The Fruit** is a professional gospel podcast website for Pastor Demetria Bass, built with Next.js 15, TypeScript, and Tailwind CSS v4. The platform showcases biblical teaching, spiritual growth content, and provides seamless YouTube integration for episode management.

## Table of Contents

1. [Architecture & Structure](#architecture--structure)
2. [Design System](#design-system)
3. [Component Patterns](#component-patterns)
4. [Code Standards](#code-standards)
5. [File Organization](#file-organization)
6. [Integration Patterns](#integration-patterns)
7. [SEO & Performance](#seo--performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Development Workflow](#development-workflow)
10. [Best Practices](#best-practices)

---

## Architecture & Structure

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans, Geist Mono, Playfair Display
- **Icons**: Heroicons, Custom SVGs
- **Email Service**: Resend
- **YouTube Integration**: RSS Feed + Manual Channel ID

### Project Structure

```
app/
├── components/          # Reusable UI components
├── lib/                # Service layers & utilities
├── api/                 # API routes
├── [pages]/            # Page components
├── globals.css         # Global styles & CSS variables
├── layout.tsx          # Root layout with metadata
├── sitemap.ts          # Dynamic sitemap generation
└── robots.ts           # SEO robots.txt

public/
├── [logos]/            # Brand assets
├── [images]/           # Content images
└── [icons]/            # UI icons
```

---

## Design System

### Color Palette

#### Primary Brand Colors

```css
--brand-gold: #F59E0B      /* Primary CTA, highlights */
--brand-black: #000000      /* Text, contrast */
--brand-gray: #666666       /* Secondary text */
```

#### Purple Palette (Royalty & Spirit)

```css
--royal-purple: #6B46C1    /* Active states, accents */
--deep-purple: #5B21B6      /* Hover states */
--soft-purple: #8B5CF6      /* Light accents */
```

#### Neutral Colors

```css
--warm-white: #FAFAF9       /* Backgrounds */
--rich-black: #1C1917      /* Dark text */
--background: #ffffff       /* Main background */
--foreground: #171717       /* Main text */
```

### Typography

#### Font Families

- **Primary**: Geist Sans (clean, modern)
- **Display**: Playfair Display (elegant, serif)
- **Monospace**: Geist Mono (code, technical)

#### Font Usage

- **Headings**: Playfair Display for elegance
- **Body Text**: Geist Sans for readability
- **Brand Text**: Playfair Display for "Nothing But The Fruit"

### Spacing & Layout

#### Container System

- **Max Width**: `max-w-7xl` (1280px)
- **Padding**: `px-6 lg:px-8` (responsive)
- **Grid**: CSS Grid for complex layouts
- **Flexbox**: For component alignment

#### Spacing Scale

- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)
- **2xl**: 4rem (64px)

---

## Component Patterns

### 1. Header Component

**File**: `app/components/Header.tsx`

#### Structure

- Fixed positioning with backdrop blur
- Responsive navigation (desktop/mobile)
- Active state management
- YouTube CTA integration

#### Key Features

- **Desktop**: Horizontal navigation with Subscribe CTA
- **Mobile**: Slide-out drawer with backdrop
- **Logo**: Responsive sizing (`NBTF44.png` for main, `NothingButTheFruitUpgrade.png` for mobile)
- **Accessibility**: ARIA labels, keyboard navigation

#### Usage Pattern

```tsx
// Always use with proper state management
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const pathname = usePathname(); // For active states
```

### 2. Footer Component

**File**: `app/components/Footer.tsx`

#### Structure

- Dark theme (`bg-gray-900`)
- Grid layout for content organization
- Social media integration (YouTube, Facebook only)
- Contact information with clickable email

#### Key Features

- **Branding**: Logo with tagline
- **Navigation**: Quick links to all pages
- **Contact**: Email (`nbtfruit@gmail.com`) and social links
- **Copyright**: Dynamic year with ministry attribution

### 3. Reusable Components

#### StayConnected Component

**File**: `app/components/StayConnected.tsx`

- **Purpose**: DRY implementation of subscription CTAs
- **Usage**: Home page, About page
- **Features**: YouTube icon integration, consistent styling

#### EpisodeCard Component

**File**: `app/components/EpisodeCard.tsx`

- **Purpose**: Display YouTube video information
- **Props**: `YouTubeVideo` interface
- **Features**: Thumbnail, title, description, date, YouTube link

#### Toast Component

**File**: `app/components/Toast.tsx`

- **Purpose**: User feedback notifications
- **Features**: Auto-dismiss, success/error states, close button
- **Usage**: Contact form submissions

---

## Code Standards

### TypeScript Standards

#### Interface Definitions

```typescript
// Always define interfaces for data structures
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  videoId: string;
}
```

#### Service Layer Pattern

```typescript
// Separate business logic into service files
export async function fetchChannelVideos(
  channelId?: string
): Promise<YouTubeVideo[]> {
  // Implementation with error handling
  // Caching with next: { revalidate: 3600 }
  // Graceful degradation
}
```

### React Patterns

#### Server Components (Default)

```tsx
// Use server components for data fetching
export default async function EpisodesPage() {
  const videos = await fetchChannelVideos();
  return <EpisodeList videos={videos} />;
}
```

#### Client Components (When Needed)

```tsx
"use client";
// Only use for interactivity
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State management and event handlers
}
```

### CSS Standards

#### Tailwind Classes

- **Responsive**: Always include mobile-first responsive classes
- **States**: Include hover, focus, active states
- **Transitions**: Use `transition-all duration-300` for smooth interactions
- **Accessibility**: Include focus-visible states

#### Custom CSS

```css
/* Use CSS variables for consistency */
:root {
  --brand-gold: #f59e0b;
  --brand-black: #000000;
}

/* Include vendor prefixes for browser compatibility */
@keyframes float {
  0%,
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}
```

---

## File Organization

### Component Structure

```
app/components/
├── Header.tsx           # Main navigation
├── Footer.tsx           # Site footer
├── EpisodeCard.tsx      # Video display
├── StayConnected.tsx    # Subscription CTAs
├── Toast.tsx            # Notifications
├── YouTubeEmbed.tsx     # Video player
└── ScrollAnimations.tsx # Animation utilities
```

### Service Layer

```
app/lib/
├── youtubeService.ts    # YouTube API integration
└── emailService.ts      # Email functionality
```

### API Routes

```
app/api/
└── contact/
    └── route.ts         # Contact form handler
```

### Page Structure

```
app/
├── page.tsx             # Homepage
├── about/page.tsx       # About page
├── episodes/page.tsx    # Episodes listing
└── contact/page.tsx     # Contact form
```

---

## Integration Patterns

### YouTube Integration

#### Channel ID Resolution

```typescript
// Multi-approach channel ID resolution
const urlsToTry = [
  `https://www.youtube.com/@${cleanHandle}`,
  `https://www.youtube.com/c/${cleanHandle}`,
  `https://www.youtube.com/user/${cleanHandle}`,
  `https://www.youtube.com/channel/${cleanHandle}`,
];
```

#### RSS Feed Parsing

```typescript
// Robust XML parsing with error handling
const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
// Extract video data with fallbacks
```

#### Manual Override System

```typescript
// Fallback to manual channel ID
const MANUAL_CHANNEL_ID = "UCLWe0BfP-ZPGW-TJseapbjA";
```

### Email Integration

#### Resend Service

```typescript
// Professional email templates
const { data: emailData, error } = await resend.emails.send({
  from: "Nothing But The Fruit <noreply@resend.dev>",
  to: [process.env.CONTACT_EMAIL],
  replyTo: data.email, // Direct reply capability
  subject: `New ${data.messageType} from ${data.fullName}`,
  // HTML + text versions for deliverability
});
```

#### Email Template Standards

- **Branding**: Consistent with website design
- **Responsive**: Mobile-friendly layout
- **Accessibility**: High contrast, readable fonts
- **Deliverability**: Plain text fallback, proper headers

---

## SEO & Performance

### Metadata Structure

```typescript
export const metadata: Metadata = {
  title: {
    default: "Nothing But The Fruit | Gospel Podcast with Pastor Demetria Bass",
    template: "%s | Nothing But The Fruit",
  },
  description: "Join Pastor Demetria Bass for powerful biblical teaching...",
  keywords: ["gospel podcast", "christian podcast", "Pastor Demetria Bass"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nothingbutthefruit.com",
    // Complete Open Graph implementation
  },
  twitter: {
    card: "summary_large_image",
    // Twitter Card implementation
  },
};
```

### Structured Data

```typescript
// JSON-LD schema for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nothing But The Fruit",
  alternateName: "Bass Global Ministries",
  url: "https://nothingbutthefruit.com",
  logo: "https://nothingbutthefruit.com/icon.png",
  founder: {
    "@type": "Person",
    name: "Pastor Demetria Bass",
  },
};
```

### Performance Optimizations

- **Image Optimization**: Next.js Image component with priority loading
- **Caching**: `next: { revalidate: 3600 }` for YouTube data
- **Code Splitting**: Automatic with Next.js App Router
- **Font Optimization**: Google Fonts with variable fonts

---

## Browser Compatibility

### CSS Vendor Prefixes

```css
/* Always include vendor prefixes for animations */
@keyframes float {
  0%,
  100% {
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    transform: translateY(0px);
  }
}

/* Backdrop filter fallbacks */
@supports not (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    background-color: rgba(255, 255, 255, 0.8);
  }
}
```

### Safari-Specific Fixes

```tsx
// Inline styles for Safari gradient support
<div
  style={{
    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
    backgroundImage: 'linear-gradient(135deg, #F59E0B, #D97706)'
  }}
>
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-slide-in-right,
  .animate-fade-in {
    animation: none;
  }
}
```

---

## Development Workflow

### Environment Setup

```bash
# Node.js version
nvm use 21.5.0

# Dependencies
npm install

# Development server
npm run dev
```

### Environment Variables

```env
# .env.local
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=nbtfruit@gmail.com
```

### Git Workflow

1. **Feature Branches**: Create feature branches for new functionality
2. **Commit Messages**: Use conventional commit format
3. **Testing**: Test on multiple browsers before merging
4. **Documentation**: Update this guide for new patterns

---

## Best Practices

### 1. DRY Principle

- **Components**: Extract reusable components (`StayConnected`, `EpisodeCard`)
- **Services**: Centralize business logic in service files
- **Styles**: Use CSS variables and Tailwind utilities

### 2. Error Handling

```typescript
// Always include try-catch blocks
try {
  const result = await fetchData();
  return result;
} catch (error) {
  console.error("Error:", error);
  return []; // Graceful degradation
}
```

### 3. Accessibility

- **ARIA Labels**: Include proper ARIA attributes
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Readers**: Use semantic HTML and proper heading hierarchy
- **Color Contrast**: Maintain WCAG AA compliance

### 4. Performance

- **Image Optimization**: Use Next.js Image component
- **Lazy Loading**: Implement for below-the-fold content
- **Caching**: Use appropriate cache strategies
- **Bundle Size**: Monitor and optimize bundle size

### 5. Security

- **Input Validation**: Sanitize all user inputs
- **Environment Variables**: Never commit sensitive data
- **HTTPS**: Ensure all external links use HTTPS
- **CSP**: Implement Content Security Policy headers

### 6. Code Quality

- **TypeScript**: Use strict type checking
- **ESLint**: Follow configured linting rules
- **Comments**: Document complex business logic
- **Testing**: Write tests for critical functionality

---

## Logo Usage Guidelines

### Logo Variations

- **NBTF44.png**: Main navbar logo (90x28px)
- **NothingButTheFruitUpgrade.png**: Mobile menu logo (160x40px)
- **NothingButTheFruitUpgrade2.png**: Footer logo (better contrast)

### Usage Rules

- **Consistency**: Use same logo variation in same context
- **Sizing**: Maintain aspect ratio, use `object-contain`
- **Accessibility**: Always include alt text
- **Priority**: Use `priority` prop for above-the-fold logos

---

## Future Development Guidelines

### Adding New Features

1. **Follow Existing Patterns**: Use established component and service patterns
2. **Maintain Consistency**: Follow design system and color palette
3. **Test Thoroughly**: Test on multiple browsers and devices
4. **Update Documentation**: Keep this guide current with changes

### Component Creation Checklist

- [ ] TypeScript interfaces defined
- [ ] Responsive design implemented
- [ ] Accessibility features included
- [ ] Error handling implemented
- [ ] Consistent styling with design system
- [ ] Proper prop validation
- [ ] Documentation added

### Service Layer Checklist

- [ ] Error handling with try-catch
- [ ] Graceful degradation
- [ ] Proper TypeScript types
- [ ] Caching strategy implemented
- [ ] Logging for debugging
- [ ] Environment variable usage

---

## Contact & Support

**Project**: Nothing But The Fruit  
**Developer**: [Your Name]  
**Email**: nbtfruit@gmail.com  
**Website**: https://nothingbutthefruit.com  
**YouTube**: https://youtube.com/@nothingbutthefruit

---

_This design guide is a living document. Update it whenever new patterns, components, or standards are established._
