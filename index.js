const express = require("express");
const cookieParser = require("cookie-parser");
const campaigner_routes = require("./routes/campaigner");
const admin_routes = require("./routes/admin");
const sqlConn = require("./db/db_connection");
var cors = require("cors");

const app = express();
require("dotenv").config();
const corsOptionss ={
  credentials: true,
    origin: true,
}
app.use(cors(corsOptionss));

if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: JWT-Private-Key not defined");
  process.exit(1);
}

app.use(cookieParser());
sqlConn.connection
  .connect()
  .then(() => console.log("Database Connected ..."))
  .catch((err) => console.error("Connection error", err.stack));

// const corsOptions = {
//   origin: ["http://localhost:3000", "http://localhost:3001"],
//   // origin: [`${process.env.IPFRONTEND}`],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Origin",
//     "X-Requested-With",
//     "Accept",
//     "Accept-Language",
//     "Accept-Encoding",
//     "Accept-Charset",
//     "Content-Length",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Credentials",
//     "Access-Control-Allow-Methods",
//     "Access-Control-Allow-Headers",
//     "Access-Control-Expose-Headers",
//     "Access-Control-Max-Age",
//     "Access-Control-Allow-Credentials",
//   ],
//   exposedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Origin",
//     "X-Requested-With",
//     "Accept",
//     "Accept-Language",
//     "Accept-Encoding",
//     "Accept-Charset",
//     "Content-Length",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Credentials",
//     "Access-Control-Allow-Methods",
//     "Access-Control-Allow-Headers",
//     "Access-Control-Expose-Headers",
//     "Access-Control-Max-Age",
//     "Access-Control-Allow-Credentials",
//   ],
// };
// app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.set("view engine", "ejs");

// Sample Api ------------------------------------------------------
app.get("/", (req, res) => {
  let start_date = new Date();
  let end_date = new Date();
  start_date.setHours(start_date.getHours() + 5)
  end_date.setDate(start_date.getDate() + 270)
  console.log(end_date.getFullYear()+'-'+Number(end_date.getMonth()+1)+'-'+end_date.getDate()+" "+end_date.getHours()+':'+end_date.getMinutes()+':'+end_date.getSeconds())
  res.json({
    message: "a simple api.",
  });
});
// Sample Api ------------------------------------------------------
app.use("/api/campaigner", campaigner_routes);
app.use("/api/admin", admin_routes);

const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Listening on port ${port} port...`));

// JWT TOKEN CREATION AND VERIFICATION
// ------------------------------------------------------------------------------------------------------------------
// const jwt = require("jsonwebtoken");
// const app = express();

// require("dotenv").config();
// const PORT = process.env.PORT;

// const secretKey = "secretkey";


// app.post("/login", (req, res) => {
//   const user = {
//     id: 1,
//     username: "Murtaza",
//     email: "abc@test.com",
//   };
//   jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
//     res.json({
//       err,
//       token,
//     });
//   });
// });

// const verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const token = bearer[1];
//     req.token = token;
//     next();
//   } else {
//     res.send({
//       result: "Token is not valid",
//     });
//   }
// };

// app.post("/profile", verifyToken, (req, res) => {
//   jwt.verify(req.token, secretKey, (err, authData) => {
//     if (err) {
//       res.send({ result: "invalid token" });
//     } else {
//       res.json({
//         message: "profile accessed",
//         authData,
//       });
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`App is running on ${PORT} port`);
// });
// ----------------------------------------------------------------------------------------------------
// require('dotenv').config();
// const express = require('express');
// const compression = require('compression');
// var cors = require("cors");

// const app = express();
// const PORT = process.env.PORT;

// app.use(express.json());
// app.use(compression());
// app.use(cors());

// app.get ('/', (req, res)=>{
//     res.send('App is working fine!');
// });

// app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
