
# 📚 ScholarFlow - The Academic Editorial Suite

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2-38b2ac?logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.0-ffc415?logo=vite)](https://vitejs.dev)
[![GitHub](https://img.shields.io/badge/GitHub-ajnish--kumar--sahu-181717?logo=github)](https://github.com/ajnish-kumar-sahu)

> **ScholarFlow** is a premium, full-featured academic document management and creation suite. Generate stunning assignment covers, design manuscript indexes, manage research documents, and curate scholarly collections—all in one elegant, intuitive platform.

## 🌟 Overview

ScholarFlow transforms academic document creation from a tedious task into an enjoyable, streamlined experience. Whether you're a student crafting assignment covers or a researcher organizing manuscripts, ScholarFlow provides professional-grade tools with an exceptionally beautiful interface.

**Live Features:**

- ✨ 7+ customizable assignment cover templates
- 📑 Index/table of contents designer
- 🎨 Interactive particle background animations
- 🌓 Intelligent 3-mode auto theme system
- 📊 Admin dashboard with analytics
- 👥 User management system
- 💾 Smart localStorage & auto-save
- 📥 Multi-format export (PDF, JPG, Print)
- 🔐 Secure user authentication
- 📱 Fully responsive mobile design

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (for development)
- **npm** or **yarn** package manager
- Modern browser (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)

### Installation

```bash
# Clone the repository
git clone https://github.com/ajnish-kumar-sahu/assignment-cover-generator.git
cd assignment-cover-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```
````

The development server will start at `http://localhost:5173` (Vite default).

---

## 📋 Features in Detail

### 🎨 Cover Generator

- **7 Professional Templates**: Classic, Modern, Minimal, Professional, Elegant, Creative, Academic
- **Custom Color Themes**: 7 color palettes (Blue, Green, Red, Purple, Black, Ocean Blue, Deep Orange)
- **Real-time Preview**: See changes instantly as you type
- **Smart Form Validation**: Ensures all required fields are complete
- **Auto-save**: Automatically saves your progress every 30 seconds
- **Form Save/Load**: Manually save and restore form data

### 📑 Index Designer

Create professional table of contents and indexes with:

- Customizable formatting and styling
- Automatic page number generation
- Multiple layout options
- Export-ready formatting

### 🌌 Interactive Particle Background

- **60+ Animated Particles** with glow effects
- **Mouse Repulsion** effect—particles react to your cursor
- **Connection Lines** between nearby particles
- **Smart Color Adaptation** to light/dark themes
- **Performance Optimized** using Canvas API

### 🌓 Intelligent Theme System

3-mode auto theme with fallback logic:

1. **Auto Mode** — Respects system preference (`prefers-color-scheme`), falls back to time-based (dark after 7 PM, light at 6 AM)
2. **Light Mode** — Forces light theme
3. **Dark Mode** — Forces dark theme

Toggle themes with `Ctrl+T` or the floating theme button.

### 📊 Admin Dashboard

Comprehensive analytics and management:

- User statistics and activity monitoring
- Document generation analytics
- System performance metrics
- Real-time audit logging

### 👥 User Management

- Create, edit, and delete user accounts
- Role-based access control
- Permission management
- Activity tracking

### 📤 Export Options

- **PDF**: High-quality A4 export (jsPDF + html2canvas)
- **JPG**: Universal image format for sharing
- **Print**: Optimized print styles
- **Direct Printing**: Print dialog integration

### 💾 Smart Data Management

- **Auto-save**: Saves to browser localStorage every 30 seconds
- **Manual Save**: `Ctrl+S` to save form data
- **Manual Load**: `Ctrl+L` to restore saved data
- **Form Validation**: Real-time field validation with feedback

---

## 🏗️ Architecture & Project Structure

### Directory Layout

```
assignment-cover-generator/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── DocLayout.tsx     # Document layout wrapper
│   │   ├── Logo.tsx          # ScholarFlow logo component
│   │   ├── ParticlesBg.tsx   # Interactive particle animation
│   │   └── Toaster.tsx       # Toast notification system
│   │
│   ├── pages/               # Page components (25+ routes)
│   │   ├── Landing.tsx       # Home/landing page
│   │   ├── CoverGenerator.tsx # Main assignment cover generator
│   │   ├── IndexDesigner.tsx  # Index/TOC designer
│   │   ├── AdminDashboard.tsx # Admin analytics dashboard
│   │   ├── UserManagement.tsx # User CRUD operations
│   │   ├── Profile.tsx        # User profile management
│   │   ├── Settings.tsx       # User settings
│   │   ├── SignIn.tsx         # Login page
│   │   ├── SignUp.tsx         # Registration page
│   │   ├── ResetPassword.tsx  # Password recovery
│   │   ├── Templates.tsx      # Template gallery
│   │   ├── MyCovers.tsx       # User's created covers
│   │   ├── Library.tsx        # Document library
│   │   ├── History.tsx        # Activity history
│   │   ├── Archive.tsx        # Archived documents
│   │   ├── Research.tsx       # Research resources
│   │   ├── Curations.tsx      # Curated collections
│   │   ├── StyleGuide.tsx     # Design system documentation
│   │   ├── Notifications.tsx  # Notification center
│   │   ├── JournalGuidelines.tsx # Journal submission guidelines
│   │   ├── ContactSupport.tsx # Support & contact form
│   │   ├── PrivacyPolicy.tsx  # Privacy documentation
│   │   ├── TermsOfService.tsx # Terms documentation
│   │   ├── DeveloperInfo.tsx  # Developer profile
│   │   ├── DocumentStatistics.tsx # Document analytics
│   │   ├── AuditLogs.tsx      # Audit trail viewer
│   │   ├── Permissions.tsx    # Permission management
│   │   ├── NotFound.tsx       # 404 page
│   │   └── (more pages...)
│   │
│   ├── store/               # Zustand state management
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   │
│   ├── App.tsx              # Root app component
│   ├── main.tsx             # Entry point with routing
│   ├── index.css            # Global styles (Tailwind + custom)
│   └── App.css              # App-specific styles
│
├── public/                  # Static assets
│   ├── favicon.png          # Browser favicon
│   ├── logo.png             # ScholarFlow logo
│   └── profile.jpg          # Developer profile image
│
├── legacy/                  # Legacy vanilla JS version
│   ├── index.html           # Old HTML-based implementation
│   ├── styles.css
│   └── app.js
│
├── index.html               # Main HTML entry
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App TypeScript config
├── tsconfig.node.json       # Node TypeScript config
├── eslint.config.js         # ESLint rules
├── tailwind.config.ts       # Tailwind CSS config (implicit)
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

### Routing Structure

All routes are defined in `src/main.tsx` with React Router v7:

| Route                  | Component          | Purpose                |
| ---------------------- | ------------------ | ---------------------- |
| `/`                    | Landing            | Home page              |
| `/cover-generator`     | CoverGenerator     | Main feature           |
| `/index-designer`      | IndexDesigner      | Index creation         |
| `/templates`           | Templates          | Template gallery       |
| `/my-covers`           | MyCovers           | User documents         |
| `/library`             | Library            | Document library       |
| `/profile`             | Profile            | User profile           |
| `/settings`            | Settings           | User preferences       |
| `/login`               | SignIn             | Authentication         |
| `/signup`              | SignUp             | Registration           |
| `/reset-password`      | ResetPassword      | Password recovery      |
| `/admin`               | AdminDashboard     | Admin panel (lazy)     |
| `/user-management`     | UserManagement     | Admin users (lazy)     |
| `/document-statistics` | DocumentStatistics | Analytics (lazy)       |
| `/audit-logs`          | AuditLogs          | Audit trail (lazy)     |
| `/permissions`         | Permissions        | Permission mgmt (lazy) |
| `/history`             | History            | Activity history       |
| `/research`            | Research           | Research tools         |
| `/archive`             | Archive            | Archived docs          |
| `/curations`           | Curations          | Collections            |
| `/journal-guidelines`  | JournalGuidelines  | Guidelines             |
| `/style-guide`         | StyleGuide         | Design system          |
| `/notifications`       | Notifications      | Alerts                 |
| `/contact-support`     | ContactSupport     | Support                |
| `/privacy-policy`      | PrivacyPolicy      | Privacy                |
| `/terms-of-service`    | TermsOfService     | Terms                  |
| `/developer`           | DeveloperInfo      | Developer bio          |
| `*`                    | NotFound           | 404 page               |

---

## 💻 Technology Stack

### Frontend

| Technology            | Version | Purpose               |
| --------------------- | ------- | --------------------- |
| **React**             | 19.2.4  | UI framework          |
| **TypeScript**        | 5.9.3   | Type safety           |
| **React Router DOM**  | 7.13.1  | Client-side routing   |
| **Tailwind CSS**      | 4.2.2   | Utility-first styling |
| **@tailwindcss/vite** | 4.2.2   | Tailwind Vite plugin  |

### UI & Animation

| Technology           | Version | Purpose                  |
| -------------------- | ------- | ------------------------ |
| **Framer Motion**    | 12.38.0 | Animations & gestures    |
| **Lucide React**     | 0.577.0 | Icon library             |
| **Material Symbols** | -       | Google icons (CDN)       |
| **Google Fonts**     | -       | Inter & Playfair Display |

### Export & Document Generation

| Technology      | Version | Purpose                   |
| --------------- | ------- | ------------------------- |
| **html2canvas** | 1.4.1   | HTML to canvas conversion |
| **jsPDF**       | 4.2.1   | PDF generation            |

### State Management

| Technology       | Version | Purpose                      |
| ---------------- | ------- | ---------------------------- |
| **Zustand**      | 5.0.12  | Lightweight state management |
| **use-debounce** | 10.1.1  | Debounce hook utility        |

### Build & Development Tools

| Technology               | Version | Purpose                   |
| ------------------------ | ------- | ------------------------- |
| **Vite**                 | 8.0.1   | Lightning-fast build tool |
| **@vitejs/plugin-react** | 6.0.1   | React plugin for Vite     |
| **ESLint**               | 9.39.4  | Code linting              |
| **@eslint/js**           | 9.39.4  | ESLint core               |
| **typescript-eslint**    | 8.57.0  | TypeScript ESLint plugin  |

### Development Dependencies

- ESLint plugins (react-hooks, react-refresh)
- TypeScript type definitions (@types/react, @types/node, etc.)
- Globals utility

---

## ⌨️ Keyboard Shortcuts

| Shortcut       | Action           | Component      |
| -------------- | ---------------- | -------------- |
| `Ctrl + Enter` | Generate/Submit  | Forms          |
| `Ctrl + S`     | Save form data   | CoverGenerator |
| `Ctrl + L`     | Load form data   | CoverGenerator |
| `Ctrl + T`     | Toggle theme     | App            |
| `Ctrl + H`     | Show help        | App            |
| `Ctrl + R`     | Reset form       | Forms          |
| `Ctrl + P`     | Print cover      | CoverGenerator |
| `← / →`        | Switch templates | CoverGenerator |
| `Esc`          | Close modals     | Modals         |

---

## 🎨 Design System

### Color Palette (MD3 Theme)

**Primary Colors:**

- Primary: `#3525cd` (Indigo)
- Primary Container: `#4f46e5`
- On Primary: `#ffffff`

**Secondary Colors:**

- Secondary: `#006b5f` (Teal)
- Tertiary: `#684000` (Brown)

**Semantic Colors:**

- Background: `#fcf8ff`
- Surface: `#fcf8ff`
- Error: `#ba1a1a`
- Success: Integrated in theme

**Fonts:**

- Headline: Playfair Display (serif)
- Body: Inter (sans-serif)
- Display: Playfair Display

### Premium UI Features

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Premium Cards**: Elevated shadows with hover effects
- **Particle Animations**: Interactive canvas-based background
- **Smooth Transitions**: 0.3-0.7s ease transitions
- **Custom Scrollbars**: Themed scrollbar styling
- **Logo Glow**: Glowing effect on branding

---

## 📦 Styling Architecture

### CSS Organization

1. **Tailwind CSS** (v4) as primary styling framework
2. **Custom Theme** variables defined in `src/index.css`
3. **Glassmorphism utilities** for modern effects
4. **Material Symbols** for icon system
5. **Premium card effects** for elevation

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Touch-friendly spacing and interactions
- Optimized for tablets and desktops

---

## 🔐 User Authentication

ScholarFlow includes a complete authentication system:

### Sign Up Process

- Email validation
- Password strength requirements
- Terms acceptance
- Email confirmation (extensible)

### Sign In Process

- Credentials validation
- Session management
- "Remember me" functionality
- Password recovery flow

### Password Reset

- Email-based reset tokens
- Secure token validation
- Password update confirmation

---

## 📊 Admin Features

### Dashboard

- User statistics
- Document generation metrics
- System health monitoring
- Revenue/usage analytics

### User Management

- Create new users
- Edit user details
- Delete user accounts
- Role assignment

### Audit Logs

- Track all system changes
- User action history
- Document modifications
- Access logs

### Permissions

- Granular role-based access control
- Custom permission sets
- Resource-level access control
- Audit trail for permission changes

---

## 🔧 Development Guide

### Setting Up Development Environment

```bash
# Install dependencies
npm install

# Start Vite dev server (HMR enabled)
npm run dev

# Check code quality
npm run lint

# Fix linting issues automatically
npm run lint --fix

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Style

- **TypeScript** for type safety
- **ESLint** configuration included
- **Prettier** integration (can be added)
- **Tailwind CSS** for consistent styling

### File Naming Conventions

- Components: PascalCase (e.g., `CoverGenerator.tsx`)
- Utilities: camelCase (e.g., `exportToPdf.ts`)
- Styles: kebab-case classes (e.g., `.glass-dark`)
- Files: Match component/export name

---

## 📤 Export & PDF Generation

### PDF Export

Uses **jsPDF + html2canvas** for high-quality PDF generation:

```typescript
// Automatically handles:
// - A4 page sizing
// - Image quality optimization
// - Font embedding
// - Page breaks
```

### JPG Export

Converts DOM to canvas then to JPG format:

```typescript
// Features:
// - Customizable quality (0-1)
// - Transparent background support
// - File size optimization
```

### Print Support

- Optimized print stylesheets
- Page break handling
- Color mode toggling
- Header/footer control

---

## 🌐 Browser Support

| Browser       | Version    | Status          |
| ------------- | ---------- | --------------- |
| Chrome        | 88+        | ✅ Full Support |
| Firefox       | 85+        | ✅ Full Support |
| Safari        | 14+        | ✅ Full Support |
| Edge          | 88+        | ✅ Full Support |
| Mobile Chrome | Android 8+ | ✅ Full Support |
| Mobile Safari | iOS 13+    | ✅ Full Support |

---

## 📱 Responsive Design

ScholarFlow is fully responsive:

- **Desktop**: Full feature set with optimal spacing
- **Tablet**: Adaptive layout (iPad, Android tablets)
- **Mobile**: Touch-optimized, single-column layout
- **Accessibility**: WCAG 2.1 AA compliance (in progress)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**

   ```bash
   git clone https://github.com/YOUR-USERNAME/assignment-cover-generator.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit with descriptive messages**

   ```bash
   git commit -m 'Add: Amazing new feature'
   git commit -m 'Fix: Resolve issue with PDF export'
   git commit -m 'Refactor: Improve component structure'
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe changes clearly
   - Reference any related issues
   - Provide before/after screenshots if applicable

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

MIT © 2026 Ajnish Kumar

---

## 🙏 Acknowledgments

**Libraries & Services:**

- [React](https://react.dev) — UI framework
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Vite](https://vitejs.dev) — Build tool
- [html2canvas](https://html2canvas.hertzen.com/) — HTML conversion
- [jsPDF](https://github.com/parallax/jsPDF) — PDF generation
- [Lucide React](https://lucide.dev) — Icons
- [Google Fonts](https://fonts.google.com) — Typography
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Zustand](https://zustand-demo.vercel.app/) — State management

**Inspiration & Resources:**

- Material Design 3 (MD3) design system
- Apple Human Interface Guidelines
- Academic design best practices

---

## 👨‍💻 Developer

<div align="center">

### Ajnish Kumar

**BCA 5th Semester | Vinoba Bhave University, Hazaribag**

[![GitHub](https://img.shields.io/badge/GitHub-ajnish--kumar--sahu-181717?style=for-the-badge&logo=github)](https://github.com/ajnish-kumar-sahu)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ajnishkumar16-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/ajnishkumar16)
[![Portfolio](https://img.shields.io/badge/Portfolio-ajnish.in-00A98F?style=for-the-badge&logo=about.me)](https://ajnish.in)
[![Email](https://img.shields.io/badge/Email-ajnishk261@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:ajnishk261@gmail.com)

**Expertise:** Web Development | UI/UX Design | TypeScript | React | Full-Stack

</div>

---

## 📊 Project Statistics

![GitHub stars](https://img.shields.io/github/stars/ajnish-kumar-sahu/assignment-cover-generator?style=social)
![GitHub forks](https://img.shields.io/github/forks/ajnish-kumar-sahu/assignment-cover-generator?style=social)
![GitHub issues](https://img.shields.io/github/issues/ajnish-kumar-sahu/assignment-cover-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/ajnish-kumar-sahu/assignment-cover-generator)

---

## 🚀 Future Roadmap

**Upcoming Features:**

- [ ] Cloud sync for saved covers
- [ ] Collaborative editing
- [ ] Custom template builder
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)
- [ ] Dark mode refinements
- [ ] Enhanced analytics
- [ ] Bulk document processing
- [ ] AI-powered template suggestions
- [ ] Advanced permission system

---

## 📞 Support & Contact

- **Issues & Bugs**: [GitHub Issues](https://github.com/ajnish-kumar-sahu/assignment-cover-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ajnish-kumar-sahu/assignment-cover-generator/discussions)
- **Contact**: [Email Me](mailto:ajnishk261@gmail.com)
- **Support Page**: Visit the in-app contact support page

---

<div align="center">

**Made with ❤️ by Ajnish Kumar**

**ScholarFlow** — _Empowering Academic Excellence Through Design_

[Back to Top](#-scholarflow---the-academic-editorial-suite)

</div>
```

This comprehensive README is now ready to be pushed to your repository! Would you like me to update the actual README.md file with this content?
