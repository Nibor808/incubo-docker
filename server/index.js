"use strict";
require("dotenv").config();
const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const sendMail = require("./send_mail").sendMail;

const app = express();

app.use(parser.json());
app.use(cors());

app.post("/sendmail", sendMail);

app.listen(8888, () => {
  console.info(`Listening on 8888`);
});
