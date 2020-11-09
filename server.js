const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' });
const morgan = require('morgan');
const winston = require('./helpers/winston');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');
const passport = require('./middleware/passport');
const path = require('path');

const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
  })
);

// api routes
app.use('/api/auth', require('./api/controllers/auth.controller'));
app.use('/api/users', require('./api/controllers/users.controller'));
app.use('/api/events', require('./api/controllers/events.controller'));
app.use('/api/challenges', require('./api/controllers/challenges.controller'));
app.use('/api/teams', require('./api/controllers/teams.controller'));

// Serve static assets in productions
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 5050;
// const port = process.PORT || 5050;

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
