// Declaring dependencies
const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Declare constants used throughout file
const app = express();


// Configuration
app.set("view engine", "ejs");
app.set('port', process.env.PORT || 8080); // default port 8080

function generateRandomString() {
  let result = Math.random().toString(36).replace(/[^0-9A-Za-z]/g, '').substr(1, 6);
  return result;
}

var urlDatabase = {
  "b2xvn2": "http://www.lighthouselabs.ca",
  "9sm5xk": "http://www.google.com"
};

// Middleware
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use(methodOverride('_method'))


// Routes

// Index
app.get("/", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    login: req.cookies['user']
  };
  res.render('index', templateVars);
})
app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    login: req.cookies['user']
  };
  res.render("urls_index", templateVars);
})
// app.get("/urls/new", (req, res) => {
//   res.render("urls_new", {username: req.cookies["username"]});
// })

app.post("/login", (req, res) => {
  let username = req.body.username
  res.cookie("user",username)
  res.redirect("/urls")
})
app.post("/logout", (req, res) => {
  delete res.clearCookie("user")
  res.redirect("/urls")
})

app.post("/u", (req, res) => {
  urlDatabase[generateRandomString()] = req.body.longURL
  console.log("OK");
  res.redirect("/urls");
})
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
})
app.post("/urls/:id/edit", (req, res) => {
  console.log(req.body.edit)
  urlDatabase[req.params.id] = req.body.edit
  res.redirect('/urls/')
})

app.get("/u/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  console.log(urlDatabase[req.params.id])
  res.redirect(longURL)
});
app.post("/urls/:id", (req, res) => {
  //console.log(res.body)
  let templateVars = {
    urls: urlDatabase,
    login: req.cookies['user'],
    key: req.params.id
  };
  res.render("urls_show", templateVars )
})


app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}!`);
});
