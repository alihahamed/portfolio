# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Feature Development – Interests Section`
- **Status:** `In Progress`
- **Last Updated:** `2026-06-02`

---

## Last Session Work

### Summary
Added "What I alt-tab to" interests section below skills in the Document component. Created `interests` array with same structure as `skills` (name, src, style, rotate) — sources left empty for user to fill with their interest icons. Section uses the same `DraggableSkill` component for consistent drag interaction and 3D tilt.

### Files Changed
| File                        | Change Type | Notes                                |
|-----------------------------|-------------|--------------------------------------|
| `components/Document.tsx`   | Modified    | Added interests array + UI section   |

---

## Decisions Made

| # | Decision                              | Rationale                                      | Date       |
|---|---------------------------------------|-------------------------------------------------|------------|
| 1 | Title: "What I alt-tab to"            | User chose this from brainstormed options       | 2026-06-02 |
| 2 | Reuse DraggableSkill for interests    | Same visual/interaction pattern as skills       | 2026-06-02 |
| 3 | Empty src in interests array          | User will add icons themselves                  | 2026-06-02 |

---

## Open Questions

| # | Question                                              | Priority | Owner |
|---|-------------------------------------------------------|----------|-------|
| 1 | Which interest icons to add?                          | High     | User  |
| 2 | Availability indicator still pending implementation?  | Medium   | User  |

---

## Notes

- Interests array has 6 slots with positions/rotations pre-set
- User needs to provide icon PNGs in `/public/` and fill in `src` values
