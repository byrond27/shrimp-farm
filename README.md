# Shrimp Farm

![CI Develop](https://github.com/byrond27/shrimp-farm/workflows/CI/badge.svg?branch=develop)

Shrimp Monorepo backend (Rest API) and Frontend

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

- Frontend
  - Change proxy in package.json (now is working with docker)
    - `"proxy": "http://myapp-node-express:5000"`

### Docker

- To setup docker: `make up`
- To turn off docker: `make down`

## Containerization

- MongoDB running in port: 27017
- API (Express) running in port: 5000

## Endpoints

### API

- Index: http://localhost:5000/
- Farm (GET,POST, PUT, DELETE)
  - http://localhost:5000/api/farms
- Pond (GET,POST, PUT, DELETE)
  - http://localhost:5000/api/ponds

### Front

- Index: http://localhost:300/
- Farms: http://localhost:3000/farms
- Ponds: http://localhost:3000/ponds
