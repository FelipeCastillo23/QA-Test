<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Getting started

### Running docker compose

```bash
$ docker-compose up
```

### Installing dependicies

```bash
$ npm install
or
$ yarn install
```

### Configure .env variables

```bash
$ cp .env.example .env
```

### Env Example

```bash
# Database
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_DATABASE

# Authentication
JWT_SECRET
JWT_EXPIRES_IN
```

### Running the app

```bash
# development
$ npm run start
or
$ yarn start

# watch mode
$ npm run start:dev
or
$ yarn start:dev

# production mode
$ npm run start:prod
or
$ yarn start:prod
```

### Endpoints

```bash
# - Auth module
# Register
POST api/auth/register
Body: 
  - email: string
  - username: string
  - password: string
  - fullName: string

# Login
POST api/auth/login
Body: 
  - username: string
  - password: string

# - Posts module

# Get all posts
GET api/posts
Params: 
  - dateFilter: Date
  - owner: boolean
  - search: string

# Create a post
POST api/posts
Body: 
  - title: string
  - content: string

# Update a post
PUT api/posts/:id
Body: 
  - title: string
  - content: string

# Delete a post
DELETE api/posts/:id
```