FROM node:18-alpine as build

# set working directory
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS=--openssl-legacy-provider
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
# Installs all node packages
RUN npm install
# Copies everything over to Docker environment
COPY . .
# Build for production.
RUN npm run build --production


# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
