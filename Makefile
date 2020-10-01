.PHONY: 

up:
	@docker-compose up

down:
	@docker-compose down

ping-mongo:
	@docker-compose exec -T backend ping mongo

build:
	@docker-compose build