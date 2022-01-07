#!/usr/bin/env bash

VERSION=$(date +%m%d%y)

PROJECT=jac18281828/bored_ape_update

docker build . -t ${PROJECT}:${VERSION} && \
	docker run -v ${PWD}/output:/output --rm -i -t ${PROJECT}:${VERSION}
