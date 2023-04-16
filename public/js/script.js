const User = require('./User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

const username = document.getElementById('name-login')
const password = document.getElementById('password-login')

if (username === User.username && password === User.password  ) {

} else{

}

const signUsername = document.getElementById('name-signup')
const signPassword = document.getElementById('password-signup')

const newUser = {
    name: signUsername,
    password: bcrypt.hash(signPassword, saltRounds),

};

User.push(newUser);
