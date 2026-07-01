# Wobb Influencer Search

> Frontend take-home assignment — Vibe Coder Intern

**Live demo:** [wobb-assignment](https://wobb-one.vercel.app)

---

## What I changed

### Bugs fixed
1. **Engagement rate math** — was multiplying by `10000` instead of `100`
2. **Engagements stat** — was calling `formatEngagementRate(engagement_rate)` instead of `formatFollowers(engagements)` (the raw count)
3. **Case-sensitive search** — missing `.toLowerCase()` on both sides of the comparison
4. **Stale closure / dead state** — `clickCount` debug state with a stale closure `setClickCount(clickCount + 1)` — removed entirely
5. **Hardcoded card width** — `w-[700px]` on `ProfileCard` broke mobile layouts — replaced with `w-full`
6. **DOM data leak** — `data-search={searchQuery}` was leaking the search query string into every card's DOM node
7. **Missing usernames** — some YouTube entries only have `handle`/`custom_name` (no `username`) — `extractProfiles` now normalises with a fallback chain
8. **Search crash** — `p.username.toLowerCase()` would throw when `username` is `undefined` — guarded with `?? ""`
9. **Broken YouTube avatars** — Google CDN blocks cross-origin requests — fixed with `referrerPolicy="no-referrer"` + `onError` fallback to generated letter avatars
10. **Detail page 404s** — only 6 full JSON profiles exist in the starter repo; clicking most cards hit a hard "not found" — fixed by gracefully falling back to search summary data if full detail JSON is missing
11. **TikTok/Instagram avatar timeouts** — direct CDN URLs in detail JSON expire or block external requests — fixed by overriding with reliable proxy URLs from the search JSON
12. **Lost tab state on back navigation** — clicking "Back to search" reset the dashboard to Instagram — fixed by syncing the active platform state with URL query parameters (`/?platform=tiktok`)

### Features implemented
- **Shortlist ("Add to List")** — toggle button on both `ProfileCard` and `ProfileDetailPage`
- **Duplicate prevention** — guarded by `user_id` check in `addToShortlist`
- **Shortlist sidebar** — persistent right-side panel with per-item remove and clear all
- **Mobile shortlist** — floating FAB button + slide-up bottom drawer (sidebar hidden on mobile)
- **localStorage persistence** — via Zustand `persist` middleware (`wobb-shortlist` key)

### Architecture changes
- **State**: replaced React Context with Zustand store (`src/store/useShortlistStore.ts`)
- **Folder structure**: reorganised into `layout/`, `profile/`, `shortlist/`, `ui/` component groups
- **Extracted `ProfileStats`** into its own reusable component
- **Extracted `ShortlistToggleButton`** as isolated sub-component with granular Zustand selector
- **Consolidated** 3 duplicate `formatFollowers` implementations into one util in `formatters.ts`
- **Added constants** `FOLLOWERS_MILLION` / `FOLLOWERS_THOUSAND` to `formatters.ts`

### UI/UX redesign
- Adopted **Brillance design language**: warm off-white `#f7f5f3` background, deep brown `#37322f` text, `#aa3bff` accent
- Two-column desktop layout with sticky shortlist sidebar (`#fbfaf9`)
- Pill-style platform filter, styled search input with focus ring
- Profile cards with chip stats, avatar ring on shortlisted state
- Profile detail: header card, platform chip, stats grid

### Accessibility
- `aria-label` on all icon-only buttons (remove, add/remove from shortlist, close drawer)
- `aria-pressed` on shortlist toggle buttons
- `aria-modal` / `role="dialog"` on mobile drawer
- `loading="lazy"` on all avatar images

---

## Libraries added
- `zustand` — state management with localStorage persistence
- `lucide-react` — icon system
- `@vercel/analytics` — page view and route analytics via Vercel

### Testing
- `vitest` — test runner (Vite-native, zero config)
- `@testing-library/react` — hook testing for Zustand store
- 14 unit tests across formatters, dataHelpers, and useShortlistStore
- Run with: `npm run test`

## Libraries removed
- `react-beautiful-dnd` — was in `dependencies` but never used; also incompatible with React 19

---

## Assumptions
- Platform is inferred from the URL query param (`?platform=instagram`), not stored in profile JSON
- Shortlist is global across platforms (not scoped per platform tab)
- "Add to List" = local shortlist / campaign list, not server-side persistence
- YouTube entries without a `username` field use `handle` or `fullname` as fallback

## Trade-offs
- No debounce on search input — data is static JSON so filtering is effectively instant; debounce adds complexity without measurable benefit at this data scale
- No React Query / SWR — all data is local static JSON, a fetching layer would be overkill
- No drag-to-reorder in shortlist panel — deferred given scope constraints

## If I had more time
- Search input debouncing for larger datasets
- Pagination / virtual list for 100+ results per platform
- Drag-to-reorder in shortlist panel
- Keyboard navigation for the platform filter
