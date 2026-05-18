# ScholarFlow Developer Quick Reference

Fast lookup guide for common tasks and patterns.

---

## Quick Navigation

| Task | File | Component |
|------|------|-----------|
| Style buttons | `src/components/Button.tsx` | `<Button />` |
| Add navigation context | `src/components/Breadcrumb.tsx` | `<Breadcrumb />` |
| Show notifications | `src/store/useAppStore.ts` | `addNotification()` |
| Form validation | `src/hooks/useFormValidation.ts` | `useFormValidation()` |
| Keyboard shortcuts | `src/hooks/useKeyboardShortcuts.ts` | `useKeyboardShortcuts()` |
| Main form | `src/pages/CoverGenerator.tsx` | CoverGenerator page |
| Saved covers | `src/pages/MyCovers.tsx` | MyCovers page |

---

## Common Code Snippets

### Add Button to Page
```tsx
import Button from '@/components/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Action Text
</Button>
```

### Add Breadcrumbs to Page
```tsx
<DocLayout 
  title="Page Title"
  breadcrumbs={[
    { label: 'Parent', href: '/parent', icon: 'home' },
    { label: 'Current Page' }
  ]}
>
  {/* Content */}
</DocLayout>
```

### Show Toast Notification
```tsx
import { useAppStore } from '@/store/useAppStore';

const { addNotification } = useAppStore();

// Success
addNotification({ 
  message: 'Action completed', 
  type: 'success' 
});

// Error
addNotification({ 
  message: 'Something went wrong', 
  type: 'error' 
});

// Info
addNotification({ 
  message: 'FYI message', 
  type: 'info' 
});
```

### Add Form Field
```tsx
<div className="space-y-2 relative group">
  <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
    Field Label <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary text-lg">icon</span>
    <input
      name="fieldName"
      value={data.fieldName}
      onChange={handleChange}
      className={`w-full bg-white border rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none ${
        error ? 'border-red-400' : 'border-outline-variant/30'
      }`}
      type="text"
      placeholder="Placeholder"
    />
  </div>
  {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
</div>
```

### Collapsible Section
```tsx
// State
const [expanded, setExpanded] = useState(true);

// Toggle
const toggle = () => setExpanded(!expanded);

// JSX
<div className="border border-outline-variant/20 rounded-xl overflow-hidden">
  <button onClick={toggle} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-primary">icon</span>
      <div className="text-left">
        <h4 className="font-headline text-lg text-indigo-900">Title</h4>
        <p className="text-xs text-on-surface-variant">Subtitle</p>
      </div>
    </div>
    <span className={`material-symbols-outlined transition-transform ${expanded ? 'rotate-180' : ''}`}>expand_more</span>
  </button>
  
  {expanded && (
    <div className="px-4 pb-4 space-y-4 border-t border-outline-variant/20 bg-slate-50/30 pt-4">
      {/* Content */}
    </div>
  )}
</div>
```

### Add Keyboard Shortcut
```tsx
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

useKeyboardShortcuts([
  { 
    key: 'e', 
    ctrlKey: true, 
    callback: handleExport 
  },
  { 
    key: 's', 
    ctrlKey: true, 
    callback: handleSave 
  }
]);
```

### Create Responsive Grid
```tsx
// 1 column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id}>{/* item */}</div>
  ))}
</div>
```

### Add Hover Animation
```tsx
<div className="hover:shadow-lg hover:-translate-y-1 transition-all">
  Content
</div>
```

### Form Validation Pattern
```tsx
const { errors, isValid } = useFormValidation(data);

// Display error
{errors.fieldName && (
  <p className="text-xs text-red-500 ml-1">{errors.fieldName}</p>
)}

// Disable button if invalid
<Button disabled={!isValid}>Submit</Button>
```

---

## Tailwind CSS Classes Reference

### Colors
```
Primary: indigo-600, indigo-50
Secondary: slate-100, slate-200
Danger: red-50, red-600
Success: emerald-50, emerald-600
```

### Text Styles
```
Headlines: font-headline text-xl/text-3xl/text-5xl
Body: text-sm/text-base/text-lg
Labels: text-[11px] font-bold uppercase tracking-widest
Mono: font-mono text-sm
```

### Spacing
```
Small: gap-2 (8px), p-2, m-2
Medium: gap-4 (16px), p-4, m-4
Large: gap-8 (32px), p-8, m-8
XL: gap-12 (48px), p-12, m-12
```

### Rounding
```
Inputs: rounded-lg (8px)
Buttons: rounded-xl (12px)
Cards: rounded-2xl (16px)
Large: rounded-3xl (24px)
```

### Shadows
```
Subtle: shadow-sm
Card: shadow-md
Hover: shadow-lg
Floating: shadow-xl
```

