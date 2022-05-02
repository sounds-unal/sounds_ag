FROM node:carbon-slim

# Create app directory
WORKDIR /sounds_ag

# Install app dependencies
COPY package.json /sounds_ag/
RUN npm install

# Bundle app source
COPY . /sounds_ag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
