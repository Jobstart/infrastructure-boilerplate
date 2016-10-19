PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.FORCE:

all: clean .FORCE
	concurrently --kill-others "make build-client" "make build-server" "make shrinkwrap"

shrinkwrap: .FORCE
	npm shrinkwrap --production

build-client: .FORCE
	webpack --colors --display-error-details --config config/webpack/client.babel.js

build-server: .FORCE
	webpack --colors --display-error-details --config config/webpack/server.babel.js

image: .FORCE
	docker build -t user/repo:test

clean:
	concurrently "rimraf dist" "rimraf npm-shrinkwrap.json"

test: .FORCE
	mocha

lint: .FORCE
	concurrently "eslint src" "eslint test" "eslint config"

start-server-after-compile: .FORCE
	just-wait --pattern 'dist/*.js' && node dist/server

watch-server: .FORCE
	webpack --watch --verbose --colors --display-error-details --config config/webpack/server-dev.babel.js

watch-client: .FORCE
	webpack-dev-server --config config/webpack/client-dev.babel.js

watch: .FORCE
	concurrently --kill-others "make start-server-after-compile" "make watch-server" "make watch-client"
