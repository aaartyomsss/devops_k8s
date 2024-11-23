FROM node:alpine AS build

WORKDIR /src

COPY package*.json .

RUN npm --loglevel verbose install 

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /src

COPY --from=build /src /src

RUN npm install serve -g

CMD ["serve", "-s", "dist", "-p", "4000"]