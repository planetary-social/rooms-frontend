FROM node:16-bullseye as build-stage
RUN apt-get update
RUN  apt-get install -y \
  python \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:production

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
