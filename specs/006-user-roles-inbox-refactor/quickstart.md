# Quickstart: User Management and Sidebar Refactor

## Setup Environment

Ensure the following variables are set in your `.env` file:

```bash
INITIAL_SUPERADMIN_EMAIL=admin@empresa.com
INITIAL_SUPERADMIN_PASSWORD=mudar_senha_123
INVITATION_EXPIRY_HOURS=24
```

## Running Migrations

Apply the database changes:

```bash
cd backend
alembic upgrade head
```

## Creating an Invitation

1. Log in as a `SUPERADMIN`, `ADMIN`, or `USUARIO_ADMIN`.
2. Navigate to **Gerenciamento de Usuários** in the Sidebar.
3. Click **Gerar Link de Convite**.
4. Select the role for the new user (restricted by your own role).
5. Copy the generated link and send it to the new user.

## Registering via Invite

1. Open the invitation link in a browser.
2. The system validates the token and shows the registration form.
3. Fill in the name and password.
4. Upon submission, the account is created and the token is marked as used.

## Navigation Changes

- The **Inbox (Dúvidas)** is now located directly in the main Sidebar, below the Agent/Dashboard items.
- The **Banco de Dados** screen no longer contains the "Inbox" tab.
