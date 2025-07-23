const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
require("dotenv").config();

const app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URI,
  scope: ["identify"]
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile));
}));

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Welcome, ${req.user.username}!</h1><img src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png" height="80"><br><a href="/logout">Logout</a>`);
  } else {
    res.send('<a href="/login">Login with Discord</a>');
  }
});

app.get("/login", passport.authenticate("discord"));
app.get("/callback", passport.authenticate("discord", {
  failureRedirect: "/"
}), (req, res) => res.redirect("/"));

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
