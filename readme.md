# MAZE MANOR

## Overview

The project is a Node.js application built using Express.js framework and MongoDB as the database. It is a back-end project that supports a booking system for Escape Rooms.

## Data Model

The data model consists of three main collections:

### Users:

- id: Mongo create
- username: string
- email: string
- password: string
- avatar: string

### EscapeRoom:

- id: Mongo create
- name: string
- players: string
- difficulty: “Easy” | “Medium” | “Hard”
- theme: string
- description: string
- images: string[]

### Calendar:

- id: Mongo create
- reserveDate: string/date
- userID: string
- roomID: string

## Routes

### usersRouter

| HTTP Verb | Route           | Description                                                |
| --------- | --------------- | ---------------------------------------------------------- |
| POST      | /users/register | Register a new user                                        |
| POST      | /users/login    | User login                                                 |
| PATCH     | /users/profile  | Edit user profile (authentication required)                |
| GET       | /users/profile  | Get the ID of the logged-in user (authentication required) |

### escaperoomRouter

| HTTP Verb | Route                     | Description                                        |
| --------- | ------------------------- | -------------------------------------------------- |
| GET       | /escaperoom               | Get all the Escape Rooms                           |
| POST      | /escaperoom/create        | Create a new Escape Room (authentication required) |
| GET       | /escaperoom/:roomId       | Get an Escape Room by ID                           |
| GET       | /escaperoom/theme/:filter | Get Escape Rooms with a given theme filter         |

### calendarRouter

| HTTP Verb | Route                             | Description                                                             |
| --------- | --------------------------------- | ----------------------------------------------------------------------- |
| GET       | /calendar/reservations            | Get all reservations                                                    |
| POST      | /calendar/reservations/create     | Create a new reservation (authentication required)                      |
| DELETE    | /calendar/reservations/delete/:id | Delete a reservation (authentication required)                          |
| GET       | /calendar/reservations/user       | Get reservations of the logged-in user (authentication required)        |
| GET       | /calendar/reservations/filter     | Filter reservations by year/month and room ID (authentication required) |

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Installation

To run the project locally, do the following:

- Clone the repository
- Run `npm install` to install dependencies
- Create a `.env` file in the root directory and add the following environment variables:
  - `MONGO_URI` - the connection URI for MongoDB
  - `SECRET_KEY` - a secret key used for JWT authentication
- Run `npm start` to start the server

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
