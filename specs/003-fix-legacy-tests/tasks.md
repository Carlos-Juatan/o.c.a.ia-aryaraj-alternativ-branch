# Tasks: Fix Legacy Automated Tests

**Input**: Design documents from `/specs/003-fix-legacy-tests/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify Docker local environment and connectivity (ensure RabbitMQ and Postgres are up)
- [ ] T002 [P] Check if root `.env` has the correct `DATABASE_URL` and `API_PORT` (8002, 5300, 5433)
- [ ] T003 [P] Verify if `backend/tests/pytest.ini` exists and supports async-mode auto

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T004 Standardize ports in `infra/docker-compose-local.yml` (Confirm 8002, 5300, 5433 are mapping correctly; verify if a separate `docker-compose-test.yml` is needed for environment isolation)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Backend Test Stabilization (Priority: P1) 🎯 MVP

**Goal**: Restore backend test suite functionality by updating ports and TaskIQ patterns.

**Independent Test**: `docker exec -it fluxai-backend-1 pytest backend/tests` passes 100%.

### Implementation for User Story 1

- [ ] T005 [US1] Update `DATABASE_URL` in `backend/tests/conftest.py` to point to port 5433
- [ ] T006 [P] [US1] Remove legacy Celery `.delay()` mocks in `backend/tests/test_background_tasks.py`
- [ ] T007 [US1] Implement TaskIQ `.kiq()` mocks in `backend/tests/test_background_tasks.py` using `unittest.mock`
- [ ] T008 [P] [US1] Fix broken imports in `backend/tests/` (e.g., update `from main import app` and service layer references)
- [ ] T009 [US1] Fix `BackgroundProcessLog` status assertions to match current `models.py` state

**Checkpoint**: Backend tests are now functional in the current environment.

---

## Phase 4: User Story 2 - Frontend Test Stabilization (Priority: P1)

**Goal**: Restore frontend test suite functionality by updating ports in setup and component mocks.

**Independent Test**: `docker exec -it fluxai-frontend-1 npm run test` passes 100%.

### Implementation for User Story 2

- [ ] T010 [US2] Update `window.location` and `origin` to `localhost:5300` in `frontend/src/test/setup.js`
- [ ] T011 [P] [US2] Update mocked `API_URL` to `http://localhost:8002` in `frontend/src/test/components/Login.test.jsx`
- [ ] T012 [P] [US2] Update mocked `API_URL` to `http://localhost:8002` in `frontend/src/test/components/Dashboard.test.jsx`
- [ ] T013 [P] [US2] Update mocked `API_URL` to `http://localhost:8002` in `frontend/src/test/components/KnowledgeBaseManager.test.jsx`
- [ ] T014 [US2] Ensure `vitest` configuration points to the correct `setup.js` in `frontend/package.json` or `vite.config.js`

**Checkpoint**: Frontend tests are now functional and pointing to the correct API ports.

---

## Phase 5: User Story 3 - Infrastructure Consistency & Compatibility (Priority: P2)

**Goal**: Ensure no legacy migration ports remain and validate biological compatibility with new systems.

**Independent Test**: `grep -r "8000" backend/tests frontend/src/test` returns no active config hits.

### Implementation for User Story 3

- [ ] T015 [US3] Perform global search and replace for legacy ports (`8000`, `5173`, `5432`) across ALL test files (consolidation of port checks)
- [ ] T016 [US3] Validate that `process_video_task` tests in `backend/tests/test_background_tasks.py` use the current payload structure
- [ ] T017 [US3] Update `frontend/src/test/mocks/apiMock.js` to use port 8002

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T018 [P] Documentation updates in `quickstart.md` regarding test execution
- [ ] T019 Code cleanup in test files (remove commented out Celery/Migration code)
- [ ] T020 Run full regression test suite across both stacks to ensure zero regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on T001-T003.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - US1 and US2 can proceed in parallel.
- **Polish (Final Phase)**: Depends on Phase 3 and Phase 4 completion.

### Parallel Opportunities

- T002 and T003 can run in parallel.
- US1 (Phase 3) and US2 (Phase 4) can be worked on simultaneously by different developers.
- Within US1: T006 and T008 are parallelizable.
- Within US2: T011, T012, T013 are parallelizable.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (Backend Stabilization).
3. **STOP and VALIDATE**: Verify backend tests pass in Docker.

### Incremental Delivery

1. Foundation ready.
2. Backend fixed → Deployable quality signal.
3. Frontend fixed → Full UI/UX quality signal.
4. Consistency check → Technical debt reduction.
