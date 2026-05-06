# Research: User Roles, Invitations, and UI Overhaul

## Decision 1: Animated Mesh Gradient Background
- **Decision**: Implement a pure CSS animated background using radial gradients and keyframe animations.
- **Rationale**: CSS gradients are lightweight, performant, and don't require external image assets or heavy JS libraries (like Three.js), aligning with "UX/UI Integrity" while maintaining high visual quality.
- **Implementation**:
  - Use 3-4 moving radial gradients with different colors (Primary, Secondary, Accent).
  - Apply `filter: blur(100px)` for the mesh effect.
  - Animation loop of 20-30s for a slow, premium feel.

## Decision 2: Invitation Token Logic
- **Decision**: Use UUID4 for tokens and store them in the database with a mandatory `expires_at` timestamp.
- **Rationale**: UUIDs provide enough entropy to prevent guessing. Database storage allows for easy invalidation (marking `is_used` or deleting) and role mapping.
- **Alternatives considered**: 
  - JWT for invitation: Rejected because we need to be able to revoke a link if an admin makes a mistake, which is harder with stateless JWTs without a blacklist.

## Decision 3: Role-Based Component Visibility (Frontend)
- **Decision**: Centralize role checking in a `useRole` hook or helper and wrap restricted components (like the "Import" buttons in Knowledge Base) in a conditional renderer.
- **Rationale**: Ensures consistency across the app and makes it easier to update permissions later if the constitution changes.

## Decision 4: API Route Guarding (Backend)
- **Decision**: Enhance the `check_role` dependency in `backend/main.py` to support multi-role validation and hierarchy checks.
- **Rationale**: DRY principle. Centralized security logic reduces the risk of accidental exposure.
