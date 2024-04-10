<h1 align="center">NestJS Assessment(Ajay)</h1>

## Description

Application based on [Nest](https://github.com/nestjs/nest) framework

-	Implement API for create dynamic form based on form title
-	Implement API for fill form data based on form title
-	Implement API for get form field data based on form title

## Prerequisites

Please make sure you have the required softwares and configuration done before cloning the repository

Make sure you have the below application installed

- Visual Studio Code
- Node.js (v20 LTS)
- Postman

---

## Installation

To clone the repo, run the below command

```bash
$ git clone https://github.com/sharmaajay5378/AssessmentNest.git
```

If you are using SSH, use the below command

```bash
$ git@github.com:sharmaajay5378/AssessmentNest.git
```

Navigate inside the repo and install the dependencies

```bash
$ cd api
$ npm install
$ npm install -g win-node-env
```

## Running the app

Each applications needs to be started seperately using below commands

```bash
# app_name - the name of the application you intent to run

# build
$ npm run start

# watch mode
$ npm run start:dev
```

---

## Folder Structure

The project folder structure is as below

```
/
|-- .vscode/              # VS code configuration folder
|-- src/                  # Folder to contain applications
|   |-- app/              # contains main controller, routes and module
|   |-- config/           # contains Configuration files
|   |-- constants/        # contains constants files
|   |-- core/             # contains core module
|   |-- database/         # Database Module
|   |-- module/           # it contains form apllication code
|   |-- util/             # Util files Module
|   |-- main.ts           # Main entry file
|-- logs/                 # contains logs file
|   |-- system/
|-- libs/
|   |-- auth/             # Authentication Module
|   |-- database/         # Database Module
|-- .env                  # env file
|-- .eslintrc.js          # Eslint rules
|-- .prettierrc            # Prettier config file
|-- nest-cli.json         # Nest CLI options
|-- package-lock.json
|-- package.json
|-- README.md
|-- tsconfig.build.json   # Typescript build config
|-- tsconfig.json         # Typescript global config
```

The global `tsconfig.json` file contains the typescript rules for the entire project including all the applications and libraries. 

---

## Linting

Nest Framework comes with preconfigured `.eslintrc.js` and `.prettierrc` config files for linting.

You can run the below command to run the lint check for the entire project

```sh
$ npm run lint
```

The command checks for all the linting rules, corrects the code wherever possible and throws error which needs manually correction.
