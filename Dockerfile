# Build layer
FROM node:lts AS build

WORKDIR /build

# Set working directory and install dependencies
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm ci

# Copy source code and build for production
COPY public/ public
COPY src/ src
RUN npm run build

# Production layer (nginx serving static files)
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=build /build/build/ .