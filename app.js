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
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
  secret: 'mellon',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', function(req, res){
  res.render('home');
});

app.get('/secret', function(req, res){
  res.render('secret')
})

app.get('/register', function(req, res){
  res.render('register');
});

//user sign up
app.post('/register', function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/secret');
    });
  });
});

app.get('/login', function(res, res){
  res.render('login');
});

//user sign in
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), function(req, res){
});

app.listen(3000, function(){
  console.log("serve's up fool");
});
