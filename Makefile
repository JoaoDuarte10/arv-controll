PATH_TO_TEST := test/

preTest:
	cd $(PATH_TO_TEST) && docker-compose up -d && cd ..

stop:
	docker-compose down && cd $(PATH_TO_TEST) && docker-compose down && cd ..
