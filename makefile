build:
	rm -rf dist
	npm run build

run:
	npx babel-node 'src/bin/gendiff' fixtures/before.json fixtures/after.json

help:
	npx babel-node src/bin/gendiff -h

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage