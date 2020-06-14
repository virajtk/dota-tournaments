require("dotenv").config();

// Import Modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Connected to Mongo DataBase : OnlineGamingDB");
});

app.use(express.json());

app.use(cors());

// User
const userRouter = require("./routes/User");
app.use("/user", userRouter);

// Tournament
const tournamentRouter = require("./routes/Tournament");
app.use("/tournament", tournamentRouter);

// News
const newsRouter = require("./routes/News");
app.use("/news", newsRouter);

// Login
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('front-end/build'));

  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'front-end','build','index.html')); //relative path
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Started Using Port No. : " + portNo);
});
