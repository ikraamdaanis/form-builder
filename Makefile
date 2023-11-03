#!make
include .env.local

install: 
	npm install 

dev:
	PORT="${CLIENT_PORT}" npm run dev

ts-lint:
	npm run ts-lint

update-db:
	npm run update-db