.PHONY: start stop

dev:
	docker compose -f compose.db.yml up -d

stop-dev:
	docker compose -f compose.db.yml down

start:
	docker compose -f compose.yml up -d

stop:
	docker compose -f compose.yml down
