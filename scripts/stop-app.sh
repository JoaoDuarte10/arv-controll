#!/bin/bash

echo -e " \033[0;32m Destruindo todos os containeres existentes \033[0m"
docker-compose -f down -v

echo -e " \033[0;32m Excluindo a pasta dist/ \033[0m"
rm -r dist/
