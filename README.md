# ClearMyCache

ClearMyCache is a simple, modern web app to help users clear browser storage (local storage, session storage, cookies) and learn how to manually clear cache in all major browsers. Built with React and Tailwind CSS.

## Features
- **Quick Cleanup Buttons:** Instantly clear local storage, session storage, and cookies with a single click.
- **Manual Instructions:** Accordion-style guides for clearing cache in Chrome, Firefox, Safari, Edge, and Brave (desktop & mobile).
- **Developer Tools:** Code snippets for clearing IndexedDB, cookies, and cache busting tips.
- **Dark Mode:** Toggle between light and dark themes.
- **AdSense Integration:** Monetize with Google AdSense.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
npm start
# or
yarn start
```
App will be available at `http://localhost:3000`.

### Build for Production
```bash
npm run build
# or
yarn build
```

## File Structure
- `src/pages/ClearMyCache.tsx` — Main app page
- `src/components/AdSense.tsx` — AdSense ad component
- `src/index.tsx` — Entry point
- `src/index.css` — Tailwind CSS and custom styles
- `public/index.html` — HTML template

## License
MIT 