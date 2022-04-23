#!/bin/bash

echo -e " \033[0;32m Configurando as variáveis de ambiente \033[0m"
if [ $NODE_ENV == 'production' ]
then
    cp .env.prod .env
else
    cp .env.dev .env
fi

echo -e " \033[0;32m Excluindo a pasta dist/ \033[0m"
rm -r dist/

echo -e " \033[0;32m Fazendo build da aplicação \033[0m"
npm run build

echo -e " \033[0;32m Inicializando a aplicação \033[0m"
npm run start:prd
