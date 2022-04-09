#!/bin/bash

echo "Atualizando o projeto"
git checkout master
git pull origin master

echo "Destruindo todos os containeres existentes"
docker-compose down

echo "Excluindo a pasta dist/"
rm -r dist/

echo "Subindo os containeres da aplicação"
docker-compose up -d