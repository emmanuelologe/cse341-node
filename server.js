// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const mongodb = require('./data/database.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyparser.json());

// Express session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
// app.use('/api-docs', require('./swagger'));  // uncomment when ready
app.use('/', require('./routes'));
/* app.use('/cars', require('./routes/cars')); */
// app.use('/contacts', require('./routes/contacts')); // if needed

// Passport GitHub Strategy
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Home route
app.get('/', (req, res) => {
  res.send(
    req.session.user
      ? `Logged in as ${req.session.user.displayName}`
      : 'Not logged in'
  );
});

// Start GitHub OAuth
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// OAuth Callback
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Start DB + Server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected & server running on port ${port}`);
    });
  }
});