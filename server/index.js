require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const port = process.env.SERVER_PORT || 3000;
const checkForSession = require("./middlewares/checkForSessions");
const swag_controller = require("./controller/swag_controller");
const auth_controller = require("./controller/auth_controller");
const search_controller = require("./controller/search_controller");

app.use(bodyParser.json());
app.use(
  session({
    secret: "anything",
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.get("/api/swag", swag_controller.read);
app.post("./api/login", auth_controller.login);
app.post("./api/register", auth_controller.register);
app.post("./api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);
app.get("/api/search", search_controller.search);

app.listen(port, () => console.log(`Listening on port ${port}`));
