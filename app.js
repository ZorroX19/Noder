const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const MongoDb = require("mongodb");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("63c502825367ad84ac15106e")
    .then((user) => {
      console.log("middleware req.user", user);
      if (user) {
        req.user = new User(user.name, user.email, user.cart, user._id);
        console.log("req.user", req.user);
        return next();
      }
      var newUser = new User("Max", "max@gmail.com", [], null);
      newUser.save();
      req.user = newUser;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
  app.listen(3000);
});
