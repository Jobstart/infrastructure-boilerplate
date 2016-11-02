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
	concurrently \
		"make -C services/frontend" \
		"make -C services/api"

lint: .FORCE
	concurrently \
		"make -C services/frontend lint" \
		"make -C services/api lint" \
		"eslint common"

clean:
	concurrently \
		"make -C services/frontend clean" \
		"make -C services/api clean" \
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
		"make -C services/frontend environment" \
		"make -C services/api environment"

configure: .FORCE
	concurrently \
		"make -C services/frontend configure" \
		"make -C services/api configure" \
		"direnv allow"

dependencies: .FORCE
	concurrently \
		"yarn" \
		"make -C services/frontend dependencies" \
		"make -C services/api dependencies"

containers-up: .FORCE
	docker-compose up -d
	sleep 10

containers-down: .FORCE
	docker-compose stop

containers-rm: .FORCE
	docker-compose rm -f

seed: .FORCE
	concurrently \
		"make -C services/frontend seed" \
		"make -C services/api seed"

test: .FORCE
	concurrently \
		"make -C services/frontend test" \
		"make -C services/api test" \
		"nightwatch -c config/nightwatch/config.js"

deploy: .FORCE
	concurrently \
		"make -C services/frontend deploy" \
		"make -C services/api deploy"

package: .FORCE
	concurrently \
		"make -C services/frontend package" \
		"make -C services/api package"

watch: clean .FORCE
	concurrently \
		"make -C services/frontend watch" \
		"make -C services/api watch"

api-mongo: .FORCE
	mongo mongodb://${MONGO_HOST}:${MONGO_PORT}/${API_MONGO_DB}

api-redis: .FORCE
	redis-cli -h ${REDIS_HOST} -p ${REDIS_PORT}

static-assets-server: .FORCE
	static --port ${STATIC_PORT} -H '{"Access-Control-Allow-Origin": "*"}' services/frontend/dist
