.PHONY: start stop

start:
	docker compose -f dev.compose.yml up -d

stop:
	docker compose -f dev.compose.yml down
