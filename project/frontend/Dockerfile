FROM node:alpine AS build

WORKDIR /src

COPY package*.json .

RUN npm install 

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /src

COPY --from=build /src /src

ENV VITE_BACKEND_BASE_URL='http://todo-project-svc:1234'

RUN npm install serve -g

CMD ["serve", "-s", "dist", "-p", "4000"]