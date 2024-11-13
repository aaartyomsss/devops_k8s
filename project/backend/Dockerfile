FROM node:alpine AS build

WORKDIR /src

COPY package*.json .

RUN npm --loglevel verbose install 

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /src

COPY --from=build /src /src

EXPOSE ${PORT}

CMD ["npm", "start"]