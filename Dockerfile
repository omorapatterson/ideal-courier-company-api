FROM node:8.11
LABEL appname="CCI Digipilote"

# Install Dependencies and Copy Source Files
RUN mkdir /node
WORKDIR /node
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

# Set Up the App to Run
EXPOSE 8080
CMD npm run start:prod