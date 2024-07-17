# Stage 1: Build Tool
FROM golang:1.21-alpine AS builder_go

RUN apk update && apk add --no-cache git bash

ENV GO111MODULE=on
ENV GOPATH=/go
ENV PATH=$GOPATH/bin:/usr/local/go/bin:$PATH

RUN go install -v github.com/projectdiscovery/httpx/cmd/httpx@v1.6.6

# Stage 2: Optimize Image
FROM alpine:latest

RUN apk update && apk add --no-cache bash git

COPY --from=builder_go /go/bin/httpx /usr/local/bin/httpx

WORKDIR /app

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
