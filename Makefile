.PHONY: start stop

start:
	docker compose -f compose.yml up -d

stop:
	docker compose -f compose.yml down
