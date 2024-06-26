const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge= 3*24*60*60;
const createToken = (id) =>{
    return jwt.sign({id},'misra sankalp secret',{
        expiresIn:maxAge
    });
}

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'Email not registered';

    }
    // incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'Incorrect password';

    }

    //duplicate error code
    if(err.code === 11000){
        errors.email = 'Email already registered';
        return errors;
    }

    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.signup_get = function (req, res) {
    res.render('signup', { title: 'SignUp Page' });
}
module.exports.login_get = function (req, res) {
    res.render('login', { title: 'Login page' });
}
module.exports.signup_post = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user= await User.create({email, password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge*1000});
        res.status(201).json({user:user._id});

    }
    catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        // res.status(400).send('Error,user not created');
        res.status(400).json({errors});
    }
}
module.exports.login_post = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge*1000});
        res.status(200).json({user: user._id});
    }
    catch(err){
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}
module.exports.logout = function (req, res) {
    res.clearCookie('jwt'); // Clear the jwt cookie
    res.redirect('/login'); // Redirect to the home page
}