# Use nginx to replace WEB_CONTAINER_IMAGE in PROD environment
ARG WEB_CONTAINER_IMAGE=registry.cn-shanghai.aliyuncs.com/slicejobs-rt/nginx-nodejs
# Use /build to replace SRC_DIR in PROD environment
ARG SRC_DIR=/workspace


FROM node:8 AS NPM_CACHE
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY docker /app

RUN cd /app && \
    # 设置NPM镜像源
    chmod +x ./npm-config-registry.sh && \
    /bin/bash -c ./npm-config-registry.sh && \
    # 缓存 node_modules
    npm install --no-optional

FROM node:8 AS NPM_BUILD
COPY . /workspace
COPY --from=NPM_CACHE /app/node_modules /workspace/node_modules
RUN cd /workspace && \
    cp .env.example .env && \
    npm run build:dll && \
    npm run build && \
    mkdir /build && \
    cp -r /workspace/dist /build/dist && \
    cp /workspace/.env /build/.env && \
    cp /workspace/docker/env.sh /workspace/env.sh && \
    cp /workspace/docker/env.sh /build/env.sh


FROM ${WEB_CONTAINER_IMAGE}
ARG SRC_DIR

RUN mkdir /app
COPY --from=NPM_BUILD $SRC_DIR /app
COPY docker/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

CMD ["/bin/bash", "-c", "cd /app && bash ./env.sh && nginx -g \"daemon off;\""]
