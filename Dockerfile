# 使用最小node图像 --这个是生成环境的DockerFile
FROM docker:20.10.3

# 改变时区
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    &&apk -- update add tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \ 
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata \
    && apk add --no-cache bash \
    && apk add nodejs && apk add npm 

RUN mkdir -p /usr/src/server/

WORKDIR /usr/src/server/

COPY  package.json /usr/src/server/package.json

RUN cd /usr/src/server/

# 只安装生产依赖
# RUN npm i --production --registry=https://registry.npm.taobao.org
RUN npm i  --registry=https://registry.npm.taobao.org

# copy code
COPY . /usr/src/server/

EXPOSE 3000 3001

CMD node src/prod.js