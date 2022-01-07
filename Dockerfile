ARG VERSION=010522
FROM jac18281828/tsdev:${VERSION}

ARG PROJECT=bored_ape_update
WORKDIR /workspaces/${PROJECT}

COPY package.json .
RUN npm i
RUN npm i eslint --global
RUN npm i mocha @types/mocha chai @types/chai --global
RUN npm i @types/node --global

COPY .env .
COPY .eslintrc .
COPY tsconfig.json .
COPY src src/
COPY test test/

RUN npm run eslint
RUN npm run test
RUN tsc

CMD npm start 
