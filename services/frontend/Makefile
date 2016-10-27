PATH := node_modules/.bin:../../node_modules/.bin:$(PATH)
SHELL := /bin/bash

.FORCE:

all: clean .FORCE
	concurrently "make build-client" "make build-server"

build-client: .FORCE
	webpack --colors --display-error-details --config config/webpack/client.babel.js

build-server: .FORCE
	webpack --colors --display-error-details --config config/webpack/server.babel.js

clean:
	concurrently "rimraf dist" "rimraf npm-shrinkwrap.json"

test: .FORCE
	mocha

lint: .FORCE
	concurrently "eslint src" "eslint test" "eslint config"

dependencies: .FORCE
	yarn install

start-server-after-compile: .FORCE
	just-wait --pattern 'dist/*.js'
	node dist/server

watch-server: .FORCE
	webpack --watch --verbose --colors --display-error-details --config config/webpack/server-dev.babel.js

watch-client: .FORCE
	webpack-dev-server --colors --bail --config config/webpack/client-dev.babel.js

watch: .FORCE
	concurrently --kill-others "make start-server-after-compile" "make watch-server" "make watch-client"

package: .FORCE
	npm shrinkwrap --production
	docker build -t $DOCKER_ACCOUNT/$DOCKER_REPO:$DOCKER_TAG

deploy: .FORCE
	./scripts/deploy.sh

configure: .FORCE
	direnv allow

environment: .FORCE

seed: .FORCE
