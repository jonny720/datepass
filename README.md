# DatePass

A playful interactive date invitation generator. Create personal invitations, share them via URL, and let recipients respond through a colorful mobile-first experience.

## Features

- 🎨 Mobile-first responsive design
- 🌍 Hebrew RTL and English LTR support
- 💝 Playful interactive user experience
- 📤 Shareable invitation URLs
- 💬 WhatsApp message integration
- 🎯 Client-only architecture (no backend required)

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js 22.12.0 or higher
- npm 10.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd datepass
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Testing

Run tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Building

Build for production:

```bash
npm run build
```

Build for GitHub Pages deployment:

```bash
npm run build:gh-pages
```

Preview the production build:

```bash
npm run preview
```

### Code Quality

Lint code:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

## Easter egg sounds

Easter egg sounds are generated locally with the Web Audio API.

To change the sound, edit:

```text
src/config/soundConfig.ts
```

Available sounds:
- off
- soft-pop
- tiny-boop
- sparkle
- soft-quack

Example:

```ts
export const EASTER_EGG_SOUND = "sparkle";
```

To disable all Easter egg sounds:

```ts
export const ENABLE_EASTER_EGG_SOUNDS = false;
```

## Deployment

### GitHub Pages Deployment

DatePass can be automatically deployed to GitHub Pages using GitHub Actions.

#### Prerequisites

1. A GitHub repository for the project
2. GitHub Pages enabled in repository settings

#### Setup Instructions

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Configure the base path** (if needed):
   - If your repository is named `datepass`, the default configuration will work
   - If your repository has a different name, update the `VITE_BASE_PATH` in:
     - `.github/workflows/deploy.yml` (line with `VITE_BASE_PATH: /datepass/`)
     - `package.json` (the `build:gh-pages` script)
   - Change `/datepass/` to `/your-repo-name/`

4. **Trigger deployment**:
   - The GitHub Actions workflow automatically runs on every push to `main`
   - Or manually trigger it from the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

5. **Wait for deployment**:
   - Check the **Actions** tab to monitor the deployment progress
   - The deployment typically takes 1-2 minutes

6. **Access your deployed app**:
   - Your app will be available at: `https://your-username.github.io/datepass/`

#### Testing Your Deployment

After deployment completes, verify that invitation links work correctly:

1. **Create an invitation**:
   - Visit `https://your-username.github.io/datepass/`
   - Click "Create Invitation"
   - Fill out the form and generate an invitation URL

2. **Test the generated link**:
   - Copy the invitation URL
   - Open it in a new incognito/private window (to test without cache)
   - Verify the invitation displays correctly

3. **Test sharing**:
   - Share the URL through WhatsApp (or copy to mobile)
   - Open the link on a mobile device
   - Verify the mobile experience works

4. **Test direct access**:
   - Bookmark an invitation URL
   - Close the browser completely
   - Re-open the bookmark
   - Verify the invitation loads without errors

#### Common Issues

**Issue**: Invitation links show 404  
**Solution**: Ensure GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")

**Issue**: CSS/JS files fail to load  
**Solution**: Verify the `VITE_BASE_PATH` matches your repository name exactly (including the leading and trailing slashes)

**Issue**: Deployment workflow fails  
**Solution**: Check that GitHub Pages is enabled and repository has correct permissions in Settings → Actions → General → Workflow permissions (set to "Read and write permissions")

#### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# The dist/ folder contains the built files
# Upload the contents of dist/ to your hosting provider
```

### Environment Variables

- `VITE_BASE_PATH`: Sets the base path for assets (default: `/`, GitHub Pages: `/datepass/`)

### Verifying Invite Links

After deployment, invite links should work in all these scenarios:

✅ **Direct access**: Opening `https://your-username.github.io/datepass/#/invite/[encoded-data]` directly  
✅ **Shared via WhatsApp**: Links pasted in WhatsApp messages  
✅ **Copied from mobile**: Links copied from a mobile browser  
✅ **Incognito mode**: Fresh browser sessions without cache  
✅ **Bookmarked links**: Links saved and reopened later

The app uses hash-based routing (`#/`) which ensures invite links work correctly on static hosting platforms without server-side routing configuration.

## Project Structure

```
src/
  app/              # Main application component
  components/
    common/         # Shared reusable components
    creator/        # Creator flow components
    recipient/      # Recipient flow components
  config/           # App configuration
  data/             # Static data and constants
  hooks/            # Custom React hooks
  i18n/             # Internationalization
  lib/              # Utility functions
  styles/           # Global styles
  types/            # TypeScript type definitions
  test/             # Test utilities and setup
```

## Design Principles

