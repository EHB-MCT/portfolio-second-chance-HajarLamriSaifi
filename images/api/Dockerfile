#Get node latest version 
FROM node:latest

#Create directory
WORKDIR /usr/app

#Copy package json files to directory
COPY package*.json .

#Install packages
RUN npm install --quiet

#Install node_modules
COPY ./ ./

#Run the start script
CMD [ "npm", "start" ]
