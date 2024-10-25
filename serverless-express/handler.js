const serverless = require("serverless-http");
const express = require("express");
const app = express();
const morgan = require('morgan');
const userRouter= require('./src/routes/userRoute')

// Middlewares
app.use(morgan('dev')); // Help you debug issues in a serverless environment
app.use(express.json())

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use('/user', userRouter)

exports.handler = serverless(app);