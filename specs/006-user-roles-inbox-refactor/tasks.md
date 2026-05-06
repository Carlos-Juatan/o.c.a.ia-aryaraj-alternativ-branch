---
description: "Task list for the Enhanced User Roles, Permissions and Navigation Refactor feature"
---

# Tasks: Enhanced User Roles, Permissions and Navigation Refactor

**Input**: Design documents from `/specs/006-user-roles-inbox-refactor/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-schema.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and global configuration.

- [ ] T001 Update `backend/core/config.py` to include `INITIAL_SUPERADMIN_EMAIL` and `INITIAL_SUPERADMIN_PASSWORD`
- [ ] T002 [P] Create `frontend/src/constants/roles.js` with matching role strings

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [ ] T003 Define role constants and create Alembic migration to update `users.role` check constraint in `backend/models/user.py` and `backend/alembic/versions/`
- [ ] T004 Create `InvitationLinkModel` and migration for `invitation_links` table in `backend/models/invitation.py`
- [ ] T005 [P] Implement `RoleChecker` dependency in `backend/api/dependencies.py`
- [ ] T006 Implement basic `invitation_service.py` skeleton in `backend/services/invitation_service.py`
- [ ] T007 [P] Create `frontend/src/hooks/useRole.js` for centralized role checks

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Multi-tier Role Hierarchy (Priority: P1) 🎯 MVP

**Goal**: Implement the 4-tier role system and role management logic.

**Independent Test**: Log in as each role and verify that specific management buttons/actions are only available to authorized roles (e.g., Superadmin can see Promote button, Admin cannot).

### Implementation for User Story 1

- [ ] T008 [P] [US1] Update `UserModel` to support new roles in `backend/models/user.py`
- [ ] T009 [US1] Implement role management logic (promote/revoke) in `backend/services/user_service.py`
- [ ] T010 [US1] Add logic-level validation to ensure at least one Superadmin remains (SC-004) in `backend/services/user_service.py`
- [ ] T011 [US1] Create toggle-superadmin endpoint in `backend/api/routes/users.py`
- [ ] T012 [P] [US1] Refactor `frontend/src/components/UserList.jsx` to remove "Editar" button
- [ ] T013 [US1] Implement "Promover" and "Revogar" buttons in `frontend/src/components/UserList.jsx` for Superadmins only
- [ ] T014 [US1] Secure user management endpoints using `RoleChecker` in `backend/api/routes/users.py`

**Checkpoint**: User Story 1 (Role Hierarchy) functional and testable.

---

## Phase 4: User Story 2 - Restricted Agent & Database Access (Priority: P1)

**Goal**: Isolate configuration and data modification from client roles.

**Independent Test**: Log in as `USUARIO` and verify that the "Meus Agentes" tab bar is hidden and Database "Edit/Add" buttons are gone.

### Implementation for User Story 2

- [ ] T015 [P] [US2] Refactor `frontend/src/components/AgentTabs.jsx` to conditionally render based on role
- [ ] T016 [US2] Implement tab bar hiding logic in `frontend/src/pages/AgentsPage.jsx` when only one tab is available
- [ ] T017 [P] [US2] Hide advanced DB import/add buttons in `frontend/src/components/DatabaseManager.jsx` for client roles
- [ ] T018 [US2] Add backend checks for agent modification to block `USUARIO_ADMIN` and `USUARIO` in `backend/api/routes/agents.py`
- [ ] T019 [US2] Ensure only "Adicionar Novo" modal is accessible for `USUARIO_ADMIN` in `frontend/src/components/DatabaseManager.jsx`

**Checkpoint**: User Story 2 (Restricted Access) functional.

---

## Phase 5: User Story 4 - Sidebar Navigation Refactor (Priority: P2)

**Goal**: Move Inbox from Database tabs to Sidebar.

**Independent Test**: Verify "Inbox" icon in sidebar and absence of "Inbox" tab in Base de Conhecimento screen.

### Implementation for User Story 4

- [ ] T020 [P] [US4] Remove "Inbox" tab from `frontend/src/components/DatabaseManager.jsx`
- [ ] T021 [US4] Add "Inbox" navigation item to `frontend/src/components/Sidebar.jsx`
- [ ] T022 [US4] Create standalone `frontend/src/pages/InboxPage.jsx` (reusing existing Inbox component)
- [ ] T023 [P] [US4] Update sidebar icons and labels for consistency

**Checkpoint**: User Story 4 (Sidebar Navigation) functional.

---

## Phase 6: User Story 3 - Invitation-based Registration (Priority: P2)

**Goal**: Replace manual user creation with time-limited invitation links.

**Independent Test**: Generate a link as Admin, wait for expiry/use it, and verify link invalidation.

### Implementation for User Story 3

- [ ] T024 [US3] Implement link generation and token validation in `backend/services/auth_service.py`
- [ ] T025 [US3] Create `/api/auth/invite` and `/api/auth/validate-token` endpoints in `backend/api/routes/auth.py`
- [ ] T026 [P] [US3] Create `frontend/src/pages/Register.jsx` for registration via token
- [ ] T027 [US3] Implement registration logic (creating user and marking token as used) in `backend/api/routes/auth.py`
- [ ] T028 [US3] Update "Adicionar Usuário" button in `frontend/src/components/UserList.jsx` to generate/show link instead of opening a form

**Checkpoint**: User Story 3 (Invitation Flow) functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and verification.

- [ ] T029 Implement animated mesh/gradient background for `frontend/src/pages/Register.jsx`
- [ ] T030 [P] Audit logging for all role promotion/demotion actions in `backend/services/user_service.py`
- [ ] T031 Run `quickstart.md` validation scenarios
- [ ] T032 Final UI review for role-based button visibility (Logout/Login as different users)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup (T001-T003).
- **User Stories (Phase 3-6)**: All depend on Foundational (Phase 2) completion.
- **Polish (Phase 7)**: Depends on all user stories.

### Parallel Opportunities

- T012 [P] and T015 [P] can be worked on concurrently as they touch different frontend components.
- T009 [P] and T026 [P] can be developed independently.
- Once Phase 2 is done, US4 can be implemented in parallel with US1/US2 as it is mostly a UI repositioning task.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup + Foundational.
2. Implement Role Hierarchy (US1) - This enables internal testing of roles.
3. Implement Restricted Access (US2) - Completes the security boundary for roles.

### Incremental Delivery

1. Foundation -> Roles & Management (US1) -> Restricted UI (US2) -> Navigation UX (US4) -> Invitation System (US3) -> Polish.
