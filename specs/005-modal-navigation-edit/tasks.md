# Tasks: Modal Navigation and Content Editing

**Input**: Design documents from `/specs/005-modal-navigation-edit/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Project initialization and basic structure

- [x] T001 Update `KnowledgeBaseManager.jsx` component to include initial state placeholders for maximized view navigation and editing.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 [P] Add `isEditingMaximized` (boolean) and `maximizedForm` (object) states to `frontend/src/components/KnowledgeBaseManager.jsx`.
- [x] T003 [P] Implement `handleNextItem` and `handlePrevItem` functions in `frontend/src/components/KnowledgeBaseManager.jsx`. Use `filteredItems.findIndex()` to dynamically determine position and prevent stale indexing.
- [x] T004 [P] Implement `handleUpdateMaximized` function to call `api.put("/knowledge-items/{item_id}", ...)` using the `metadata_val` field in `frontend/src/components/KnowledgeBaseManager.jsx`.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Item Navigation (Priority: P1) 🎯 MVP

**Goal**: Navigate between items in the modal using arrows and keyboard.

**Independent Test**: Open modal, click arrows or use keyboard arrows to change items.

### Implementation for User Story 1

- [x] T005 [US1] Add side-positioned navigation arrows (ChevronLeft/Right) to the maximized modal UI in `frontend/src/components/KnowledgeBaseManager.jsx`.
- [x] T006 [US1] Implement `useEffect` for keyboard `keydown` listener to trigger navigation in `frontend/src/components/KnowledgeBaseManager.jsx`.
- [x] T007 [US1] Add logic to disable/hide navigation arrows when at the start or end of the `filteredItems` list in `frontend/src/components/KnowledgeBaseManager.jsx`.

**Checkpoint**: Item navigation is functional independently of editing.

---

## Phase 4: User Story 2 - Content Editing (Priority: P1)

**Goal**: Edit question, answer, and metadata directly in the modal.

**Independent Test**: Click "Editar", modify fields, and click "Cancelar" to see changes discarded.

### Implementation for User Story 2

- [x] T008 [US2] Add "Editar" and "Cancelar" buttons to the maximized modal footer in `frontend/src/components/KnowledgeBaseManager.jsx`.
- [x] T009 [US2] Implement conditional rendering to swap text displays for input/textarea fields (including `metadata_val` as a plain text/JSON editor) when `isEditingMaximized` is true in `frontend/src/components/KnowledgeBaseManager.jsx`.
- [x] T010 [US2] Add logic to disable navigation (arrows and keyboard) while `isEditingMaximized` is true in `frontend/src/components/KnowledgeBaseManager.jsx`.

**Checkpoint**: Edit mode is functional UI-wise, but not yet persistent.

---

## Phase 5: User Story 3 - Update Persistence (Priority: P1)

**Goal**: Save edits to the database.

**Independent Test**: Edit an item, click "Atualizar", and verify the change is saved after modal re-opens.

### Implementation for User Story 3

- [x] T011 [US3] Add "Atualizar" button to the maximized modal footer (visible only in edit mode) in `frontend/src/components/KnowledgeBaseManager.jsx`. Ensure it sends `metadata_val` correctly.
- [x] T012 [US3] Connect "Atualizar" button to `handleUpdateMaximized` and ensure it handles loading states in `frontend/src/components/KnowledgeBaseManager.jsx`.
- [x] T013 [US3] Implement success/error toast notifications or inline messages after the update operation in `frontend/src/components/KnowledgeBaseManager.jsx`.

**Checkpoint**: Full end-to-end functionality (Navigation + Edit + Save).

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T014 [P] Refine CSS transitions and animations for modal field swaps and navigation in `frontend/src/components/KnowledgeBaseManager.jsx`.
- [x] T015 Run `quickstart.md` validation to ensure all scenarios pass.
- [x] T016 [P] Perform manual performance benchmarking to verify SC-001 (Navigation < 10s) and SC-002 (Update < 15s) in `frontend/src/components/KnowledgeBaseManager.jsx`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Phase 2.
- **User Story 2 (P2)**: Independent after Phase 2 (Edit UI only).
- **User Story 3 (P3)**: Depends on User Story 2 (Needs edit UI to trigger update).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete User Story 1 (Navigation).
3. **STOP and VALIDATE**: Verify navigation works correctly with keyboard and mouse.

### Incremental Delivery

1. Foundation ready.
2. Add Navigation (US1).
3. Add Edit UI (US2).
4. Add Persistence (US3).
5. Each increment adds value and is testable via `quickstart.md`.
