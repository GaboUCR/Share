FROM node
ADD . .
ENV PATH ./node_modules/.bin:$PATH
RUN npm ci
RUN npm install react-scripts -g
EXPOSE 3000
RUN npm start
