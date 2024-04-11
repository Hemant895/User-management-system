
# Angular User Management System
// =============================================================
This project is a simple user management system built using Angular 14.It allows you to create, edit, and delete user records. The project uses Angular's reactive forms for user input validation and API calls to interact with a backend server. utilizing Angular forms, routing, and HTTP client to interact with a RESTful API.


## Features

- User List: Display a list of users fetched from the API also Edit and Delete User data.
- User Upsert: Add or update user details.
- Real-time Edit and Delete: Update and delete users in real-time.

## Technologies Used

- Angular 14
- Node js RESTful API.
- Express js for server side implementation
- TailWind Css for UI/UX
- Angular Forms
- Angular Routing
- Angular HTTP Client


## Setup and Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/user-management-system.git
    ```

2. Navigate to the project directory:

    ```bash
    cd user-management-system
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    ng serve
    ```

5. Open your browser and navigate to `http://localhost:4200/` to view the app.

## API Endpoints

- `GET /users/userlist`: Retrieve all users
- `POST /users/createuser`: Add a new user
- `PUT /users/:id`: Update an existing user
- `DELETE /users/:id`: Delete a user

## Usage

1. **View Users**: Navigate to the User List to view all users.
2. **Add User**: Navigate to the User Upsert page and fill out the form to add a new user.
3. **Edit User**: Click the Edit button next to a user to edit their details.
4. **Delete User**: Click the Delete button next to a user to remove them from the list.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


