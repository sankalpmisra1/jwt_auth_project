const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://sankalpm1:1234@cluster0.yg2c3t6.mongodb.net/node_auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/',requireAuth, (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRouter);

// //cookies
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie','newUser=true');
//   // alternative we can use cookie method which we included form cookie-parser

//   res.cookie('newUser',false);
//   res.cookie('isEmployee',36500,{maxAge: 1000*60*60*24,secure:false,httpOnly: true});
//   res.send('You got the cookies');

// });
// app.get('/read-cookies', (req, res) => {
//   const cookies= req.cookies;
//   console.log(cookies);
//   res.json(cookies);
  
  
// });