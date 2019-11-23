const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const questions = require('./routes/api/questions');
const answers = require('./routes/api/quizzes');
const app = express();
const db = require('./config/keys_dev').mongoURI;
const cors = require('./node_modules/cors/lib')

app.use(cors())
/*
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');


passport.use(new GoogleStrategy({
    clientID:     '1013582322355-sg0dtf4j07r7lr8soqf4jbnr4jidi5pv.apps.googleusercontent.com',
    clientSecret: 'b5o5bWXdzAYgadfqpccHhnhm',
    callbackURL: "http://localhost:3333/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));



app.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
*/
mongoose
    .connect(db, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/routes/api/users', users);
app.use('/routes/api/questions', questions);
app.use('/routes/api/quizzes', answers);


// Handling 404
app.use((req, res) => {
	res.status(404).send({ err: 'We can not find what you are looking for' });
});


const port = process.env.PORT || 3333;


app.listen(port, () => console.log(`Server up and running on port ${port}`));
