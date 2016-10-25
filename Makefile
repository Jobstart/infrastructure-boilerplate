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

environment: .FORCE
	@if [ "${OS_TYPE}" = "osx" ]; then \
		concurrently \
			"brew update && brew install direnv && brew link --overwrite direnv" \
			"make -C services/frontend environment" \
			"make -C services/api environment"
	else \
		concurrently \
			"apt-get -y update && apt-get -y install direnv" \
			"sudo pip install docker-cloud" \
			"make -C services/frontend environment" \
			"make -C services/api environment"
	fi

configure: .FORCE
	concurrently \
		"make -C services/frontend configure" \
		"make -C services/api configure" \
		"direnv allow"

dependencies: .FORCE
	npm install
	concurrently \
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
