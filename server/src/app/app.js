const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../db/connection');
const routes = require("../routes");

// INSTANCE EXPRESS
const app = express();

// CONFIGURATION CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB CONNECT
dbConnection();

// ROUTES
app.use("/", routes);

module.exports = app;
