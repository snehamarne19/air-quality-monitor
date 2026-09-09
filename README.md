# Air Quality Monitor

Air Quality Monitor is a responsive full-stack web application that helps users check city-level air-quality conditions, understand AQI readings, and learn practical ways to reduce air pollution exposure.

The application combines a clean multi-page interface with a Node.js backend that retrieves current air-quality data from OpenWeather and supports secure user registration and login through MongoDB.

## Key Features

- Search current air-quality information for a city
- View AQI data through a dedicated dashboard and charts
- Learn pollution-prevention measures and air-quality awareness tips
- Create an account and sign in securely
- Password hashing with bcrypt before credentials are stored
- Responsive pages for the home screen, city search, charts, prevention, contact, registration, and login

## Technology Stack

| Area | Technologies |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Authentication | bcryptjs |
| External data | OpenWeather Geocoding and Air Pollution APIs |

## Project Structure

The original project structure has been kept intact.

```text
air-quality-project/
|-- index.html          # Main landing page
|-- city.html           # City air-quality search page
|-- charts.html         # AQI charts and visual information
|-- prevention.html     # Pollution-prevention guidance
|-- contact.html        # Contact page
|-- login.html          # User login page
|-- register.html       # User registration page
|-- contact.js          # Contact-page client-side logic
|-- server.js           # Express API and application server
|-- .env.example        # Required environment-variable template
`-- package.json        # Node.js dependencies
```

## Run Locally

### Prerequisites

- Node.js 18 or later
- MongoDB running locally, or a MongoDB connection string
- An OpenWeather API key

### Installation

1. Clone this repository and open its folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to a new file named `.env`.
4. Add your OpenWeather API key and MongoDB URI to `.env`.
5. Start the application:

   ```bash
   node server.js
   ```

6. Open `http://localhost:5000` in your browser.

## Environment Variables

```env
OPENWEATHER_API_KEY=your_openweather_api_key
MONGODB_URI=mongodb://127.0.0.1:27017/airqualitydb
PORT=5000
```

## Security Note

Never upload `.env`, API keys, database credentials, or private key files to GitHub. The included `.env.example` shows the required variable names without exposing secrets.

## Future Enhancements

- Add historical AQI trends and comparisons
- Show health recommendations based on AQI category
- Add location-based air-quality lookup
- Deploy the application with managed environment variables and database hosting
