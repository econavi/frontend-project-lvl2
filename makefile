build:
	rm -rf dist
	npm run build

run:
	npx babel-node 'src/bin/gendiff' ../before.json /Users/acrob/dev/after.json

help:
	npx babel-node src/bin/gendiff -h

lint:
	npx eslint .