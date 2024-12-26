const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user.js");
const passport = require("passport");

//for signup
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",
    wrapAsync(async(req,res)=>{
    try {
        let{username,email,password}=req.body;
        const newuser = new User({email,username});
        const registerdUser = await User.register(newuser,password);
        console.log(registerdUser);
        req.flash("success","Welcome to Wanderlust!");
        res.redirect("/listings");
    } catch(e) { 
        req.flash("error",e.message);
        res.redirect("/signup");
    }
})
);


//for login
router.get("/login",(req,res) =>{
 res.render("users/login.ejs");
});


router.post(
    "/login",
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash:true,
    }),
    async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    res.redirect("/listings");
    }
);



module.exports = router;