Here's the updated README with testing added properly — not just as a future improvement but as something actually done:

---

# Revolut-Inspired Finance Dashboard

A frontend POC built to demonstrate design-consistent, typed 
React components using Revolut's exact tech stack — focused 
on the engineering problems that matter at scale: visual 
consistency, designer collaboration, and component reusability.

## Why I Built This

Scaling a frontend across a fast-moving, globally distributed 
team creates a core problem — design drift. Components get 
implemented in isolation, magic numbers get scattered across 
files, and consistency breaks silently over time.

This POC explores how a centralized theme layer + typed 
component contracts can enforce visual consistency without 
slowing down feature velocity. Every color, spacing value, 
and border radius in this codebase traces back to a single 
source of truth in `tokens.ts`.

## Tech Stack

Mirrors Revolut's frontend stack exactly:

- React + TypeScript
- styled-components
- Recharts
- Vite
- React Testing Library + Vitest

## Architecture

```
src/
├── theme/
│   └── tokens.ts         — single source of truth for all design tokens
├── components/
│   ├── SummaryCard       — themeable, typed balance/income/expense cards
│   ├── TransactionRow    — variant-based action buttons, CSS hover states
│   ├── TransactionList   — empty state handling, clean composition
│   ├── FilterBar         — active state via props, mapped from typed array
│   ├── AddTransactionModal — typed union state, overlay dismiss pattern
│   └── FinanceChart      — per-bar color tokens via Recharts Cell
├── models/               — shared Transaction type contract
├── utils/                — currency formatting
└── services/             — mock data layer
```

## Testing

Unit tests written with React Testing Library and Vitest.

```bash
npx vitest
```

Current coverage:
- SummaryCard — renders title, formats amount, 
  applies dynamic color token

Philosophy: components are tested at the boundary — 
what the user sees, not implementation details. 
Same approach used in production design systems.

## Design Decisions

**Token-based theming over inline styles**
All design values live in `tokens.ts`. A brand color 
change propagates everywhere in one edit — the same 
guarantee a real design system gives designers when 
they update a token in Figma.

**Typed component props over raw strings**
Union types like `"Income" | "Expense"` and 
`"Pending" | "Completed"` are enforced at the component 
boundary. This prevents silent mismatches between what 
designers spec and what engineers implement.

**Variant-based components over duplicated styles**
`ActionButton` takes a `$variant` prop instead of two 
separate button components. `ModalButton` follows the 
same pattern. One component, multiple states — easier 
for designers to reason about and easier to maintain.

**CSS hover states over DOM mutation**
Hover effects use styled-components `&:hover` instead 
of `onMouseEnter/onMouseLeave` DOM manipulation. Keeps 
React's rendering model clean and makes styles 
inspectable in DevTools.

**Per-bar chart colors via Cell**
Income and expense bars use distinct semantic colors — 
green and red — matching the same tokens used in 
SummaryCard and TransactionRow. Visual language stays 
consistent across the entire UI through shared tokens.

## What I'd Add Next

- Storybook integration for designer handoff 
  and component isolation
- Expand test coverage to all components
- localStorage persistence for session continuity
- Monthly breakdown view with category tagging
- Webpack migration from Vite for production 
  bundler alignment with enterprise stack
- Mobile-first responsive refinements

## Author

Aman Malik
[GitHub](https://github.com/Demontrick) · 
[LinkedIn](https://linkedin.com/in/aman-malik-b7b586242)

## How to Run

```bash
git clone https://github.com/Demontrick/finance-tracker.git
cd finance-tracker
npm install
npm run dev
```

## Run Tests

```bash
npx vitest
```
```