#!/bin/bash

echo -e " \033[0;32m Atualizando o Projeto \033[0m"

echo -e " \033[0;32m ============================ DEVELOP ==================================== \033[0m" "\n"

echo -e " \033[0;32m Atualizando a branch develop \033[0m"
git checckout develop
git pull origin develop

echo -e " \033[0;32m ============================ MASTER =================================== \033[0m" "\n"

echo -e " \033[0;32m Atualizando a branch master \033[0m"
git checkout master
git pull origin master

echo -e " \033[0;32m =========================== END ============================= \033[0m" "\n"
