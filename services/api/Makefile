PATH := node_modules/.bin:../../node_modules/.bin:$(PATH)
SHELL := /bin/bash

.FORCE:

all: clean .FORCE
	webpack --colors --display-error-details --config config/webpack/server.babel.js

shrinkwrap: .FORCE
	npm shrinkwrap --production

image: shrinkwrap .FORCE
	docker build -t user/repo:test

clean:
	concurrently "rimraf dist" "rimraf npm-shrinkwrap.json"

test: .FORCE
	mocha

lint: .FORCE
	concurrently "eslint src" "eslint test" "eslint config"

dependencies: .FORCE
	npm install

watch: .FORCE
	concurrently \
		"webpack --watch --verbose --colors --display-error-details --config config/webpack/server-dev.babel.js" \
		"just-wait --pattern 'dist/*.js' && node dist/index"

package: .FORCE
	npm shrinkwrap --production
	docker build -t $DOCKER_USER/$DOCKER_REPO:$DOCKER_TAG

deploy: .FORCE
	./scripts/deploy.sh

configure: .FORCE
	direnv allow

environment: .FORCE

seed: .FORCE
	./scripts/seed.sh
