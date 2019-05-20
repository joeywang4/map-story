const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/login', (req, res) => {
    const _email = req.body.email;
    const _pwd  = req.body.pwd;
    if(!_email){
        res.redirect("/login/Missing email!");
    }
    else if(!_pwd){
        res.redirect("/login/Missing password!");
    }
    else {
        // Check user existence
        User.findOne({email: _email}, (err, userResponse) => {
            if(err) {
                errHandler(err, res, "Find email error.");
            }
            else if(userResponse) {
                // Check password
                bcrypt.compare(_pwd, userResponse.pwdHash, function(err, cmpResponse) {
                    if(err) {
                        errHandler(err, res, "Hash comparison error.");
                    }
                    // Login successful
                    else if(cmpResponse) {
                        console.log("User login:", userResponse._id, _pwd);
                        req.session.uid = userResponse._id;
                        req.session.isLogin = true;
                        res.redirect("/");
                    }
                    // Wrong password
                    else {
                        res.redirect("/login/Wrong password!");
                    }
                });
            }
            // No user
            else {
                res.redirect("/login/Wrong email address!");
            }
        })
    }
})

router.post('/register', (req, res) => {
    const _email = req.body.email;
    const _pwd  = req.body.pwd;
    const _user = req.body.user;
    const _icon = req.body.icon;
    if(!_user || !_email || !_pwd){
        res.redirect("/register/Please fill in the blank!");
    }
    else {
        // Check existence of same email
        User.findOne({email: _email}, (err, userResponse) => {
            if(err) {
                errHandler(err, res, "Check existence user error.");
            }
            else if(userResponse) {
                res.redirect("/register/Email already registered!");
            }
            else {
                bcrypt.hash(_pwd, 10, (err, _pwdHash) => {
                    if(err) {
                        errHandler(err, res, "Create hash error.");
                    }
                    const newUser = User({user: _user, pwdHash: _pwdHash, email: _email, icon: _icon});
                    newUser.save(err => {
                        if(err) {
                            errHandler(err, res, "Create user error.");
                        }
                        else{
                            console.log("User created:", _user, _pwd, ", password hash:", _pwdHash);
                            res.redirect("/login/Account%20Created");
                        }
                    })
                })
            }
        })
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;

/*********
 * Utils *
 *********/

const errHandler = (err, res = null, msg = null) => {
    if(msg) console.error(msg);
    console.log(err);
    if(res) res.status(500).send("Server Error.");
    throw err;
}