FROM docker.io/library/alpine:edge AS build

RUN apk upgrade -U --no-cache
RUN apk add --no-cache go git curl nodejs yarn

WORKDIR /src
COPY . .

# Debug
RUN ls

RUN yarn install
RUN yarn build
RUN mv dist/ server/

WORKDIR server
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /hello

FROM scratch

COPY --from=build /hello /hello

EXPOSE 8080
ENTRYPOINT ["/hello"]
