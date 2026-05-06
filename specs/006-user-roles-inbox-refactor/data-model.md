# Data Model: User Roles and Invitations

## Entities

### User
Represents a person with access to the system.

- **id**: `UUID` (Primary Key)
- **email**: `String` (Unique, Indexed)
- **hashed_password**: `String`
- **full_name**: `String`
- **role**: `Enum` (`SUPERADMIN`, `ADMIN`, `USUARIO_ADMIN`, `USUARIO`)
- **is_active**: `Boolean` (Default: `True`)
- **created_at**: `DateTime`
- **updated_at**: `DateTime`

### Invitation
Represents a pending registration for a new user.

- **id**: `UUID` (Primary Key)
- **token**: `String` (Unique, Cryptographically secure)
- **target_role**: `Enum` (`ADMIN`, `USUARIO_ADMIN`, `USUARIO`)
- **created_by_id**: `UUID` (Foreign Key -> `User.id`)
- **created_at**: `DateTime`
- **expires_at**: `DateTime` (Created + 24 hours)
- **used_at**: `DateTime` (Nullable)
- **is_revoked**: `Boolean` (Default: `False`)

## Relationships

- A **User** (Superadmin/Admin/Usuario Admin) can create many **Invitations**.
- An **Invitation** results in the creation of exactly one **User** upon success.

## Validation Rules

1. **Hierarchy Check**:
   - `SUPERADMIN` can create invitations for any role except `SUPERADMIN` (only another `SUPERADMIN` can grant this status to an existing `ADMIN`).
   - `ADMIN` can create invitations for `USUARIO_ADMIN` and `USUARIO`.
   - `USUARIO_ADMIN` can create invitations for `USUARIO` only.
2. **Token Validity**:
   - Token must exist in the database.
   - `used_at` must be null.
   - `is_revoked` must be false.
   - `now()` must be before `expires_at`.
3. **Role Restriction**:
   - Registration via token must assign exactly the `target_role` stored in the `Invitation` entity.
