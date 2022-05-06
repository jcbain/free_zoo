FROM node:14
WORKDIR /app
COPY ./package.json .
RUN yarn
COPY ./tracer-experimental.js .
COPY ./helpers ./helpers
COPY ./random ./random
CMD node random
