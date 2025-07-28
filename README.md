# Shortify - URL Shortener

Shortify is a modern, privacy-focused URL shortener built with React and TypeScript. Create short, shareable links instantly with QR code generation, click tracking, and a beautiful responsive interface.

## ✨ Features

- **🔗 URL Shortening:** Convert long URLs into short, shareable links
- **📱 QR Code Generation:** Generate QR codes for easy mobile sharing
- **📊 Click Tracking:** Monitor how many times your links are clicked
- **💾 Local Storage:** All data stored locally in your browser (privacy-first)
- **📱 Responsive Design:** Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI:** Beautiful gradient design with smooth animations
- **📤 Easy Sharing:** One-click copy and share functionality
- **🗂️ Link Management:** View and manage all your shortened URLs
- **🌙 Dark Mode Support:** Toggle between light and dark themes

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd movie-mood-matcher

# Install dependencies
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

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   └── AdSense.tsx         # Google AdSense integration
├── pages/
│   ├── ShortUrl.tsx        # Main URL shortening page
│   ├── MyLinks.tsx         # Link management page
│   ├── About.tsx           # About page
│   ├── Contact.tsx         # Contact form
│   ├── BuyMeACoffee.tsx    # Support page
│   ├── Privacy.tsx         # Privacy policy
│   └── Terms.tsx           # Terms of service
├── App.tsx                 # Main app component with routing
├── index.tsx               # Entry point
└── index.css               # Global styles and Tailwind CSS
```

## 🛠️ Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Routing:** React Router DOM
- **Storage:** LocalForage for local data persistence
- **QR Codes:** qrcode.react for QR code generation
- **Icons:** Heroicons
- **Build Tool:** Create React App

## 🎨 Design System

The app uses a custom color palette:

- **Vanilla:** `#FFF3B0` - Background color
- **Mustard:** `#E09F3E` - Primary accent
- **Dark Slate:** `#335C67` - Text and borders
- **Red Brick:** `#9E2A2B` - Error states

## 🔧 Key Features Explained

### URL Shortening

- Validates URLs and automatically adds `https://` if missing
- Generates unique 6-character IDs for short URLs
- Stores data locally using LocalForage

### QR Code Generation

- Automatically generates QR codes for each shortened URL
- Responsive sizing based on screen size
- Downloadable as PNG images

### Link Management

- View all shortened URLs in one place
- Track click counts for each link
- Delete unwanted links
- Copy links to clipboard with one click

### Privacy-First Approach

- All data stored locally in your browser
- No server-side storage of your URLs
- No tracking or analytics

## 📱 Responsive Design

The app is fully responsive with:

- Mobile-first design approach
- Adaptive font sizing
- Responsive QR code sizing
- Touch-friendly interface

## 🚀 Deployment

The app can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Support

If you find this project helpful, consider supporting the development:

- Visit the "Coffee Time!" page to buy the developer a coffee
- Star the repository on GitHub
- Share with friends and colleagues

## 📞 Contact

Have questions or suggestions? Reach out through the [Contact page](/contact) or create an issue on GitHub.
