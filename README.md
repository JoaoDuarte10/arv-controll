Renovar Certificados Let's Encrypt

No nginx:

Deve - se instlar as dependências do certbot que estão no Dockerfile do Nginx

```sh
cd /etc/letsencrypt
certbot renew
```