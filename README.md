# Questionnaire Test Task

## Overview
This project is a basic questionnaire interface built with React. It implements a scoring algorithm based on user responses, and logs an event to Google Analytics when the questionnaire is completed. This was developed as part of a test task with an estimated time of 2-4 hours.

## Features
1. **Questionnaire Interface:** A dynamic form is created using the provided JSON data to display questions and multiple choice options for user responses.
2. **Scoring Algorithm:** A simple scoring mechanism evaluates user responses based on the provided JSON rules and calculates a final score.
3. **Google Analytics Integration:** Event tracking is implemented to log when the questionnaire is completed.

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install 
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kamaldhari/mvp-test-task
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
4. Start the development server
   ```sh
   npm run start
   ```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Technologies Used

1. React.js: For building the dynamic and interactive user interface.
2. Vite: A fast build tool for frontend development, offering quick setup and optimized performance.
3. NPM: Used for dependency management, making it easy to install and manage libraries and tools.
4. TypeScript - Enhances JavaScript with static typing, used for type safety and better developer experience.
