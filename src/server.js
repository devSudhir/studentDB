const express = require("express");
const connect = require("./config/db");
const studentController = require("./controller/student.controller");

const app = express();
app.use(express.json());

app.use("/students", studentController);

app.listen(8030, async () => {
  await connect();
  console.log("App responded");
});
