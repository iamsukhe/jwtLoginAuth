const express = require("express");
const connectDB = require("./config/dbConnect");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middlewares/authMiddleware");

const app = express();

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
connectDB();

app.use("*", checkUser);
app.use("/", require("./routes/home.routes"));

const server = http.createServer(app);
server.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT} for requests`);
});
