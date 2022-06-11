#!/bin/bash

echo -e " \033[0;32m Atualizando o Projeto \033[0m" "\n"

git checkout master
git pull origin master

git checkout develop
git pull origin develop
git merge master
git push origin develop