# Final Project

## Setup

Install dependencies:
```bash
npm install
```

#### Terminal 2: Start the Dev Server
This command starts a local web server to view the project in your browser.
```bash
npm start
```
Once it's running, you can open your browser and navigate to **`http://localhost:8080`** to see the application live.

## Development Workflow

*   **Styling**: Make all your CSS changes in the `css/main.scss` file. **Do not edit `css/main.css` directly**, as it is an auto-generated file and your changes will be overwritten by the Sass compiler.
*   **HTML/JavaScript**: You can edit the HTML and any JavaScript files directly. The development server will serve the latest versions of these files when you refresh your browser.

## Pushing Changes Cleanly

Your `.gitignore` file is correctly configured to prevent generated files (`/node_modules`, `/css/main.css`, etc.) from being committed to the repository. This is crucial for keeping the project clean.

You can use the following command to clean the node_modules manualy.
```bash
npx rimraf node_modules
```
