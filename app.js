const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.get("/login", (req, res, next) => {
  res.send(
    `<form onsubmit = "localStorage.setItem('username', document.getElementById('username').value)" action = "/chat" method = "GET"><span> Username: </span> <input id = "username" type = "text"> <button type = "submit"> Login </button></form>`
  );
});

app.get("/chat", (req, res, next) => {
  fs.readFile("username.txt", (err, data) => {
    if (err) {
      data = "No Chat Exists";
    }
    res.send(
      `<pre>${data}</pre>
      <form action = "/chat" onsubmit = "document.getElementById('username').value = localStorage.getItem('username')" method = "POST"> 
      <input type = 'text' id = 'message' name = 'message'>
      <input type = 'hidden' name = 'username' id = 'username'> 
      <button type = "submit"> Send </button>
      </form>`
    );
  });
});

app.post("/chat", (req, res, next) => {
  console.log(`${req.body.username} : ${req.body.message}`);
  fs.writeFileSync(
    "username.txt",
    `
    ${req.body.username} : ${req.body.message}  `,
    { flag: "a" }
  );
  res.redirect("/chat");
});

app.use("/", (req, res, next) => {
  res.status(404).send("<h1> Page not Found </h1>");
});

app.listen(3000);
