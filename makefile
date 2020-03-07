build:
	rm -rf dist
	npm run build

run:
	npx babel-node 'src/bin/genDiff.js' ../before.json /Users/acrob/dev/after.json

help:
	npx babel-node src/bin/genDiff.js -h

lint:
	npx eslint .