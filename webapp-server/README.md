# Webapp Server

This is the webapp server that handles requests from the webapp client.

## Setup

### 1. Environment Variables

Add a `.env` file to this folder. Add the following environment variables:

```
HOST=localhost
PORT=8082
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=messenger-db
GOOGLE_CLIENT_ID={insert the client id from Google Cloud}
GOOGLE_CLIENT_SECRET={insert the client secret from Google Cloud}
```
