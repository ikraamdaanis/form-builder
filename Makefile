#!make
include .env.local

install: 
	bun install 

dev:
	PORT="${CLIENT_PORT}" bun dev

ts-lint:
	bun ts-lint
