# Quickstart: User Roles & Invitation Refactor

## Developer Setup
1. **Migrations**: Apply the new `invitations` table schema.
   ```bash
   cd backend
   alembic upgrade head
   ```
2. **Environment**: Ensure `INITIAL_SUPERADMIN_EMAIL` and `INITIAL_SUPERADMIN_PASSWORD` are set in your `.env`.
3. **Frontend**: The new registration page is available at `/register?token=<uuid>`.

## Feature Testing
1. Login as Superadmin.
2. Go to "Gestão de Usuários".
3. Click "Convidar Usuário".
4. Copy the generated link.
5. Open an Incognito window and access the link.
6. Complete registration and verify role assignment in the dashboard.

## RBAC Verification
- **Admin**: Verify you CANNOT see the "Reset System" button or other Admins.
- **Usuario Admin**: Verify you CANNOT see "Fine-tuning" or "Tools" in the sidebar.
- **Usuario**: Verify you CANNOT see "Activate/Deactivate" in the Agent screen.
