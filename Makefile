#!make
include .env.local

install: 
	bun install 

dev:
	PORT="${CLIENT_PORT}" bun run dev

ts-lint:
	bun run ts-lint

update-db:
	bun run update-db