const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const recommendationsRouter = require('./routes/recommendations'); // Recommendations route
const usersRouter = require('./routes/users'); // Users route
const sendRouter = require('./routes/send'); // Send email route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Routes
app.use('/api/recommendations', recommendationsRouter); // Route for fetching recommendations
app.use('/api/users', usersRouter); // Route for fetching subscribed users
app.use('/api/email', sendRouter); // Route for sending emails

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
