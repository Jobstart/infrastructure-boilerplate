PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Linux)
    OS_TYPE := linux
endif
ifeq ($(UNAME_S),Darwin)
    OS_TYPE := osx
endif

.FORCE:

all: clean .FORCE
	NODE_ENV=production concurrently \
		"make -C services/client" \
		"make -C services/graphql"

lint: .FORCE
	concurrently \
		"make -C services/client lint" \
		"make -C services/graphql lint" \
		"eslint common"

clean:
	concurrently \
		"make -C services/client clean" \
		"make -C services/graphql clean" \
		"rimraf npm-debug.log"

osx-syspackages: .FORCE
	brew update
	brew install direnv yarn
	brew link --overwrite direnv

linux-syspackages: .FORCE
	sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
	echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt-get -y update
	sudo apt-get install yarn direnv
	sudo pip install docker-cloud

environment: .FORCE
	@if [ "${OS_TYPE}" = "osx" ]; then \
		make osx-syspackages; \
	else \
		make linux-syspackages; \
	fi
	make dependencies
	concurrently \
		"yarn global add node-static" \
		"make -C services/client environment" \
		"make -C services/graphql environment"

configure: .FORCE
	concurrently \
		"make -C services/client configure" \
		"make -C services/graphql configure" \
		"direnv allow"

dependencies: .FORCE
	yarn
	concurrently \
		"make -C services/client dependencies" \
		"make -C services/graphql dependencies"

containers-up: .FORCE
	docker-compose up -d
	sleep 10

containers-down: .FORCE
	docker-compose stop

containers-rm: .FORCE
	docker-compose rm -f

seed: .FORCE
	concurrently \
		"make -C services/client seed" \
		"make -C services/graphql seed"

test: .FORCE
	concurrently \
		"make -C services/client test" \
		"make -C services/graphql test" \
		"make test-e2e"

test-e2e: .FORCE
	docker-compose -f docker-compose.test.yml up -d
	sleep 10
	nightwatch -c config/nightwatch/config.js

deploy: .FORCE
	concurrently \
		"make -C services/client deploy" \
		"make -C services/graphql deploy"

package: .FORCE
	concurrently \
		"make -C services/client package" \
		"make -C services/graphql package"

watch: clean .FORCE
	concurrently \
		"make -C services/client watch" \
		"make -C services/graphql watch"

api-mongo: .FORCE
	mongo mongodb://${MONGO_HOST}:${MONGO_PORT}/${API_MONGO_DB}

api-redis: .FORCE
	redis-cli -h ${REDIS_HOST} -p ${REDIS_PORT}

static-assets-server: .FORCE
	static --gzip --port ${STATIC_PORT} -H '{"Access-Control-Allow-Origin": "*"}' services/client/dist
