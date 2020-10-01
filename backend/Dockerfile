#  Dockerfile for Node Express Backend api (development)

FROM node:current-alpine

# ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm ci
RUN npm install -g ts-node
# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm", "run","server"]