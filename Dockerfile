FROM node:8.5
COPY . /webApp
WORKDIR /webApp
RUN \
npm install
EXPOSE 8887