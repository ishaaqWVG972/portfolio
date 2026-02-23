# Xbox 360 Dashboard Portfolio Website

Create a portfolio website inspired by the Xbox 360 dashboard interface. This should be a distinctive, nostalgic interface with smooth animations and the iconic Xbox aesthetic.

## Design Direction

**Aesthetic**: Early-2010s gaming console UI meets modern web design. Think blade-style navigation, glossy tiles, and that distinctive Xbox green glow. The design should feel tactile and responsive, with every interaction giving satisfying visual feedback.

**Tone**: Playful yet professional, nostalgic but contemporary. The Xbox 360 dashboard was known for its clean, geometric organization and smooth transitions - capture that same energy.

## Typography

- **Primary Font**: Segoe UI (the actual Xbox 360 system font)
- **Font Weights**: Use 300 (light), 400 (regular), 600 (semibold), and 700 (bold)
- **Hierarchy**: 
  - Page titles: 48px, weight 700
  - Tile titles: 26-32px, weight 700
  - Navigation: 18px, weight 600
  - Body text: 14-15px, weight 300-400

## Color Palette

```css
--xbox-green: rgb(119, 187, 68);        /* Primary brand color */
--xbox-dark-green: rgb(44, 162, 67);    /* Accents */
--xbox-darker-green: rgb(16, 124, 16);  /* Borders, shadows */
--xbox-black: #0a0a0a;                  /* Background base */
--xbox-white: #ffffff;                  /* Text, highlights */
```

**Color Usage**:
- Background: Dark gradient from `#0a0a0a` to `#1a1a1a`
- Tiles: `rgba(20, 20, 20, 0.8)` with green borders
- Accents and highlights: Xbox green spectrum
- Text: White with subtle opacity variations (0.85-1.0)
- Glows: Use box-shadow with green colors for depth

## Layout Structure

### Navigation Bar
- **Position**: Fixed top, full width
- **Height**: 70px
- **Background**: `rgba(10, 10, 10, 0.95)` with backdrop-filter blur
- **Border**: 2px solid bottom border in darker green
- **Elements**:
  - Top-left: Green beacon indicator (16px circle with pulsing glow animation)
  - Navigation links: "Home" and "Projects" only
  - Link style: Clean, with bottom border animation on hover
  - Active state: Green underline

### Online Beacon (Top Left of Nav)
- 16px circular indicator
- Background: Xbox green
- Box-shadow: Multi-layer glow effect (`0 0 20px` and `0 0 40px` in green)
- Animation: Continuous pulse (2s ease-in-out infinite)
- Inner detail: Small white dot (6px) in center

### Homepage Dashboard Grid

**Grid Layout**:
```
[ Contact ]  [              ]  [ About Me ]
             [     Blog      ]
[ Recent ]   [   (Large)     ]  [ Game ]
```

**CSS Grid Structure**:
```css
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 280px);
gap: 20px;
```

**Tile Positions**:
- **Contact**: Column 1, Row 1
- **Recent Project**: Column 1, Row 2
- **Blog**: Column 2, Row 1-2 (spans both rows)
- **About Me**: Column 3, Row 1
- **Game Placeholder**: Column 3, Row 2

## Tile Design Specifications

