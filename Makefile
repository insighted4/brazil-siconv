clean-database:
	docker-compose stop postgres
	docker-compose rm postgres
	rm -rf ./data/postgres

configure:
	cp .env.example .env

setup: configure
	docker-compose pull
	docker-compose build

