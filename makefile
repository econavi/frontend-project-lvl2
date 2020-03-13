install: install-deps

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

run:
	npx babel-node 'src/bin/gendiff' fixtures/before.ini fixtures/after.ini
#	npx babel-node 'src/bin/gendiff' fixtures/before.yml fixtures/after.yml
#	npx babel-node 'src/bin/gendiff' fixtures/before.json fixtures/after.json

help:
	npx babel-node src/bin/gendiff -h

lint:
	npx eslint .

test:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

.PHONY: test
