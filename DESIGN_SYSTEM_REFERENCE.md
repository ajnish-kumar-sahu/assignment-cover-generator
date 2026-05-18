# ScholarFlow Design System Reference Guide

A comprehensive guide to ScholarFlow's design system, components, and usage patterns.

---

## Color Palette

### Primary Colors
- **Primary (Indigo):** #3525cd
  - Used for: Main CTAs, active states, focus rings
  - Variants: 600 (main), 700 (hover), 50 (light bg)

- **Secondary (Emerald):** #059669
  - Used for: Success states, positive feedback
  - Variants: 50 (light bg), 600 (main)

- **Danger (Red):** #ba1a1a
  - Used for: Errors, destructive actions, warnings
  - Variants: 50 (light bg), 600 (main)

### Neutral Colors
- **Slate 50:** #f8fafc (lightest bg)
- **Slate 100:** #f1f5f9 (secondary bg)
- **Slate 200:** #e2e8f0 (borders)
- **Slate 400:** #78716c (placeholder text)
- **Slate 500:** #64748b (secondary text)
- **Slate 600:** #475569 (body text)
- **Slate 900:** #0f172a (headings)

### Semantic Colors
- **Success:** Emerald-600 (#059669)
- **Warning:** Amber-600 (#d97706)
- **Error:** Red-600 (#ba1a1a)
- **Info:** Indigo-600 (#3525cd)

---

## Typography System

### Font Families
- **Headlines:** "Headline" font family (Material Design 3)
- **Body:** System font stack (Segoe UI, Roboto, etc.)
- **Mono:** "Courier New" or system mono (for codes)

### Font Sizes & Weights

#### Headings
- **H1:** 48px (lg), 32px (md) | weight: 700 | line-height: 1.2
- **H2:** 36px | weight: 600 | line-height: 1.3
- **H3:** 28px | weight: 600 | line-height: 1.4
- **H4:** 20px | weight: 600 | line-height: 1.4

#### Body Text
- **Large:** 18px | weight: 400 | line-height: 1.6
- **Normal:** 16px | weight: 400 | line-height: 1.6
- **Small:** 14px | weight: 400 | line-height: 1.5
- **XSmall:** 12px | weight: 400 | line-height: 1.5

#### Labels & UI
- **Label:** 11px | weight: 700 | uppercase | letter-spacing: 0.08em
- **Button:** 12px - 16px | weight: 600 | uppercase | letter-spacing: 0.08em
- **Mono:** 12px - 14px | weight: 500 | font-family: monospace

### Text Utilities
- `text-on-surface` → #1b1b24 (main text color)
- `text-on-surface-variant` → #464555 (secondary text)
- `text-slate-500` → #64748b (tertiary text)
- `text-balance` → Optimal line breaking (headlines)
- `text-pretty` → Better hyphenation (body)

---

## Component Library

### Buttons

#### Button Component
```tsx
import Button from '@/components/Button';

// Primary CTA (default)
<Button onClick={handleExport}>Export PDF</Button>

// Secondary action
<Button variant="secondary">Download</Button>

// Danger action
<Button variant="danger" onClick={handleDelete}>Delete</Button>

// Outline style
<Button variant="outline">Cancel</Button>

// Ghost style (minimal)
<Button variant="ghost">Learn More</Button>

// With loading state
<Button isLoading>Exporting...</Button>

// With icons
<Button leftIcon={<EditIcon />}>Edit Cover</Button>

// Large size
<Button size="lg" fullWidth>Generate Cover</Button>
```

#### Button Variants
- **Primary:** Indigo background, white text, shadow
  - Hover: Darker indigo, elevated shadow
  - Active: Scale-95 transform
  - Disabled: 50% opacity

- **Secondary:** Light gray background, slate text
  - Hover: Darker gray, slight elevation
  - Active: Scale-95 transform
  - Disabled: 50% opacity

- **Danger:** Red background, white/red text
  - Hover: Darker red
  - Active: Scale-95 transform
  - Border: Red 200

- **Outline:** Transparent with border, colored text
  - Border: Primary color
  - Hover: Light background
  - Active: Scale-95 transform

- **Ghost:** Text only, minimal styling
  - Hover: Light background
  - Active: Scale-95 transform

#### Button Sizes
- **Small (sm):** 8px-4px padding | 12px text | small icons
- **Medium (md):** 6px-6px padding | 14px text | medium icons (default)
- **Large (lg):** 8px-4px padding | 16px text | large icons

---

### Form Elements

#### Text Input
```tsx
<div className="space-y-2 relative group">
  <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
    Field Label <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">icon_name</span>
    <input 
      className={`w-full bg-white border rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none ${
        error ? 'border-red-400' : 'border-outline-variant/30'
      }`}
      type="text"
      placeholder="Placeholder text"
    />
  </div>
  {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
</div>
```

#### Select Input
```tsx
<select className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-10 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none">
  <option>Select an option</option>
</select>
```

#### Color Input
```tsx
<div className="relative flex items-center gap-3">
  <input 
    type="color" 
    className="w-16 h-12 bg-white border border-outline-variant/30 rounded-lg cursor-pointer"
  />
  <input 
    type="text" 
    value="#3525cd"
    className="flex-1 bg-white border border-outline-variant/30 rounded-lg py-3 px-3 text-sm font-mono"
    placeholder="#000000"
  />
</div>
```

#### Form Sections
- **Collapsible sections** with icon and description
- **Expand/collapse animation** using Framer Motion
- **Required field markers** (red asterisks)
- **Error states** with red border and message
- **Progress indicator** at form top

---

### Breadcrumb

```tsx
import Breadcrumb from '@/components/Breadcrumb';

<Breadcrumb items={[
  { label: 'Workspace', href: '/generator', icon: 'edit' },
  { label: 'My Covers' }
]} />
```

**Features:**
- Home link at start
- Chevron separators
- Clickable parent links
- Current page highlighted
- Icon support for visual context
- Responsive (hides text on mobile)

---

### Toast Notifications

**Implemented in `<Toaster />` component**

```tsx
// Usage through store
addNotification({ 
  message: 'Cover saved successfully',
  type: 'success' // 'success' | 'error' | 'info'
});
```

**Features:**
- Color-coded by type
- Auto-dismiss after 4 seconds
- Manual close button
- Spring animation
- Stacking support
- Minimum 300px width

---

## Layout Patterns

### Grid Layouts

#### 2-Column (Mobile-First)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* items */}
</div>
```

#### 3-Column (Desktop)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* items */}
</div>
```

#### Form Layout
```tsx
<form className="space-y-4">
  {/* form sections */}
</form>
```

### Spacing System

#### Gaps
- `gap-2` → 8px
- `gap-3` → 12px
- `gap-4` → 16px
- `gap-6` → 24px
- `gap-8` → 32px
- `gap-12` → 48px

#### Padding
- `p-2` → 8px
- `p-3` → 12px
- `p-4` → 16px
- `p-6` → 24px
- `p-8` → 32px
- `p-12` → 48px

#### Margin
- `m-2` → 8px
- `m-4` → 16px
- `m-8` → 32px
- `my-6` → vertical 24px
- `mx-4` → horizontal 16px

---

## Animation Patterns

### Transitions
- **Fast:** 200ms ease-in-out (hover states, icons)
- **Normal:** 300ms ease-in-out (page transitions)
- **Slow:** 500ms+ ease-in-out (long transformations)

### Spring Animations
- **Bounce:** 0.3-0.4 (natural, energetic)
- **Stagger Children:** 0.1s between items
- **Type:** "spring" for natural motion

### Common Animations
```tsx
// Entry animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Hover effect
whileHover={{ y: -6 }}

// Exit animation
exit={{ opacity: 0, scale: 0.9 }}

// Stagger children
variants={{
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Device |
|-----------|-------|--------|
| xs | <640px | Mobile phones |
| sm | 640px+ | Tablets, landscape phones |
| md | 768px+ | Tablets |
| lg | 1024px+ | Laptops |
| xl | 1280px+ | Large screens |
| 2xl | 1536px+ | Extra large screens |

### Mobile-First Approach
```tsx
// Mobile first (default)
<div className="grid grid-cols-1 gap-4">
  // Mobile layout

  // sm+
  <div className="sm:grid-cols-2">

    // md+
    <div className="md:grid-cols-3">

      // lg+
      <div className="lg:grid-cols-4">
      </div>
    </div>
  </div>
</div>
```

---

## Shadow & Depth

### Elevation System
- **Flat:** No shadow (cards on white bg)
- **Raised:** `shadow-sm` (buttons, inputs)
- **Elevated:** `shadow-md` (cards, modals)
- **Floating:** `shadow-lg` (dropdowns, hover states)
- **Floating High:** `shadow-xl` (notifications, overlays)

### Shadow Usage
```tsx
// Input/Button
className="shadow-sm"

// Card
className="shadow-md hover:shadow-lg transition-shadow"

// Hover elevation
className="hover:shadow-xl hover:scale-[1.02] transition-all"

// Custom shadow (backdrop)
style={{ boxShadow: '0_20px_60px_-15px_rgba(0,0,0,0.3)' }}
```

---

## Border & Radius

### Border Radius
- **Small:** `rounded-lg` (8px) - inputs, buttons
- **Medium:** `rounded-xl` (12px) - cards, sections
- **Large:** `rounded-2xl` (16px) - containers
- **XLarge:** `rounded-3xl` (24px) - hero sections

### Border Styles
- **Subtle:** `border border-outline-variant/30`
- **Standard:** `border border-slate-200`
- **Emphasized:** `border-2 border-primary`
- **Dashed:** `border-2 border-dashed border-indigo-200`

---

## State Patterns

### Hover States
```tsx
// Button
className="hover:bg-slate-100 transition-colors"

// Card
className="hover:shadow-lg hover:-translate-y-1 transition-all"

// Icon
className="hover:text-primary hover:scale-110 transition-all"
```

### Focus States
```tsx
// Keyboard focus
className="focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary"

// Input focus
className="focus:ring-4 focus:ring-primary/10 focus:border-primary"
```

### Disabled States
```tsx
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

### Loading States
```tsx
// Button with spinner
<Button isLoading>Loading...</Button>

// Custom loader
<span className="material-symbols-outlined animate-spin">refresh</span>
```

---

## Accessibility Patterns

### Semantic HTML
```tsx
// Headings maintain hierarchy
<h1>Main Title</h1>
<h2>Section Title</h2>

// Buttons for actions
<button>Action</button>

// Links for navigation
<Link to="/path">Navigate</Link>

// Form elements with labels
<label htmlFor="input-id">Label</label>
<input id="input-id" />
```

### ARIA Labels
```tsx
// Icon-only buttons
<button aria-label="Close menu">
  <CloseIcon />
</button>

// Complex regions
<nav aria-label="Main navigation">
  {/* nav items */}
</nav>

// Live regions
<div aria-live="polite" aria-atomic="true">
  {notification}
</div>
```

### Color Contrast
- All text meets WCAG AA (4.5:1 ratio)
- Interactive elements distinguishable without color
- Sufficient spacing between interactive targets

---

## Component Usage Examples

### Form Page
```tsx
// Collapsible section pattern
<div className="border border-outline-variant/20 rounded-xl overflow-hidden">
  <button onClick={() => toggleSection('id')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-primary">icon</span>
      <div>
        <h4 className="font-headline text-lg text-indigo-900">Section Title</h4>
        <p className="text-xs text-on-surface-variant">Subtitle</p>
      </div>
    </div>
    <span className={`material-symbols-outlined transition-transform ${expanded ? 'rotate-180' : ''}`}>expand_more</span>
  </button>

  {expanded && (
    <div className="px-4 pb-4 space-y-4 border-t border-outline-variant/20 bg-slate-50/30 pt-4">
      {/* Form fields */}
    </div>
  )}
</div>
```

### Card Pattern
```tsx
<div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group">
  {/* Content */}
</div>
```

### Alert Pattern
```tsx
<div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-indigo-600">info</span>
    <p className="text-indigo-700 text-sm">Message text</p>
  </div>
</div>
```

---

## Performance Considerations

### Image Optimization
- Use WebP with PNG fallback
- Lazy load images below fold
- Compress SVGs
- Use responsive image sizes

### Animation Performance
- Use `transform` and `opacity` for animations
- Hardware acceleration with GPU
- Limit simultaneous animations
- Use `will-change` sparingly

### Bundle Size
- Code splitting by route
- Dynamic imports for heavy components
- Tree shake unused code
- Minify and compress assets

---

## Deprecated Patterns

These patterns should be avoided in favor of the new design system:

- ~~Gradient overlays~~ → Use solid colors with opacity
- ~~Multiple font families~~ → Use Headline + Body only
- ~~Hard drop shadows~~ → Use subtle shadow system
- ~~Inconsistent button styles~~ → Use Button component
- ~~Arbitrary spacing values~~ → Use Tailwind spacing scale
- ~~Complex nested components~~ → Keep component hierarchy flat

---

## Files Reference

### Components
- `src/components/Button.tsx` - Reusable button
- `src/components/Breadcrumb.tsx` - Breadcrumb navigation
- `src/components/Toaster.tsx` - Toast notifications
- `src/components/DocLayout.tsx` - Document layout wrapper

### Hooks
- `src/hooks/useKeyboardShortcuts.ts` - Keyboard shortcuts
- `src/hooks/useFormValidation.ts` - Form validation
- `src/hooks/useDebouncedCallback.ts` - Debounced updates

### Pages
- `src/pages/CoverGenerator.tsx` - Main form
- `src/pages/MyCovers.tsx` - Saved covers gallery
- `src/pages/Templates.tsx` - Template showcase
- `src/pages/Settings.tsx` - Settings page

---

## Design Philosophy

1. **Progressive Disclosure** - Show essential info, details on demand
2. **Consistency** - Unified design language across app
3. **Feedback** - Clear indication of system state
4. **Accessibility** - Works for everyone, keyboard first
5. **Efficiency** - Reduce clicks and cognitive load
6. **Delight** - Smooth animations and thoughtful interactions

---

This design system ensures consistency, accessibility, and delightful user experience across ScholarFlow.
