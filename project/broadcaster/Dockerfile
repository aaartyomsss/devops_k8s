FROM node:alpine AS build

WORKDIR /src

COPY package*.json .

RUN npm install 

COPY . .

FROM node:alpine

WORKDIR /src

COPY --from=build /src /src

CMD ["npm", "start"]