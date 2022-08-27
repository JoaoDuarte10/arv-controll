FROM nginx AS build
WORKDIR /etc/build/arv
COPY . .
COPY ../build-client .

FROM nginx
COPY --from=build /etc/build/arv/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /etc/build/arv/build /usr/share/nginx/html
# USER nginx

EXPOSE "80"
EXPOSE "443"

# RUN apt-get update && \
#     apt-get install -y nano