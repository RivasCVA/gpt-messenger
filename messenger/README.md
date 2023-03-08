# Messenger Service

This service handles text message requests from users and fetches responses from the GPT service.

## Setup

### 1. Environment Variables

Add a `.env` file to this folder. Add the following environment variables:

```
HOST=localhost
PORT=8080
GPT_HOST=localhost
GPT_PORT=8081
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=messenger-db
```

### 2. Twilio Webhook

This service uses the [Twilio](https://www.twilio.com) platform to handle messages. To receive messages, Twilio requires a webook to forward text messages to this service.

You will need to create a tunnel to open your local network port to the Internet. The easiest way to do this is by using [ngrok](https://ngrok.com).

> On Mac, you can install ngrok through homebrew. See [here](https://formulae.brew.sh/cask/ngrok).

Once installed, run `ngrok http 8080` in a new terminal window. You will be prompted with a console, and you should copy the `Forwarding` address.

On the Twilio console, go to the active phone number's configuration page. Under the `Messaging Service`, go to the `A Message Comes In` section and paste the `Forwarding` address with `/message` included as the end path.

It should resemble: `https://xxx.ngrok.io/message`.

**Note:** Each time you run the ngrok command, you are given a new address. You will have to repaste the new `Forwarding` address on the Twilio console.
