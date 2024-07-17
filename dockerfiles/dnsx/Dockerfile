# Stage 1: Build Tool
FROM golang:1.21-alpine AS builder_go

RUN apk update && apk add --no-cache git bash

ENV GO111MODULE=on
ENV GOPATH=/go
ENV PATH=$GOPATH/bin:/usr/local/go/bin:$PATH

RUN go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@v1.2.1

# Stage 2: Optimize Image
FROM alpine:latest

RUN apk update && apk add --no-cache bash git

COPY --from=builder_go /go/bin/dnsx /usr/local/bin/dnsx

WORKDIR /app

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
