# TrekTrax TravelBuddy Server

#### The Travel Buddy Matching assignment is aimed at building a web application that facilitates users in finding travel buddies for their trips. The application provides features for user registration, trip creation, travel buddy requests, and user profiles.

#### Users can register, create trips with details like destination, dates, budget, and activities, and send/receive travel buddy requests for their trips. Additionally, users can update their profile information.

### Live Project Link: https://trektrax-server.vercel.app/

### Github Repository Link: https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-isratjmn

### Video Presentation Link: https://drive.google.com/file/d/10CP9Zs_Y1javfHWKlurqxzh6J93Lk0Dz/view?usp=sharing

## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript code.

- **Express.js**: Web application framework for building APIs and handling HTTP requests.

- **Prisma**: ORM (Object-Relational Mapping) tool for database management.

- **PostgreSQL**: Relational database management system.

- **JWT**: JSON Web Tokens for secure authentication and authorization.

- **bcrypt**: Library for hashing passwords.

## Models

- **User Model**: Contains user information such as name, email, and password.

- **Trip Model**: Represents a trip with fields like destination, dates, budget, and activities.

- **Travel Buddy Request Model**: Stores travel buddy requests with trip and user references.
- **UserProfile Model**: Contains additional information about the user like bio and age.

## Installation and Setup

1. Clone this repository: `git clone <repository_url>`

2. Install dependencies: `npm install`

3. Set up the environment variables by creating a `.env` file and filling in the required variables based on the provided `.env.example` file.

4. Run the database migrations: `npx prisma migrate dev`

5. Start the server: `npm start`
