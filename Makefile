.PHONY: 

up:
	@docker-compose up

up-detached:
	@docker-compose up -d

down:
	@docker-compose down

ping-mongo:
	@docker-compose exec -T backend ping mongo

build:
	@docker-compose build