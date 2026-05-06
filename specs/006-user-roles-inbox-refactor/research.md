# Research: Enhanced User Roles and Invitation System

## Decisions

### 1. RBAC Implementation
- **Decision**: Update the existing `User` model to include a `role` enum field: `SUPERADMIN`, `ADMIN`, `USUARIO_ADMIN`, `USUARIO`.
- **Rationale**: Direct enum-based roles are efficient for small, rigid hierarchies and integrate well with SQLAlchemy and FastAPI dependencies.
- **Alternatives considered**: Permission-based access (ACL). Rejected as too complex for the current requirements which are strictly hierarchical.

### 2. Invitation Link System
- **Decision**: DB-backed single-use tokens. A new `Invitation` entity will store a random UUID token, the target role, and an expiration timestamp.
- **Rationale**: Allows for easy invalidation (marking as used) and server-side tracking. Signed JWTs could work but would require a blacklist to be "single-use".
- **Alternatives considered**: Signed JWTs with no DB state. Rejected due to difficulty in revoking/marking as "used" once clicked.

### 3. Frontend Navigation Refactor
- **Decision**: React Context-based role management. Components like the sidebar will consume a `useAuth` hook to conditionally render items.
- **Rationale**: Centralizes logic and prevents "prop drilling" for permission checks.
- **Alternatives considered**: Route-level guards only. Rejected because sidebar and button-level visibility are also required.

### 4. Initial Superadmin Provisioning
- **Decision**: Backend startup script (Alembic or FastAPI `on_event("startup")`) will check for an existing Superadmin. If none exists, it creates one using `.env` variables `INITIAL_SUPERADMIN_EMAIL` and `INITIAL_SUPERADMIN_PASSWORD`.
- **Rationale**: Ensures the system is usable immediately after deployment on a new server.
- **Alternatives considered**: Manual DB entry via CLI. Rejected as less user-friendly for automated on-premise deployments.

## Best Practices

- **Token Security**: Use `secrets.token_urlsafe()` for invitation tokens to ensure cryptographic strength.
- **Bcrypt Hashing**: Ensure all passwords (including the initial one) are hashed using `bcrypt` before storage.
- **Atomic Deletions**: When a `USUARIO_ADMIN` deletes a `USUARIO`, ensure cascading deletions (if any) are handled to avoid orphaned data.
