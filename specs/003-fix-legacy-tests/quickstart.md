# Quickstart: Running Automated Tests in FluxAI

## Prerequisites
- Docker and Docker Compose installed.
- Local infrastructure running via `docker compose -f infra/docker-compose-local.yml up -d`.

## Backend Tests (Pytest)
To run backend tests inside the container:
```bash
docker exec -it fluxai-backend-1 pytest backend/tests
```

## Frontend Tests (Vitest)
To run frontend tests inside the container:
```bash
docker exec -it fluxai-frontend-1 npm run test
```

## Environment Variables
The tests expect the following defaults (configured in `.env` or `conftest.py`/`setup.js`):
- `DATABASE_URL`: `postgresql+asyncpg://postgres:postgres@db:5433/ai_agent_db`
- `API_URL`: `http://backend:8002`
- `FRONTEND_PORT`: `5300`
