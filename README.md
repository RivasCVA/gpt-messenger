# GPT Messenger

A platform to communicate with OpenAI GPT models through text messages.

## Repository Info

This repository consists of two seperate individual services:

* [**gpt**](https://github.com/RivasCVA/gpt-messenger/tree/main/gpt)

* [**messenger**](https://github.com/RivasCVA/gpt-messenger/tree/main/messenger)

**Note:** Please read each service's `setup` guide before attempting to run the platform.

## Run Locally

To run locally, open two seperate terminal windows and run `go run main.go` on each service.

## Run via Docker

To run with Docker, run `docker compose up -d` to build and run the containers for both services.

You can check the logs of either service by running `docker logs -f *`, where `*` should be replaced with the image name of the service you want to view.
