FROM node:16
WORKDIR /home/app
COPY ./public /home/app/public
COPY . /home/app/server
WORKDIR /home/app/server
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start"]