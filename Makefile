imageName = project-startup
version = 0.0.1
dev:
	docker run -p 8082:8082 --rm -v "$(PWD)":/webApp $(imageName):$(version) npm run dev
build@dev:
	docker run --rm -v "$(PWD)":/webApp $(imageName):$(version) npm run build:dev
build@test:
	docker run --rm -v "$(PWD)":/webApp $(imageName):$(version) npm run build:test
build@prev:
	docker run --rm -v "$(PWD)":/webApp $(imageName):$(version) npm run build:prev
build@prod:
	docker run --rm -v "$(PWD)":/webApp $(imageName):$(version) npm run build:prod