### Transitions
```
Fast: transition-all duration-200
Normal: transition-all duration-300
Slow: transition-all duration-500
```

### Common Patterns
```
Hover elevation: hover:shadow-lg hover:-translate-y-1 transition-all
Focus input: focus:ring-4 focus:ring-primary/10 focus:border-primary
Disabled: disabled:opacity-50 disabled:cursor-not-allowed
Active: active:scale-95
```

---

## React Patterns

### State Management (Zustand)
```tsx
import { useAppStore } from '@/store/useAppStore';

const { savedCovers, addNotification, saveCover } = useAppStore();
```

### Animation (Framer Motion)
```tsx
import { motion, AnimatePresence } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Debounced Callback
```tsx
import { useDebouncedCallback } from 'use-debounce';

const debouncedUpdate = useDebouncedCallback((value) => {
  // Update logic
}, 500);
```

### Form Handling
```tsx
const [data, setData] = useState(initialData);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};
```

---

## Component Props

### Button Props
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### Breadcrumb Props
```tsx
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    icon?: string;
  }>;
  className?: string;
}
```

### DocLayout Props
```tsx
interface DocLayoutProps {
  title: string;
  children: React.ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    icon?: string;
  }>;
}
```

---

## File Structure

```
src/
├── components/
│   ├── Button.tsx           ← Reusable button
│   ├── Breadcrumb.tsx       ← Navigation breadcrumbs
│   ├── DocLayout.tsx        ← Document page wrapper
│   ├── Toaster.tsx          ← Toast notifications
│   └── Logo.tsx
├── pages/
│   ├── CoverGenerator.tsx   ← Main form
│   ├── MyCovers.tsx         ← Saved covers
│   ├── Templates.tsx        ← Template gallery
│   ├── Settings.tsx         ← User settings
│   └── Profile.tsx
├── hooks/
│   ├── useKeyboardShortcuts.ts
│   ├── useFormValidation.ts
│   └── useAutoSave.ts
├── store/
│   └── useAppStore.ts       ← Global state
├── utils/
│   ├── templates.ts
│   ├── exportUtils.ts
│   └── validators.ts
└── index.css                ← Global styles
```

---

## Common Tasks

### Add New Page
1. Create file in `src/pages/MyPage.tsx`
2. Import and add route in `src/App.tsx`
3. Use `DocLayout` wrapper for consistency
4. Add breadcrumbs if needed

### Create New Component
1. Create file in `src/components/MyComponent.tsx`
2. Export default function
3. Use TypeScript for props
4. Export type if reusable

### Add Form Field
1. Add state in parent component
2. Create input with proper classes
3. Add onChange handler
4. Display error if present
5. Add validation to `useFormValidation`

### Add Icon
1. Use Material Symbols: `<span className="material-symbols-outlined">icon_name</span>`
2. Find icon at: google.com/symbols

### Create Responsive Layout
1. Start with mobile view (no prefix)
2. Add `md:` for tablet
3. Add `lg:` for desktop
4. Add `xl:` for large screens

---

## Debugging Tips

### Check if Component Rendered
```tsx
console.log("[component] Rendered with props:", props);
```

### Check State Updates
```tsx
useEffect(() => {
  console.log("[state] Data updated:", data);
}, [data]);
```

### Check Event Handler
```tsx
const handleClick = () => {
  console.log("[event] Button clicked");
  doSomething();
};
```

### Check Validation
```tsx
console.log("[validation] Errors:", errors);
console.log("[validation] Is valid:", isValid);
```

---

## Performance Tips

1. **Memoize Components**: Use `React.memo()` for expensive renders
2. **Lazy Load Routes**: Use `lazy()` and `Suspense`
3. **Debounce Updates**: Use `useDebouncedCallback` for frequent updates
4. **Image Optimization**: Use WebP with fallbacks
5. **Code Splitting**: Split large components into smaller ones

---

## Testing Checklist

- [ ] Mobile responsive (<480px works)
- [ ] Form validation shows errors
- [ ] Buttons are disabled when needed
- [ ] Notifications appear and dismiss
- [ ] Keyboard shortcuts work
- [ ] Breadcrumbs navigate correctly
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Accessibility: Tab navigation works
- [ ] Dark mode (if supported)

---

## Useful Links

- Material Symbols Icons: https://fonts.google.com/icons
- Tailwind CSS Docs: https://tailwindcss.com
- Framer Motion Docs: https://www.framer.com/motion/
- React Hooks: https://react.dev/reference/react/hooks
- Zustand Docs: https://github.com/pmndrs/zustand

---

## Quick Command Reference

```bash
# Install dependencies
npm install / pnpm install / yarn install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

---

This quick reference covers 80% of common development tasks. Refer to full documentation for edge cases.
