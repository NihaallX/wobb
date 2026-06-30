# Wobb Influencer Search

## What I changed
- Replaced React Context (not implemented in starter) with Zustand for shortlist state with localStorage persistence
- Fixed 6 bugs: engagement rate math, engagements display, case-sensitive search, stale closure, hardcoded width, DOM data leak
- Redesigned UI: two-column layout, sticky shortlist sidebar, platform icon tabs, proper card design
- Split PlatformFilter into PlatformFilter + SearchBar components
- Consolidated duplicate formatFollowers utility functions
- Refactored folder structure into layout/profile/shortlist/ui component groups
- Added React.memo, useMemo, useCallback where appropriate

## Libraries added
- zustand — state management + localStorage persistence
- lucide-react — icons

## Libraries removed
- react-beautiful-dnd — was in dependencies but unused; also incompatible with React 19

## Assumptions
- Profile detail page platform is inferred from URL query param (?platform=instagram), not stored in profile JSON
- Shortlist is global across platform tabs (not per-platform)
- "Add to List" means shortlist/campaign list — not a server-side save

## Trade-offs
- No server state / data fetching layer (React Query etc.) — data is static JSON, overkill for this scope
- Animations kept minimal — focus was correctness and code quality over motion design

## Remaining improvements (given more time)
- Add search debouncing (currently filters on every keystroke)
- Infinite scroll or pagination for large result sets
- Unit tests for utils and store
- Drag-to-reorder in shortlist panel
