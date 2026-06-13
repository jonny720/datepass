# DatePass - Copilot Instructions

## Project Overview

DatePass is a small, polished, frontend-only date invitation generator. Users create invitations, share URLs, and recipients respond through a playful mobile-first experience.

## Architecture Constraints

### What This Project IS

- ✅ Client-only React application
- ✅ Frontend-only (no backend)
- ✅ Static data in code
- ✅ URL-based state sharing
- ✅ Mobile-first responsive UI

### What This Project IS NOT

- ❌ No backend server
- ❌ No database
- ❌ No authentication system
- ❌ No external API calls
- ❌ No state management libraries (Redux, Zustand, etc.)
- ❌ No component libraries (Material-UI, Chakra, etc.)
- ❌ No unnecessary dependencies

## Technology Stack

**Core:**
- Vite (build tool)
- React 18 (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)

**UI Enhancement:**
- Framer Motion (animations only)
- Lucide React (icons only)

**Testing:**
- Vitest
- React Testing Library

**Code Quality:**
- ESLint
- Prettier

## Design Principles

### 1. Mobile-First
- Design for mobile screens first
- Use responsive breakpoints for larger screens
- Touch-friendly interactive elements
- Optimize for thumb reach zones

### 2. Strong Typing
- Use TypeScript for all code
- Define explicit types for all data structures
- Avoid `any` type
- Use type inference where appropriate
- Export types from dedicated files

### 3. Component Design
- Keep components small and focused
- Single responsibility principle
- Reusable components in `components/common/`
- Flow-specific components in `components/creator/` and `components/recipient/`
- Props should be explicit and typed

### 4. No Premature Abstraction
- Don't create utilities until you need them 3+ times
- Keep logic colocated with components initially
- Extract only when duplication becomes clear
- Prefer simple solutions over clever ones

### 5. Clear Separation
- Creator flow: separate from recipient flow
- Each flow should be independent
- Share only common UI components
- Different routes for different flows

### 6. Accessibility
- Use semantic HTML elements
- Include ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Proper heading hierarchy

### 7. Internationalization
- Support Hebrew RTL and English LTR
- Use `dir` attribute on HTML elements
- Text alignment based on direction
- Mirror layouts for RTL when needed
- Keep translations in `src/i18n/`

## Folder Structure Rules

```
src/
  app/              # Main App component and app-level logic
  components/
    common/         # Reusable UI components (buttons, cards, etc.)
    creator/        # Components for invitation creation flow
    recipient/      # Components for invitation viewing/response flow
  config/           # App configuration (languages, constants)
  data/             # Static data (activities, time slots, etc.)
  hooks/            # Custom React hooks
  i18n/             # Translations and language utilities
  lib/              # Utility functions and helpers
  styles/           # Global styles and Tailwind config
  types/            # TypeScript type definitions
  test/             # Test utilities and setup files
```

## Testing Requirements

### What to Test
- Critical user flows (creating invitation, responding)
- Component rendering with different props
- User interactions (clicks, form inputs)
- Language switching
- Responsive behavior (mobile/desktop)

### What NOT to Test
- Third-party libraries
- Implementation details
- Styling (unless critical to functionality)
- Trivial components (simple wrappers)

### Testing Patterns
```typescript
// Good: Test user behavior
it('submits the form when user clicks submit', () => {
  const { getByRole } = render(<MyForm />);
  fireEvent.click(getByRole('button', { name: /submit/i }));
  expect(mockSubmit).toHaveBeenCalled();
});

// Bad: Test implementation
it('calls handleSubmit function', () => {
  // Testing internal function names
});
```

## Code Style

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react';
import type { MyProps } from '@/types';

// 2. Types (if not imported)
interface LocalState {
  // ...
}

// 3. Component
export function MyComponent({ prop1, prop2 }: MyProps) {
  // Hooks
  const [state, setState] = useState<LocalState>();
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Naming Conventions
- Components: PascalCase (`DateCard`, `ActivitySelector`)
- Files: Match component name (`DateCard.tsx`)
- Hooks: camelCase with `use` prefix (`useLanguage`, `useInvitation`)
- Types: PascalCase (`Invitation`, `Activity`)
- Constants: UPPER_SNAKE_CASE (`DEFAULT_LANGUAGE`, `MAX_ACTIVITIES`)

## State Management

### Local State (useState)
- Use for component-specific state
- Form inputs, toggles, local UI state

### URL State
- Use for shareable invitation data
- Encode/decode invitation in URL parameters
- No server storage needed

### Context (if needed)
- Only for truly global state (language, theme)
- Avoid using Context for prop drilling
- Keep context small and focused

## Common Patterns

### URL Encoding
```typescript
// Encode invitation data into URL
const createInvitationUrl = (data: Invitation): string => {
  const encoded = btoa(JSON.stringify(data));
  return `${window.location.origin}/invite/${encoded}`;
};

// Decode invitation data from URL
const parseInvitationUrl = (encoded: string): Invitation => {
  return JSON.parse(atob(encoded));
};
```

### RTL Support
```typescript
// Component with RTL support
export function MyComponent() {
  const { config } = useLanguage();
  
  return (
    <div dir={config.direction}>
      {/* Content */}
    </div>
  );
}
```

### Animation with Framer Motion
```typescript
import { motion } from 'framer-motion';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

## When Adding Features

### Before Adding Code
1. Is this feature necessary for the MVP?
2. Can it be done with existing code?
3. Does it fit the frontend-only constraint?
4. Will it work on mobile?

### Before Adding Dependencies
1. Is this absolutely necessary?
2. Can we build it ourselves simply?
3. Is it small and focused?
4. Does it have good TypeScript support?

### Before Abstracting
1. Is this used in 3+ places?
2. Is the pattern clear and stable?
3. Will this make the code simpler?
4. Can someone unfamiliar understand it?

## Common Mistakes to Avoid

❌ Adding state management libraries
❌ Creating API endpoints or backend logic
❌ Over-abstracting early
❌ Using `any` type
❌ Forgetting mobile responsiveness
❌ Ignoring RTL support
❌ Creating "smart" utility functions
❌ Adding unnecessary dependencies
❌ Testing implementation details
❌ Creating large monolithic components

## Questions to Ask

When implementing features, ask:
- Will this work offline?
- Does this need a backend? (answer should be NO)
- Is this mobile-friendly?
- Does this support RTL?
- Is this accessible?
- Can I test this?
- Is this simple enough?

## Summary

DatePass is intentionally small and focused. Keep it simple, mobile-first, strongly-typed, and frontend-only. When in doubt, choose the simpler solution.
