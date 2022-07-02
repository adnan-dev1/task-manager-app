# Pull Docker Hub base image
FROM node:16.10.0-alpine
# Set working directory
WORKDIR /usr/app
# Install npm version 8.11
RUN npm install -g npm@8.11
# Install app dependencies
COPY package*.json ./
RUN npm install -qy
# Copy app to container
COPY . .
# Run the script in package.json
CMD ["npm", "start"]