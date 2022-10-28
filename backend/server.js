const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const multer = require("multer");
const { destination, filename, fileFilter } = require("./utilities/multerConfig");
const fileStorage = multer.diskStorage({ destination, filename });

const expSession = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(expSession);
const cookieParser = require("cookie-parser");

const errorhandler = require("./middleware/ErrorHandling");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const messageRoutes = require("./routes/messageRoute");

const app = express();

//MIDDLEWARES
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use(cookieParser());
const store = new MongoDBSession({
  uri: process.env.MONGODB_URI,
  collection: "authSession",
});

app.set("trust proxy", 1);
app.use(
  expSession({
    name: "react-boardz",
    secret: process.env.SECRET_KEY_EXP,
    cookie: { maxAge: 1200000, httpOnly: true, secure: true, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
//MIDDLEWARES

//ROUTES =====
app.use("/auth", authRoutes);
app.use("/boardz", boardRoutes);
app.use("/message", messageRoutes);
//ROUTES =====

//ERROR HANDLING
app.use(errorhandler);
//ERROR HANDLING

mongoose.connect(process.env.MONGODB_URI).then(() => {
  const server = app.listen(process.env.PORT || 8080);
  const io = require("./utilities/socketIO").init(server);
  io.on("connection", (socket) => {
    console.log("Socket Connected to client" + socket.id || "(no id)");
  });
  console.log("Listening on Port" + process.env.PORT);
});
