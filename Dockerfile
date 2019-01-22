FROM node:8.11.4
WORKDIR /app
COPY . /app
RUN npm install 
EXPOSE 3000
CMD npm start   