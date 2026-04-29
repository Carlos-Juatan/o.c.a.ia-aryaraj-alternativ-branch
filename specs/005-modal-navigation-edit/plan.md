# Implementation Plan: Modal Navigation and Content Editing

**Branch**: `005-modal-navigation-edit` | **Date**: 2026-04-29 | **Spec**: [spec.md](file:///mnt/D_DADOS/02_OPERACIONAL/TRABALHOS_ATIVOS/ALL_WORKS/Aryaraj/API%20-%20FluxAI/Projeto/o.c.a.ia-aryaraj-alternativ-branch/specs/005-modal-navigation-edit/spec.md)
**Input**: Feature specification from `/specs/005-modal-navigation-edit/spec.md`

## Summary
Refactor the KnowledgeBaseManager's detail modal (Maximized view) to support sequential navigation between items and full content editing. This includes adding UI navigation controls, keyboard listeners, and a toggleable edit mode for all fields (Question, Answer, Metadata, Category).

## Technical Context

**Language/Version**: React 19 (Frontend), Python 3.11/FastAPI (Backend)
**Primary Dependencies**: `styled-components`, `lucide-react` (icons), `FastAPI`, `SQLAlchemy`
**Storage**: PostgreSQL + pgvector
**Testing**: Vitest (Frontend), Pytest (Backend)
**Target Platform**: Linux server (Docker)
**Project Type**: Web Application
**Performance Goals**: Navigation < 200ms, Save < 2s
**Constraints**: On-premise, Row-level multi-tenancy

### Technical Exceptions
- **UI Framework**: Although the Constitution (Principle I) mandates Tailwind CSS + shadcn/ui, this feature modifies `KnowledgeBaseManager.jsx`, which is already heavily implemented using `styled-components`. To maintain local consistency and avoid a full component rewrite, `styled-components` will be used for new UI elements within this file.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **UX/UI Integrity**: Background monitoring for updates (Success/Error notifications).
- [x] **Security**: Uses existing authenticated API client (`../api/client`).
- [x] **Observability**: Definition of Done includes manual smoke test and automated tests.

## Project Structure

### Documentation (this feature)

```text
specs/005-modal-navigation-edit/
├── plan.md              # This file
├── research.md          # Navigation logic and persistence research
├── data-model.md        # No changes required
├── quickstart.md        # Feature testing guide
├── contracts/           # Existing API contracts reused
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
frontend/
└── src/
    └── components/
        └── KnowledgeBaseManager.jsx  # Main component to modify

backend/
└── main.py                           # Verify/test existing endpoints
```

**Structure Decision**: Single component modification in `KnowledgeBaseManager.jsx` with potential style updates.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | Feature is purely additive | N/A |

## Phase 0: Outline & Research

- [x] Research navigation logic using `filteredItems` and `originalIndex`.
- [x] Research keyboard event listeners in React portals.
- [x] Research single-item update API endpoint.

**Output**: [research.md](file:///mnt/D_DADOS/02_OPERACIONAL/TRABALHOS_ATIVOS/ALL_WORKS/Aryaraj/API%20-%20FluxAI/Projeto/o.c.a.ia-aryaraj-alternativ-branch/specs/005-modal-navigation-edit/research.md)

## Phase 1: Design & Contracts

1. **Frontend Design**:
   - Add `isEditingMaximized` state to `KnowledgeBaseManager`.
   - Add `maximizedForm` state to hold temporary edits.
   - Design navigation buttons (ChevronLeft, ChevronRight) positioned on the sides of the modal.
   - Design "Edit", "Update", and "Cancel" buttons in the modal footer.
   - Implement field toggle logic (Display vs. Input/Textarea).

2. **Agent Context Update**:
   - Run `.specify/scripts/bash/update-agent-context.sh agy`

**Output**: `quickstart.md`, updated `KnowledgeBaseManager.jsx` logic.
