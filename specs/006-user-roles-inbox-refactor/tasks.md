# Tasks: Enhanced User Roles, Permissions and Navigation Refactor

**Input**: Design documents from `/specs/006-user-roles-inbox-refactor/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base structure for roles.

- [ ] T001 Define Role Enum constants in `backend/src/models/user.py` (SUPERADMIN, ADMIN, USUARIO_ADMIN, USUARIO)
- [ ] T002 [P] Create Role types and constants in `frontend/src/types/auth.ts`
- [ ] T003 [P] Add environment variable placeholders for initial Superadmin in `.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T004 Create database migration for `User.role` update and new `Invitation` table in `backend/alembic/versions/`
- [ ] T005 Implement initial Superadmin provisioning logic in `backend/src/main.py` (startup event)
- [ ] T006 [P] Update JWT token payload to include `role` in `backend/src/services/auth_service.py`
- [ ] T007 [P] Create `RoleGuard` utility in `frontend/src/utils/guards.ts` for UI conditional rendering
- [ ] T008 [P] Implement `check_role` dependency/middleware in `backend/src/api/deps.py`
- [ ] T008.1 [P] Implement `AuditLogger` service to track system modifications in `backend/src/services/audit_service.py`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Multi-tier Role Hierarchy (Priority: P1) 🎯 MVP

**Goal**: Implement the distinction between Team roles and Client roles.

**Independent Test**: Verify that Superadmin can promote Admins and Admins can only manage Client accounts.

### Implementation for User Story 1

- [ ] T009 [P] [US1] Update `User` SQLAlchemy model to include `role` field in `backend/src/models/user.py`
- [ ] T010 [US1] Implement `GET /api/v1/users` filter to restrict view based on role in `backend/src/api/v1/endpoints/users.py`
- [ ] T011 [US1] Implement `PATCH /api/v1/users/{user_id}/role` promotion logic in `backend/src/api/v1/endpoints/users.py`
- [ ] T012 [US1] Add self-demotion protection check in user service `backend/src/services/user_service.py`
- [ ] T013 [P] [US1] Create User List management screen in `frontend/src/pages/admin/UserManagement.tsx`
- [ ] T014 [US1] Implement role-based row actions (Promote/Delete) in `frontend/src/components/users/UserTableRow.tsx`
- [ ] T014.1 [US1] Integrate `AuditLogger` to record role changes and user deletions in `backend/src/api/v1/endpoints/users.py`

**Checkpoint**: User Story 1 functional - Team and Client roles are isolated.

---

## Phase 4: User Story 2 - Restricted Agent & Database Access (Priority: P1)

**Goal**: Limit Agent and Database modification permissions for Client roles.

**Independent Test**: Log in as `USUARIO` and verify that "Add Knowledge" is disabled and Agent prompt is hidden.

### Implementation for User Story 2

- [ ] T015 [US1] Apply `RoleGuard` to Agent Configuration screen in `frontend/src/pages/agent/AgentConfig.tsx` to hide edit fields for Clients
- [ ] T016 [US2] Update `PATCH /api/v1/agent` endpoint to restrict modification to Team roles in `backend/src/api/v1/endpoints/agent.py`
- [ ] T017 [US2] Implement restricted Agent Toggle visibility (available to `USUARIO_ADMIN`, hidden for `USUARIO`) in `frontend/src/components/agent/AgentStatusToggle.tsx`
- [ ] T018 [US2] Update Database screen in `frontend/src/pages/database/Database.tsx` to hide bulk import options and RESTRICT the "✨ Adicionar Novo" button to open the specific modal for `USUARIO_ADMIN`
- [ ] T019 [US2] Hide "Edit" and "Delete" buttons for knowledge entries when user is `USUARIO` in `frontend/src/components/database/KnowledgeItem.tsx`
- [ ] T019.1 [US2] Integrate `AuditLogger` to track agent configuration changes in `backend/src/api/v1/endpoints/agent.py`

**Checkpoint**: User Story 2 functional - Client roles have restricted system modification access.

---

## Phase 5: User Story 3 - Invitation-based Registration (Priority: P2)

**Goal**: Replace manual user creation with time-limited invitation links.

**Independent Test**: Generate a link, use it to register, and verify the link is invalidated.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Create `Invitation` SQLAlchemy model in `backend/src/models/invitation.py`
- [ ] T021 [US3] Implement `POST /api/v1/invitations` endpoint to generate tokens in `backend/src/api/v1/endpoints/invitations.py`
- [ ] T022 [US3] Implement invitation link generation UI in `frontend/src/components/users/InviteUserModal.tsx`
- [ ] T023 [US3] Create public Registration page in `frontend/src/pages/auth/Register.tsx` (consumes token)
- [ ] T024 [US3] Implement `POST /api/v1/invitations/register` logic with token validation in `backend/src/api/v1/endpoints/auth.py`
- [ ] T025 [US3] Remove manual "Add User" form from all existing UI screens in `frontend/src/pages/admin/`
- [ ] T025.1 [US3] Integrate `AuditLogger` to track invitation generation and registration events in `backend/src/api/v1/endpoints/invitations.py`

**Checkpoint**: User Story 3 functional - Secure invitation system active.

---

## Phase 6: User Story 4 - Sidebar Navigation Refactor (Priority: P2)

**Goal**: Move Inbox to sidebar and clean up Database tabs.

**Independent Test**: Verify Inbox is accessible from Sidebar and tab is gone from Database screen.

### Implementation for User Story 4

- [ ] T026 [US4] Remove "Inbox" tab from Database screen in `frontend/src/pages/database/Database.tsx`
- [ ] T027 [US4] Add "Inbox" menu item to Sidebar configuration in `frontend/src/components/layout/Sidebar.tsx`
- [ ] T028 [US4] Implement role-based "Delete" permission for unanswered questions in `frontend/src/pages/inbox/Inbox.tsx`
- [ ] T029 [US4] Update `DELETE /api/v1/inbox/{id}` to restrict to Team roles for unanswered items in `backend/src/api/v1/endpoints/inbox.py`
- [ ] T029.1 [US4] Verify that `USUARIO` and `USUARIO_ADMIN` roles can still reply to questions (FR-011) in `frontend/src/pages/inbox/Inbox.tsx`

**Checkpoint**: User Story 4 functional - Navigation refactor complete.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation.

- [ ] T030 Update API documentation (OpenAPI/Swagger) with new role requirements
- [ ] T031 [P] Verify all success criteria from `spec.md`
- [ ] T032 Run `quickstart.md` validation on a clean instance
- [ ] T033 Code cleanup of deprecated "User" management logic

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 - **BLOCKS** all stories.
- **User Stories (Phase 3-6)**: All depend on Phase 2. US1 and US2 are P1 (highest priority).
- **Polish (Phase 7)**: Depends on all user stories.

### Parallel Opportunities

- T002 and T003 can run in parallel.
- T006, T007, T008 can run in parallel within Phase 2.
- Once Phase 2 is done, US1 (T009-T014) and US2 (T015-T019) can be worked on in parallel.

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 1 & 2.
2. Complete US1 (Hierarchy) and US2 (Restricted Access).
3. **Validate**: Team can manage system, Clients can only use it.

### Incremental Delivery

1. Foundation -> Roles & Access -> Invitations -> Navigation Refactor.
