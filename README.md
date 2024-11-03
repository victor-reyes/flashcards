# Flashcards API

## Overview
The Flashcards API is a RESTful service for managing flashcards and users, designed with modularity and thorough testing in mind. This project demonstrates essential API functionality, clean code architecture, and robust testing.

## Vision
Create a flexible API that allows users to manage flashcards and decks independently, using best practices in Express, TypeScript, and test-driven development (TDD).

## Project Goals
1. **RESTful API** with endpoints for flashcards and user management.
2. **Modular Architecture**: Separates business logic from routing for maintainability.
3. **Testing**: Comprehensive unit and integration tests to ensure reliability.

## Key Features
1. **User Management**: Handles user registration and authentication.
2. **Flashcard Management**: Supports creating, reading, updating, and deleting flashcards.

## Tech Stack
- **Express.js** for API routing.
- **TypeScript** for type safety and improved development experience.
- **Zod** for schema validation.
- **Supertest** and **Node Test Runner** for testing.
- **UUID** for unique identifiers.

## Test-Driven Development (TDD) Approach
This project was developed using a TDD approach, where tests were written before implementing the actual functionality. This methodology ensured:
- **Code Quality**: Writing tests first helped define clear requirements for each function and module.
- **Reliability**: Early testing allowed for quick identification and resolution of issues, leading to a more stable codebase.
- **Refactoring Confidence**: With a solid test suite in place, refactoring code became less risky, as tests provided assurance that functionality remained intact.

## Endpoints

### Flashcards
- **`GET /flashcards`**  
  Retrieves all flashcards.
  - **Response**: Array of flashcard objects.

- **`GET /flashcards/:id`**  
  Retrieves a specific flashcard by ID.
  - **Parameters**: `id` (string) – Flashcard ID.
  - **Response**: Flashcard object or 404 if not found.

- **`POST /flashcards`**  
  Creates a new flashcard.
  - **Body**: Flashcard object.
  - **Response**: 201 Created on success, or 400 for invalid data.

- **`PATCH /flashcards/:id`**  
  Updates a flashcard by ID.
  - **Parameters**: `id` (string) – Flashcard ID.
  - **Body**: Updated flashcard object.
  - **Response**: 200 OK on success, or 404 if not found.

- **`DELETE /flashcards/:id`**  
  Deletes a flashcard by ID.
  - **Parameters**: `id` (string) – Flashcard ID.
  - **Response**: 200 OK on success, or 404 if not found.

### Users
- **`POST /users/register`**  
  Registers a new user.
  - **Body**: User object (e.g., with `username` and `password`).
  - **Response**: 201 Created on success, or 409 if user already exists.

- **`POST /users/login`**  
  Logs in a user.
  - **Body**: User credentials.
  - **Response**: 200 OK with access token on success, or 401 Unauthorized if credentials are incorrect.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/victor-reyes/flashcards.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```
