# Data Model: User Roles and Invitations

## User (Existing Entity Updated)
- `id`: Integer (PK)
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum (SUPERADMIN, ADMIN, USUARIO_ADMIN, USUARIO)
- `status`: String (ATIVO, INATIVO)
- `created_at`: DateTime
- `updated_at`: DateTime

## InvitationLink (New Entity)
- `id`: Integer (PK)
- `token`: UUID (Unique, Index)
- `target_role`: String (Role to be granted upon registration)
- `created_by_id`: Integer (FK to User)
- `created_at`: DateTime (Default now)
- `expires_at`: DateTime (Default now + 24h)
- `used_at`: DateTime (Nullable)
- `is_revoked`: Boolean (Default false)

## AuditLog (Existing Entity)
- `id`: Integer (PK)
- `user_id`: Integer (FK to User, Nullable for registration)
- `action`: String (e.g., "CREATE_INVITATION", "REGISTER_USER", "UPDATE_ROLE")
- `details`: JSON (Before/After values)
- `timestamp`: DateTime
