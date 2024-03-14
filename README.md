# Event Planning Application

**About the App**

The Event Planning Application is a dynamic web application built using Node.js, Express.js, and other libraries. It allows users to create, read, update, and delete events. Each event can have details such as date, location, and description. Users can view upcoming and past events, as well as manage the events they have created.

**Installation and Running the App Locally**

1. Clone the repository from [GitHub repository link].
2. Navigate to the project directory: `cd event-planning-app`
3. Install the dependencies: `npm install`
4. Start the application: `node app.js`
5. The app will be running at http://localhost:3000

**Dependencies**

The following dependencies are used in the Event Planning Application:

- Express.js
- Pug (View Engine)
- Sequelize (ORM for Database)
- MySQL (Database)
- Bcrypt (Password Hashing)

**Repository and Hosted Application**

- Source Code Repository: [https://github.com/00019323/web_tech_cw_2.git]
- Hosted Application: [https://silken-quasar-echo.glitch.me/]


**Project Structure**

- `app.js`: The entry point of the application
- `package.json`: The project configuration file
- `.gitignore`: Includes the `/node_modules` folder to prevent uploading it to the repository.
- `/routes`: Contains route files for handling different route groups (e.g., `/events`).
- `/views`: Contains templates for rendering views (using Pug in this case).
- `/controllers`: Contains controller logic for handling routed actions.
- `/services`: Contains service layer logic for handling business logic and data access.
- `/models`: Contains Sequelize models for the application's data entities (e.g., User, Event).
