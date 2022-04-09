#!/bin/bash

echo -e " \033[0;32m Atualizando o Projeto \033[0m" "\n"

echo -e " \033[0;32m ============================ DEVELOP ======================================= \033[0m" "\n"

git checkout develop
git pull origin develop

echo -e "\n" " \033[0;32m ============================ MASTER =================================== \033[0m" "\n"

git checkout master
git pull origin master

echo -e "\n" " \033[0;32m =========================== END ====================================== \033[0m" "\n"
