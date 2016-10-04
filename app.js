var passportLocalMongoose = require('passport-local-mongoose'),
    LocalStrategy         = require('passport-local'),
    bodyParser            = require('body-parser'),
    passport              = require('passport'),
    mongoose              = require('mongoose'),
    express               = require('express'),
    User                  = require('./models/user'),
    app                   = express();

mongoose.connect('mongodb://localhost/auth');
app.set('view engine', 'ejs');

app.use(require('express-session')({
  secret: 'mellon',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', function(req, res){
  res.render('home');
});

app.get('/secret', function(req, res){
  res.render('secret')
})

app.listen(3000, function(){
  console.log("serve's up fool");
});
