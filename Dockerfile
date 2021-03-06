ARG VERSION=010522
FROM jac18281828/tsdev:${VERSION}

ARG PROJECT=bored_ape_update
WORKDIR /workspaces/${PROJECT}

COPY package.json .
COPY package-lock.json .
RUN npm i --save-dev
RUN npm i

COPY .env .
COPY .eslintrc .
COPY tsconfig.json .
COPY src src/
COPY test test/

RUN npm run eslint
RUN npm run test
RUN npm run build

CMD npm start
