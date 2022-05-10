FROM node:14
WORKDIR /app
COPY ./package.json .
RUN yarn
COPY ./observer.js .
COPY ./tracer-experimental.js .
COPY ./helpers ./helpers
COPY ./cats ./cats
CMD node cats
