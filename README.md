# Shrimp Farm

Shrimp Monorepo backend (Rest API)

## Requirements

- Makefiles
- Docker
  - Configure File Sharing
- Docker-compose

## Run Project

### Configuration

- Backend (backend/.env)
  - Change .env variables (If you want):
    - `PORT=5000`
    - `MONGO_HOSTNAME=mongo`
    - `MONGO_DB=shrimp_farm`
    - `MONGO_PORT=27017`

### Docker

- To setup docker: `make up`
- To turn off docker: `make down`

## Containerization

- MongoDB running in port: 27017
- API (Express) running in port: 5000

### Endpoints

- Index: http://localhost:5000/
