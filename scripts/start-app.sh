#!/bin/bash

echo -e " \033[0;32m Destruindo todos os containeres existentes \033[0m"
docker-compose down

echo -e " \033[0;32m Excluindo a pasta dist/ \033[0m"
rm -r ../dist/

echo -e " \033[0;32m Subindo os containeres da aplicação \033[0m"
docker-compose up -d
