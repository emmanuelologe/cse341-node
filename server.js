const express = require('express');
const bodyparser = require('body-parser');
const mongodb = require('./data/database.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
/* const e = require('express'); */
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));
//This is the basic express session setup
app.use(passport.initialize());
// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.session());
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

/* app.use(express.json()); */
/* app.use('/api-docs', require('./swagger')); */
app.use('/', require('./routes'));
/* 
app.use('/contacts', require('./routes/contacts'));

app.use('/cars', require('./routes/cars')); */


passport.USE(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  // In a real application, you would save the user profile to your database here.
  return done(null, profile);
}
));


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? 'Logged in as $(req.session.user.displayname)' : 'Not logged in');
});

app.get('/auth/github', passport.authentication('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`);});
    }
});
