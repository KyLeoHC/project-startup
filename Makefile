dev:
	docker run --rm -v "$(PWD)":/webApp project-startup:0.0.1 npm run build:dev
test:
	docker run --rm -v "$(PWD)":/webApp project-startup:0.0.1 npm run build:test
prev:
	docker run --rm -v "$(PWD)":/webApp project-startup:0.0.1 npm run build:prev
prod:
	docker run --rm -v "$(PWD)":/webApp project-startup:0.0.1 npm run build:prod