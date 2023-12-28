<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Nest App Project Setup Guide

This guide provides instructions on setting up and running your Nest.js app project. Ensure that you follow each step carefully to have a seamless development environment.

## Prerequisites

- [Docker](https://www.docker.com/) installed on your local machine.

## Setting Up the Database

1. Open a terminal and navigate to your project directory.

2. Run the following bash command to generate and run a PostgreSQL database using Docker:

   ```bash
   docker-compose up
   ```

3. Access the PostgreSQL database through [Adminer](https://www.adminer.org/) at `http://localhost:8080`. Use the following credentials:

   - **System**: PostgreSQL
   - **Server**: postgres
   - **Username**: postgres
   - **Password**: postgres
   - **Database**: testDB

## Installing Dependencies

After setting up the database, install all necessary packages by running the following command in the terminal:

```bash
npm install
```

## Running the Project

Finally, run the Nest.js app with the following command:

```bash
npm run start:dev
```

This command starts the development server, and you can access your Nest app at `http://localhost:3000`.

## Additional Information

- The PostgreSQL database details are configured in the `docker-compose.yml` file:
  ```yaml
  services:
    postgres:
      environment:
        - POSTGRES_DB=testDB
        - POSTGRES_USER=postgres
        - POSTGRES_PASSWORD=postgres
  ```

- Make sure to keep the PostgreSQL container running in the background while working on your Nest app.

- Feel free to customize the PostgreSQL settings in the `docker-compose.yml` file to suit your project requirements.

Now you're ready to develop and test your Nest.js app! If you encounter any issues or have questions, refer to the project documentation or seek help from the community. Happy coding!
