# Tasks: Enhanced User Roles, Permissions and Navigation Refactor

## Feature: 006-user-roles-inbox-refactor

### Phase 1: Setup & Foundational
Goal: Prepare the database schema and shared infrastructure.

- [x] T001 Create migration for the `invitations` table in `backend/alembic/versions/`
- [x] T002 Implement `InvitationModel` in `backend/models.py`
- [x] T003 [P] Add `UserRole` enum values (SUPERADMIN, ADMIN, USUARIO_ADMIN, USUARIO) to `backend/models.py` if not present
- [ ] T004 Create `AuthService` for invitation logic in `backend/services/auth_service.py`

### Phase 2: User Story 1 - Multi-tier Role Hierarchy (P1)
Goal: Establish strict role-based access control and management rules.

- [ ] T005 [US1] Update `get_current_user` dependency in `backend/main.py` to handle the new roles
- [ ] T006 [P] [US1] Implement `PATCH /users/{user_id}/role` endpoint for Superadmin promotion/demotion in `backend/main.py`
- [ ] T007 [US1] Add logic-level validation to prevent deleting the last Superadmin in `backend/main.py`
- [ ] T008 [US1] Update `USER_ROLES` constant in `frontend/src/constants/auth.js`
- [ ] T009 [P] [US1] Update role-based filtering in `frontend/src/components/UserManagement.jsx`

### Phase 3: User Story 2 - Restricted Agent & Database Access (P1)
Goal: Isolate agent configuration and knowledge base actions by role.

- [ ] T010 [US2] Update `check_role` middleware in `backend/main.py` to enforce hierarchical permissions
- [ ] T011 [P] [US2] Hide "Edit Prompt" and "Save Changes" for non-Team roles in `frontend/src/components/ConfigPanel.jsx`
- [ ] T012 [US2] Restrict Agent activation/deactivation toggle to Team roles and USUARIO_ADMIN in `frontend/src/components/ConfigPanel.jsx`
- [ ] T013 [P] [US2] Implement conditional rendering for "Add New Knowledge" modal in `frontend/src/components/KnowledgeBaseManager.jsx`
- [ ] T014 [US2] Hide advanced import/API buttons for Client roles in `frontend/src/components/KnowledgeBaseManager.jsx`

### Phase 4: User Story 3 - Invitation-based Registration (P2)
Goal: Replace manual user creation with secure, time-limited tokens.

- [ ] T015 [US3] Implement `POST /invitations` endpoint in `backend/main.py`
- [ ] T016 [US3] Implement `GET /invitations/{token}` validation endpoint in `backend/main.py`
- [ ] T017 [US3] Implement `POST /register` endpoint in `backend/main.py`
- [ ] T018 [P] [US3] Create `InvitationModal.jsx` for generating links in `frontend/src/components/auth/InvitationModal.jsx`
- [ ] T019 [US3] Update `UserManagement.jsx` to use the Invitation system instead of manual forms in `frontend/src/components/UserManagement.jsx`

### Phase 5: User Story 4 - Sidebar Navigation Refactor (P2)
Goal: Move Inbox to sidebar and reorganize navigation for better accessibility.

- [ ] T020 [US4] Remove "Inbox/FAQ" tab from `frontend/src/components/KnowledgeBaseManager.jsx`
- [ ] T021 [P] [US4] Add "Inbox / FAQ" item to `frontend/src/components/Sidebar.jsx`
- [ ] T022 [US4] Create/Update `InboxView.jsx` for the new standalone route in `frontend/src/components/UnansweredQuestions.jsx`
- [ ] T023 [P] [US4] Configure new route `/inbox` in `frontend/src/App.jsx`

### Phase 6: Polish & Cross-Cutting Concerns
Goal: Final visual refinements and security auditing.

- [ ] T024 Overhaul visual design of `Register.jsx` with animated mesh gradient background in `frontend/src/components/Register.jsx`
- [ ] T025 Ensure all sensitive permission changes are logged via `AuditLogger` in `backend/main.py`
- [ ] T026 Final manual verification of the "24h link expiry" logic.

## Dependencies
US1 (Roles) must be completed before US2 (Access Restrictions) and US3 (Registration) to ensure correct role assignment and enforcement.

## Parallel Execution
- T003 (Roles) and T004 (Service) can start immediately.
- Frontend UI updates (T011, T013, T018) can proceed in parallel once constants are defined.
