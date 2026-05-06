# Implementation Plan: Enhanced User Roles, Permissions and Navigation Refactor

**Branch**: `006-user-roles-inbox-refactor` | **Date**: 2026-05-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/006-user-roles-inbox-refactor/spec.md`

## Summary

This feature implements a robust four-tier role-based access control (RBAC) system (Superadmin, Admin, Usuario Admin, Usuario) to distinguish between internal maintenance teams and external clients. It also streamlines navigation by moving the "Inbox" (FAQ) to the sidebar and replaces manual user creation with a secure 24-hour invitation link system.

## Technical Context

**Language/Version**: Python 3.11 (Backend), Node.js (Frontend)
**Primary Dependencies**: FastAPI, SQLAlchemy, TaskIQ, RabbitMQ, Vite, React
**Storage**: PostgreSQL + pgvector
**Testing**: pytest (Backend), Vitest/Playwright (Frontend)
**Target Platform**: Linux (Docker/On-premise)
**Project Type**: Web Service + Single Page Application
**Performance Goals**: < 200ms API response time, invitation links invalidated within 1 minute of expiry.
**Constraints**: Single-tenant deployment (on-premise server), rigid role isolation.
**Scale/Scope**: Support for multiple users within a single organization, management of agent configuration and knowledge base.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Notes |
|------|--------|-------|
| Role-Based Access | PASS | Four distinct roles defined with clear isolation. |
| Auditability | PASS | Plan includes tracking user actions and modifications. |
| Secret Management | PASS | Initial Superadmin and other keys handled via `.env`. |
| UX/UI Integrity | PASS | Moving Inbox to sidebar improves visibility; real-time invite validation. |

## Project Structure

### Documentation (this feature)

```text
specs/006-user-roles-inbox-refactor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (not created by plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/          # Update User and Invitation models
│   ├── services/        # Update Auth and User management logic
│   └── api/             # New endpoints for invitations and restricted agent toggle
└── tests/

frontend/
├── src/
│   ├── components/      # Sidebar and Navigation updates
│   ├── pages/           # New User Management and Invitation Registration pages
│   └── services/        # API integration for new roles
└── tests/
```

**Structure Decision**: Option 2: Web application (backend + frontend).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
