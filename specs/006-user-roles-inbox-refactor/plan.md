# Implementation Plan: Enhanced User Roles, Permissions and Navigation Refactor

**Branch**: `006-user-roles-inbox-refactor` | **Date**: 2026-05-06 | **Spec**: [/specs/006-user-roles-inbox-refactor/spec.md](file:///mnt/D_DADOS/02_OPERACIONAL/TRABALHOS_ATIVOS/ALL_WORKS/Aryaraj/API%20-%20FluxAI/Projeto/o.c.a.ia-aryaraj-alternativ-branch/specs/006-user-roles-inbox-refactor/spec.md)

**Input**: Refactoring the role system (Superadmin, Admin, Usuario Admin, Usuario), moving the Inbox to the sidebar, implementing invitation-based registration, and adding a "Global Context Variables" tab in the agents screen.

## Summary

The feature refactors the FluxAI platform to support a multi-tier hierarchy and client-facing roles. It introduces secure registration via invitation links, moves frequently used navigation items (Inbox) to the sidebar for better UX, and isolates system configuration (Global Variables) from client users via a new tabbed interface in the Agents screen.

## Technical Context

**Language/Version**: Python 3.11+, TypeScript (React 18+)  
**Primary Dependencies**: FastAPI, TaskIQ, RabbitMQ, Pydantic v2, Tailwind CSS, shadcn/ui  
**Storage**: PostgreSQL (SQLAlchemy + Alembic)  
**Testing**: pytest (Backend), Vitest/Playwright (Frontend)  
**Target Platform**: Linux (On-premise Docker deployment)
**Project Type**: Web Application (Monorepo)  
**Performance Goals**: <200ms API response time, invitation link generation <100ms  
**Constraints**: Single-tenant deployment, mandatory PII protection in logs  
**Scale/Scope**: Support for 4 distinct roles, ~10 screens/components updated

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Canonical Tech Stack**: PASS. Using FastAPI, React, Tailwind, TaskIQ, RabbitMQ.
- **II. Service Layer**: PASS. Logic will be in `auth_service.py` and `user_service.py`.
- **III. Data Integrity**: PASS. Using Alembic for role enum updates and new Invitation table. Audit logs required for role changes.
- **V. Security**: PASS. JWT-based auth, password hashing, rigid RBAC isolation.
- **VIII. UI Integrity**: PASS. Navigation refactor and tabbed interface focus on clarity.

## Project Structure

### Documentation (this feature)

```text
specs/006-user-roles-inbox-refactor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── alembic/
│   └── versions/        # Database migrations for roles and invitations
├── models/
│   ├── user.py          # Updated UserModel with 4 roles
│   └── invitation.py    # New InvitationLinkModel
├── services/
│   ├── auth_service.py  # Link validation and registration logic
│   └── user_service.py  # Role management and promotion logic
└── api/
    ├── routes/
    │   ├── auth.py      # Registration link endpoints
    │   └── users.py     # Refactored management endpoints
    └── dependencies.py  # Role-based dependency injections

frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx   # Moved Inbox item
│   │   ├── UserList.jsx  # Removed Edit button, added Promote/Revoke
│   │   └── AgentTabs.jsx # New tabs for Agents vs Globals
│   ├── hooks/
│   │   └── useRole.js    # Centralized permission check
│   └── pages/
│       └── Register.jsx  # New registration page with invitation check
└── tests/
```

**Structure Decision**: Web application (Monorepo) following the standard `backend/` and `frontend/` layout as mandated by the constitution.

## Complexity Tracking

*No violations identified.*
