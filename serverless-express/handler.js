const serverless = require("serverless-http");
const express = require("express");
const app = express();
const morgan = require('morgan');
const userRouter= require('./src/routes/userRoute')

app.use(morgan('dev')); // Help you debug issues in a serverless environment

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use('/', userRouter)

exports.handler = serverless(app);