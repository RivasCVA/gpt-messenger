# GPT Messenger

A platform to communicate with OpenAI GPT models through text messages.

## Services Info

This repository contains two separate services to operate the GPT Messenger:

* [**gpt**](https://github.com/RivasCVA/gpt-messenger/tree/main/gpt)

* [**messenger**](https://github.com/RivasCVA/gpt-messenger/tree/main/messenger)

**Note:** Please read each service's `setup` guide before attempting to run the services.

### Run Locally

To run locally, open two separate terminal windows and run `go run main.go` on each service.

### Run via Docker

To run with Docker, run `docker compose up -d` to build and run the containers for both services.

You can check the logs of either service by running `docker logs -f *`, where `*` should be replaced with the image name of the service you want to view.

## Webapp Info

This repository contains the webapp client and server:

* [**webapp-client**](https://github.com/RivasCVA/gpt-messenger/tree/main/webapp-client)

* [**webapp-server**](https://github.com/RivasCVA/gpt-messenger/tree/main/webapp-server)

**Note:** Please read each directory's `setup` guide before attempting to run the webapp.