### Base Tile Styling
```css
background: rgba(20, 20, 20, 0.8);
border: 2px solid var(--xbox-darker-green);
border-radius: 8px;
padding: 30px;
transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Hover Effects
- **Transform**: `scale(1.05) translateY(-5px)`
- **Border**: Changes to bright Xbox green
- **Shadow**: Multi-layer glow - `0 10px 40px rgba(119, 187, 68, 0.3)`
- **Background overlay**: Gradient from transparent to `rgba(119, 187, 68, 0.1)`
- **Transition**: Smooth cubic-bezier for bouncy effect

### Active/Click State
- **Transform**: `scale(0.98)`
- Provides tactile feedback

### Tile Content Structure
Each tile contains:
- Icon/emoji (48px, top)
- Title (26px bold)
- Short description (14px light)

### Blog Tile (Center, Large)
- **Special styling**: Gradient background overlay
- **Larger text**: 32px title
- **More padding**: 40px
- **Click action**: Opens modal overlay

## Modal Design (Blog Posts)

### Modal Overlay
- **Background**: `rgba(0, 0, 0, 0.92)` with backdrop-filter blur
- **Position**: Fixed, full viewport
- **Z-index**: 2000
- **Animation**: Fade in (0.3s)

### Modal Content Box
- **Max-width**: 900px
- **Background**: Xbox black with 3px green border
- **Border-radius**: 12px
- **Padding**: 50px
- **Shadow**: Dramatic green glow
- **Animation**: Slide up with bounce (`cubic-bezier(0.34, 1.56, 0.64, 1)`)

### Close Button
- **Position**: Absolute top-right
- **Style**: Circular (40px), green border
- **Hover**: Fills green, rotates 90 degrees
- **Icon**: × symbol

### Blog Post List
- **Layout**: Vertical stack with 25px gaps
- **Each post**:
  - Background: `rgba(20, 20, 20, 0.6)`
  - Border: 2px darker green, changes to bright green on hover
  - Padding: 25px
  - Hover effect: Slide right 10px with left border accent
  - Cursor: pointer

### Placeholder Blog Content
Include 3-4 placeholder posts:
- Post title (22px, semibold, green)
- Date (13px, 60% opacity)
- Excerpt (15px, 85% opacity, 2-3 lines)

## Projects Page

### Layout
- **Grid**: `repeat(auto-fill, minmax(350px, 1fr))`
- **Gap**: 30px
- **Margin-top**: 40px

### Project Cards
- Similar base styling to tiles
- **Hover**: `translateY(-10px)` with green glow shadow
- **Content**:
  - Project title (24px bold, green)
  - Description (15px, multi-line)
  - Tags: Pills with green border and semi-transparent background

### Tag Pills
```css
background: rgba(119, 187, 68, 0.2);
border: 1px solid green;
padding: 5px 12px;
border-radius: 4px;
font-size: 12px;
```

## Animation Specifications

### Key Animations

**Pulse (Beacon)**:
```css
@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 0 20px green, 0 0 40px green;
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 25px green, 0 0 50px green;
    transform: scale(1.1);
  }
}
```

**Fade In (Page transitions)**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide Up (Modal)**:
```css
@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Micro-interactions
- All transitions: 0.3-0.4s duration
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy feel
- Hover states should feel immediate and responsive
- Click states should provide tactile feedback

## Background Details

### Subtle Grid Pattern
```css
body::before {
  background-image: 
    linear-gradient(rgba(119, 187, 68, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(119, 187, 68, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

### Main Background
- **Gradient**: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)`
- **Fixed position**: Creates depth
- **Grid overlay**: Adds texture without being distracting

## Technical Requirements

### HTML Structure
- Single-page application with page routing
- Semantic HTML5 elements
- Accessible navigation and interactive elements

### CSS Approach
- CSS custom properties for theming
- Modern flexbox and grid layouts
- Smooth transitions and transforms
- Backdrop-filter for glass effects
- No CSS frameworks - custom from scratch

### JavaScript Functionality
- Page navigation (show/hide content sections)
- Modal open/close for blog
- Active navigation state management
- Smooth scrolling
- No heavy frameworks needed - vanilla JS is perfect

### Responsive Design
- **Desktop**: Full 3-column grid
- **Tablet (< 1200px)**: 2-column grid, rearranged tiles
- **Mobile (< 768px)**: Single column stack
- Blog tile adjusts from spanning to single row
- Navigation remains fixed and usable
- Touch-friendly tap targets (min 44px)

## Content Placeholders

### Contact Tile
- Icon: 📧
- Title: "Get in Touch"
- Description: "Let's connect and build something amazing"

### Recent Project Tile
- Icon: 🚀
- Title: "Latest Work"
- Description: "Check out my most recent project"

### About Me Tile
- Icon: 👋
- Title: "About Me"
- Description: "UX designer passionate about human-centered design"

### Blog Tile
- Icon: ✍️
- Title: "Thoughts & Ideas"
- Description: "Insights on design, technology, and creativity"

### Game Placeholder Tile
- Icon: 🎮
- Title: "Mini Game"
- Description: "Coming soon - interactive experience"

### Blog Posts (3-4 placeholders)
1. **"The Art of Service Design"**
   - Date: "January 2026"
   - Excerpt: "Exploring how service design bridges digital and physical touchpoints to create seamless user experiences..."

2. **"Learning from Transport Systems"**
   - Date: "December 2025"
   - Excerpt: "What TfL's barrier lighting can teach us about intuitive design and immediate user feedback..."

3. **"From Cybersecurity to UX"**
   - Date: "November 2025"
   - Excerpt: "My journey transitioning from technical security work to human-centered design thinking..."

## Hosting & Blog CMS

