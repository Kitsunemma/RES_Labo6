FROM node:17.7.2

COPY src /opt/app/
WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/index.js"]
