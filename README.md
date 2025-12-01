📌 salary-service

A backend microservice built with Node.js, NestJS, MongoDB (Mongoose), and TypeScript.
The service manages roles, role categories, and salary entries, with validation, automated tests, and full CRUD capabilities.

This project is part of a larger system intended to collect and analyse salary data submitted by users.

🛠️ Tech Stack
| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| **Runtime**    | Node.js                                  |
| **Framework**  | NestJS                                   |
| **Language**   | TypeScript                               |
| **Database**   | MongoDB + Mongoose ODM                   |
| **Testing**    | Jest + Supertest + mongodb-memory-server |
| **Validation** | Class-validator / class-transformer      |


🔐 Authentication (Upcoming)

The next major step is implementing an authentication layer.
This will allow:

- Differentiation between regular users and admins
- Rate limiting & abuse protection
- Storing who submitted each salary entry
- Personalised features
