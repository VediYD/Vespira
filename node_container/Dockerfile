FROM node:18-alpine
WORKDIR /vespira
COPY "package.json" . 
COPY "package-lock.json" .
RUN npm install --quiet
COPY . .
CMD ["npm", "start"]