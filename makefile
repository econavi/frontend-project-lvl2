install: install-deps

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

run:
	npx babel-node 'src/bin/gendiff' __fixtures__/before.ini __fixtures__/after.ini -f plain
#	npx babel-node 'src/bin/gendiff' __fixtures__/before.yml __fixtures__/after.yml
#	npx babel-node 'src/bin/gendiff' __fixtures__/before.json __fixtures__/after.json

help:
	npx babel-node src/bin/gendiff -h

lint:
	npx eslint .

test:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

.PHONY: test
