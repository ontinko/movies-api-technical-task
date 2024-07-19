## Movies API (technical task)

### Prerequisites

In order to run this application, you need [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/) installed and configured

### Setup

1. Get the source code

With GitHub CLI

```sh
gh repo clone ontinko/movies-api-technical-task
cd movies-api-technical-task
```

With HTTPS

```sh
git clone https://github.com/ontinko/movies-api-technical-task.git
cd movies-api-technical-task
```

With SSH

```sh
git clone git@github.com:ontinko/movies-api-technical-task.git
cd movies-api-technical-task
```

2. Create `.env` file

Copy the existing example and edit the values to suit your requirements

```sh
cp .env.example .env
```

Please specify OPENAI_KEY variable to be able to use `/movies/:id/quote endpoint`

2. Build & run the app

```sh
docker compose up
```

3. Run the migrations and seed the database

```sh
npm run db-migrate
npm run db-seed
```

4. You can query the API with Postman or any other similar software of your choise on the port you specified in `.env`