### Hosting: Vercel
- Site is hosted on Vercel (vercel.com)
- Automatic deploys on push to main branch
- Serverless functions in `/api` folder

### Blog Management: Decap CMS
- Admin interface at `/admin`
- Uses GitHub OAuth for authentication (only repo owner can access)
- Blog posts stored as Markdown files in `content/blog/`
- Posts are fetched via `/api/posts` serverless function

### Adding a New Blog Post
1. Go to `your-site.vercel.app/admin`
2. Log in with GitHub
3. Click "New Blog Post"
4. Fill in title, date, excerpt, and body (Markdown)
5. Click "Publish" - this creates a commit to your repo
6. Vercel auto-deploys the changes

### Blog Post Format (Markdown with Frontmatter)
```yaml
---
title: "Post Title"
date: 2026-01-15
excerpt: "Short description for the blog list..."
---

Full post content in Markdown here...
```

### Environment Variables (Vercel Dashboard)
- `OAUTH_GITHUB_CLIENT_ID` - GitHub OAuth app client ID
- `OAUTH_GITHUB_CLIENT_SECRET` - GitHub OAuth app secret

### Known Issues & Solutions

**Problem: Vercel won't serve `.yml` files as static assets**
- Decap CMS tries to load `config.yml` but Vercel returns 404 for `.yml` files
- Solution: Do NOT rely on `config.yml` being served statically
- Instead, use `CMS_MANUAL_INIT` to inline the config directly in `admin/index.html`:
```html
<script>window.CMS_MANUAL_INIT = true;</script>
<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
<script>
  CMS.init({ config: { backend: { ... }, collections: [...] } });
</script>
```
- `window.CMS_MANUAL_INIT = true` MUST be set before the CMS script loads, otherwise the CMS auto-initialises from `config.yml` before the manual config runs

**Problem: "redirect URI is not associated with this application" on GitHub OAuth**
- The redirect URI sent to GitHub must exactly match what is registered in the GitHub OAuth App
- In `api/auth/index.js` the redirect URI is hardcoded to `https://ishaaq.vercel.app/api/auth/callback`
- The GitHub OAuth App (Settings → Developer settings → OAuth Apps) must have the same URL in "Authorization callback URL"
- If the site URL ever changes, update both the code and the GitHub OAuth App

**Problem: Decap CMS config error when using `git-gateway` backend on Netlify**
- `git-gateway` requires Netlify Identity and Git Gateway services to be enabled
- Error "TypeError: Undefined is not an object (evaluating 'e.message.includes')" means Git Gateway is misconfigured
- Solution: Migrated to Vercel + GitHub OAuth backend instead

## Implementation Notes

### File Structure
- `index.html` - Main HTML structure
- `styles.css` - All CSS styling
- `script.js` - JavaScript functionality
- `api/` - Vercel serverless functions
- `admin/` - Decap CMS admin interface
- `content/blog/` - Markdown blog posts

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- No IE11 support needed
- Use of modern CSS (custom properties, backdrop-filter)

### Performance Considerations
- CSS-only animations where possible
- Minimal JavaScript for state management
- Optimized transitions (use transform and opacity)
- No heavy libraries or dependencies

## Distinctive Elements (Anti-AI Slop)

This design actively avoids generic aesthetics through:

1. **Authentic nostalgia**: Real Xbox 360 design language, not "retro-inspired"
2. **Segoe UI typography**: The actual system font, not a generic substitute
3. **Specific color values**: Exact Xbox green RGB values, not approximations
4. **Purposeful animations**: Bouncy, satisfying interactions that feel game-like
5. **Grid pattern background**: Subtle texture that references gaming aesthetics
6. **Pulsing beacon**: Living, breathing interface element
7. **Bold layout**: Asymmetric, confident tile arrangement
8. **Glow effects**: Strategic use of box-shadow for depth and atmosphere
9. **Tactile feedback**: Scale transforms on interaction
10. **Modal storytelling**: Blog content presented as a feature, not an afterthought

The key is committing fully to the Xbox 360 aesthetic - it's not just green colors and rounded corners, it's the entire interaction language of that era's premium console experience.

## Final Deliverable

Create a single `.html` file that:
- Opens directly in a browser
- Requires no build process or server
- Contains all HTML, CSS, and JavaScript
- Is production-ready and polished
- Captures the Xbox 360 dashboard magic
- Feels fast, responsive, and delightful to use

The result should feel like stepping into a time machine back to 2010, but with modern web standards and silky-smooth performance.
