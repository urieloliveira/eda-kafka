FROM node:18-alpine

WORKDIR /app/

RUN npm install && npm run build

CMD ["tail", "-f", "/dev/null"]
