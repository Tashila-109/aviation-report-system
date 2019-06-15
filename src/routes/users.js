const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User Model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Admin Login
router.get("/adminLogin", (req, res) => res.render("admin-login"));

// HOD Login
router.get("/headLogin", (req, res) => res.render("head-login"));

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Register Handle
router.post("/register", (req, res) => {
  const { name, post, email, password, password2 } = req.body;
  let errors = [];

  // Check requireed fields
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please fill in all fields"
    });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({
      msg: "Passwords do not match"
    });
  }

  // Check pass length
  if (password.length < 6) {
    errors.push({
      msg: "Password should be atleasr 6 characters"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      post,
      email,
      password,
      password2
    });
  } else {
    // Validation passed
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        // User exists
        errors.push({
          msg: "Email is already registered"
        });
        res.render("register", {
          errors,
          name,
          post,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          post,
          email,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (error, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hashed
            newUser.password = hash;

            // Save user
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in!"
                );
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("submit_msg", "You are logged out");
  res.redirect("/");
});

// Admin Login
router.post("/adminLogin", (req, res, next) => {
  if (
    req.body.email === "avreportsys@gmail.com" &&
    req.body.password === "avreport@123"
  ) {
    passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/users/adminLogin",
      failureFlash: true
    })(req, res, next);
  } else {
    req.flash("error_msg", "You do not have admin permission!");
    res.redirect("/users/adminLogin");
  }
});

// HOD Login
router.post("/headLogin", (req, res, next) => {
  if (req.body.email === "mapperera@fitsair.com" && req.body.password === "avreport@123") {
    passport.authenticate("local", {
      successRedirect: "/departments/qualityAssurance",
      failureRedirect: "/users/headLogin",
      failureFlash: true
    })(req, res, next);
  }
  else if (req.body.email === "wijesiri@fitsair.com" && req.body.password === "avreport@123") {
    passport.authenticate("local", {
      successRedirect: "/departments/engineering",
      failureRedirect: "/users/headLogin",
      failureFlash: true
    })(req, res, next);
  }
  else if (req.body.email === "duke@fitsair.com" && req.body.password === "avreport@123") {
    passport.authenticate("local", {
      successRedirect: "/departments/flightOperations",
      failureRedirect: "/users/headLogin",
      failureFlash: true
    })(req, res, next);
  }
  else if (req.body.email === "sanjaya@fitsair.com" && req.body.password === "avreport@123") {
    passport.authenticate("local", {
      successRedirect: "/departments/aiportServices",
      failureRedirect: "/users/headLogin",
      failureFlash: true
    })(req, res, next);
  }
  else if (req.body.email === "chenli@fitsair.com" && req.body.password === "avreport@123") {
    passport.authenticate("local", {
      successRedirect: "/departments/humanResources",
      failureRedirect: "/users/headLogin",
      failureFlash: true
    })(req, res, next);
  }
  else if (req.body.email === "bimba@fitsair.com" && req.body.password === "avreport@123") {
    passport.authenticate("local", {
      successRedirect: "/departments/purchasing",
      failureRedirect: "/users/headLogin",
      failureFlash: true
    })(req, res, next);
  }
  else if (req.body.email === "ramzy@fitsair.com" && req.body.password === "avreport@123") {
    passport.authenticate("local", {
      successRedirect: "/departments/finance",
      failureRedirect: "/users/headLogin",
      failureFlash: true
    })(req, res, next);
  } else {
    req.flash("error_msg", "Access Denied");
    res.redirect("/users/headLogin");
  }
});

module.exports = router;
