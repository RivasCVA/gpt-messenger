FROM golang:alpine

WORKDIR /app

COPY . ./

RUN go mod download

CMD go run main.go

EXPOSE 8081
