# **Task Master**

Task Master is a task management or to-do list web application where users can efficiently manage tasks. It allows users to add, update, and delete tasks, mark tasks as complete, filter tasks based on priority, and view pending tasks assigned to specific users.

##
## Features
* **User Management:** Add, delete, and manage users.
* **Task Management:** 
  * Add tasks with details such as title, description, due date, priority, and assigned user.
  * Mark tasks as complete or incomplete.
  * Delete tasks.
* **Task Filtering:** Filter tasks based on priority (High, Medium, Low).
* **Pending Task View:** See pending tasks for each user.

##
## Tech Stack
* **Frontend Framework:** React

* **Styling:** ShadCN, Tailwind CSS

* **State Management:** Redux Toolkit

* **Language:** TypeScript

* **Build Tool:** Vite

##
## Live Demo
Visit the live site here [click here](https://msitaskmaster.netlify.app/)

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

## 
## Installation
Follow the prerequisite to set up the project locally.

### Prerequisites
- Node.js (version 16 or above)
- npm or yarn

### Steps
- Clone the repository:
```bash
git clone https://github.com/SALEHINISLAM/taskMaster.git
```
- Navigate to the project directory:
```bash
cd task-master
```

- Install dependencies:

```bash
npm install
# or
yarn install
```
- Start the development server:

```bash
npm run dev
# or
yarn dev
```
Open your browser and visit:
```bash
http://localhost:5173
```

##
## Usage
- **Add Users:** Create new users who can be assigned tasks.

- **Add Tasks:** Add tasks with details like title, description, due date, priority, and assigned user.

- **Mark Tasks as Complete:** Mark tasks as completed when done.

- **Delete Tasks:** Remove tasks that are no longer needed.

- **Filter Tasks:** Use the filter options to view tasks based on their priority.

- **View Pending Tasks:** Check all pending tasks for each user.

##
## Hosting
Task Master is hosted on [Netlify](https://www.netlify.com/). Access the live version here: [Task Master](https://msitaskmaster.netlify.app/).

## 
## License
This project is licensed under the [MIT License](https://opensource.org/license/mit). You are free to use, modify, and distribute this project.

##
## Contributing
Contributions are welcome! If you would like to contribute to this project:

- Fork the repository.

- Create a new branch for your feature or bugfix:
```bash
git checkout -b feature-name
```
- Commit your changes:
```bash
git commit -m "Add your message here"
```
- Push to the branch:
```bash
git push origin feature-name
```
- Open a pull request.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
