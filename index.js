const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./passport");
require("dotenv").config();
const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  // res.send('<a href="/auth/google">Authenticate with Google</a>');
  res.send('<a href="/auth/facebook">Authenticate with Facebook</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "profile" })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/protected",
    failureRedirect: "/auth/facebook/failure",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${JSON.stringify(req.user)}`);
});

app.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
    }
    req.session.destroy();
    res.send("Goodbye!");
  });
});

app.get("/auth/facebook/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.listen(5000, () => console.log("listening on port: 5000"));
