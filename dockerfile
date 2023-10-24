FROM node
WORKDIR /eats
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9099
# EXPOSE 9090
# CMD ["npm","start"]
CMD ["npm","run","dev"]