- **Mobile-first**: Optimized for mobile devices with responsive breakpoints
- **Accessibility**: Semantic HTML and ARIA attributes
- **Type Safety**: Comprehensive TypeScript types
- **Component Composition**: Small, focused, reusable components
- **Clear Separation**: Distinct creator and recipient flows
- **No Overengineering**: Simple solutions, no premature abstraction
- **Client-Only**: All logic runs in the browser

## Development Guidelines

- Write strongly-typed TypeScript
- Keep components small and focused
- Test critical user flows
- Follow React best practices
- Use semantic HTML
- Ensure responsive design
- Support RTL languages

## Product Description

DatePass is a playful, mobile-first web application for creating personalized date invitations. Unlike traditional invitation tools, DatePass adds an element of fun and personality through:

- **Customizable Themes**: Choose from 5 unique invitation styles (Cruise Ticket, Secret Mission, Nature Escape, Party Vibe, After Dark)
- **Personality Cards**: Add intro cards that reveal fun facts about yourself in a playful Q&A format
- **Interactive "Maybe" Button**: A fun game where the "maybe another time" button tries to escape from the cursor before finally letting recipients decline
- **Activity Selection**: Recipients can choose from suggested date activities
- **Time Flexibility**: Multiple date slot options with recipient choice
- **Instant Sharing**: Generate shareable URLs that work immediately without any backend or database

### How It Works

1. **Creator Flow**: The invitation creator fills out a multi-step form (names, theme, personality cards, activities, date slots, WhatsApp number)
2. **URL Generation**: The app encodes all invitation data into a URL-safe base64 string
3. **Recipient Experience**: Recipients open the link and go through a delightful flow (personality reveal, the main question with escaping button, activity/time selection)
4. **WhatsApp Handoff**: Confirmed invitations open WhatsApp with a pre-filled message to continue the conversation

### Key Characteristics

- **Zero Backend**: Everything runs in the browser. No servers, no databases, no user accounts
- **Privacy-Focused**: Invitation data lives only in URLs and localStorage. Nothing is tracked or stored server-side
- **Instant**: No loading times, no sign-ups, no deployments needed for data changes
- **Offline-Capable**: Once loaded, the app works without internet (except WhatsApp handoff)
- **Lightweight**: ~119 kB gzipped JavaScript bundle, ~8.4 kB CSS
- **Bilingual**: Full Hebrew RTL and English LTR support with proper text direction handling

## Limitations & Trade-offs

### Architectural Limitations

- **No Persistence**: Invitation drafts are stored only in localStorage and can be lost if browser data is cleared
- **No Analytics**: Cannot track how many people viewed or responded to invitations
- **URL Length**: Complex invitations with many personality cards create longer URLs (though still shareable)
- **No Editing**: Once an invitation URL is created, it cannot be edited. A new URL must be created
- **Client-Side Only**: All validation and logic runs in the browser, making it possible to craft malicious URLs (though only the recipient would see broken data)

### Feature Limitations

- **No Authentication**: Anyone with a URL can view the invitation
- **No Response Storage**: Recipient responses go directly to WhatsApp; there's no "dashboard" to view responses
- **Single-Recipient**: Each invitation is for one person (though the URL can be shared with multiple people)
- **Static Content**: Activities, themes, and personality prompts are hard-coded and require a code deployment to change
- **No Push Notifications**: No way to notify the creator when someone responds
- **WhatsApp Dependency**: The confirmation flow requires WhatsApp. There's no alternative communication channel

### Technical Limitations

- **Browser Support**: Requires modern browsers with ES6+ support
- **Base64 Encoding**: Invitation URLs are longer than traditional ID-based URLs
- **No Server-Side Rendering**: All content loads client-side, which may affect initial SEO (though this is primarily a sharing tool, not a discovery tool)
- **localStorage Quota**: Browser storage limits (typically 5-10 MB) could theoretically be hit with hundreds of draft invitations
- **No Internationalization**: Only Hebrew and English are supported. Adding languages requires code changes

### Design Trade-offs

- **Mobile-First**: Optimized for mobile screens. Desktop experience is functional but not enhanced
- **Playful Tone**: The personality and interactive elements may not suit all audiences or cultures
- **Limited Customization**: Creators choose from preset themes and prompts rather than creating fully custom designs
- **No Multi-Step Back Button**: Recipients cannot go back in the flow once they've made selections

### Why These Trade-offs?

DatePass prioritizes **simplicity, speed, and fun** over comprehensive features:

- Zero infrastructure means zero cost and instant availability
- No backend means no security vulnerabilities, no maintenance, no scaling issues
- URL-based state means invitations work forever without database migrations
- Client-only architecture keeps development lightweight and iteration fast

This makes DatePass ideal for casual, personal date invitations but not suitable for business use cases requiring analytics, authentication, or persistent data storage.

## License

MIT
