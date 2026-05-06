# Implementation Plan: Enhanced User Roles, Permissions and Navigation Refactor

**Branch**: `006-user-roles-inbox-refactor` | **Date**: 2026-05-06 | **Spec**: [spec.md](file:///mnt/D_DADOS/02_OPERACIONAL/TRABALHOS_ATIVOS/ALL_WORKS/Aryaraj/API%20-%20FluxAI/Projeto/o.c.a.ia-aryaraj-alternativ-branch/specs/006-user-roles-inbox-refactor/spec.md)

## Summary

This feature implements a robust four-tier Role-Based Access Control (RBAC) system (SUPERADMIN, ADMIN, USUARIO_ADMIN, USUARIO), replaces manual user creation with a secure invitation link system (24h expiry), and refactors the sidebar to include a dedicated "Inbox/FAQ" section. It also includes a visual overhaul of the registration page to match the premium "FluxAI" aesthetic.

## Technical Context

**Language/Version**: Python 3.11, React 18+  
**Primary Dependencies**: FastAPI, SQLAlchemy (async), Pydantic v2, TaskIQ, Tailwind CSS  
**Storage**: PostgreSQL (pgvector)  
**Testing**: pytest  
**Target Platform**: Linux / Docker  
**Project Type**: Web Application (Monorepo)  
**Performance Goals**: <200ms API response for auth/management, seamless background animation on registration.  
**Constraints**: Single-tenant environment, strict role hierarchy, 24h token validity.  
**Scale/Scope**: 4 distinct roles, invitation system, sidebar refactor, knowledge base access restrictions.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Rationale |
|-----------|--------|-----------|
| I. Canonical Tech Stack | ✅ Pass | Using FastAPI, React, SQLAlchemy, and Tailwind CSS. |
| II. Service Layer | ✅ Pass | Logic for invitations and user management will reside in service layer. |
| III. Data Integrity | ✅ Pass | Audit logging will be implemented for all permission changes. |
| V. Security by Design | ✅ Pass | JWT-based auth, rigid role isolation, and time-limited tokens. |
| VI. Observability | ✅ Pass | Audit records for all user/invitation mutations. |
| VIII. UX/UI Integrity | ✅ Pass | Progress indicators for registrations and clear role-based UI visibility. |

## Project Structure

### Documentation (this feature)

```text
specs/006-user-roles-inbox-refactor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (to be generated)
```

### Source Code (repository root)

```text
backend/
├── main.py              # API Routes and Middleware
├── models.py            # Database Models
├── database.py          # Init and Migrations
├── services/
│   ├── auth_service.py  # (NEW) Invitation and Auth logic
│   └── audit_service.py # Existing audit logger
└── alembic/             # Migrations

frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Navigation refactor
│   │   ├── UserManagement.jsx# RBAC UI updates
│   │   ├── Register.jsx     # Visual overhaul
│   │   └── auth/            # Invitation modals
│   ├── constants/
│   │   └── auth.js          # Role definitions
│   └── api/
│       └── client.js        # API requests
```

**Structure Decision**: Web Application (Monorepo) as per Principle I.

## Complexity Tracking

> **No violations identified.**
